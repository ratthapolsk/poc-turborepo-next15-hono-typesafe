#!/usr/bin/env tsx

/**
 * Generate secure secrets for the application
 * Usage: tsx scripts/generate-secrets.ts
 */

import { randomBytes } from 'crypto'

function generateSecret(length: number = 32): string {
  return randomBytes(length).toString('hex')
}

function generatePassword(length: number = 16): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

interface SecretConfig {
  dbPassword: string
  jwtSecret: string
  apiKey: string
}

function generateSecrets(): SecretConfig {
  return {
    dbPassword: generatePassword(20),
    jwtSecret: generateSecret(32),
    apiKey: generateSecret(24)
  }
}

function displaySecrets(secrets: SecretConfig): void {
  console.log('🔐 Generated Secure Secrets')
  console.log('='.repeat(50))
  console.log('')

  console.log('# Database Configuration')
  console.log(`POSTGRES_DB=approval`)
  console.log(`POSTGRES_USER=postgres`)
  console.log(`POSTGRES_PASSWORD=${secrets.dbPassword}`)
  console.log('')

  console.log('# Database URL for applications')
  console.log(`DATABASE_URL=postgresql://postgres:${secrets.dbPassword}@localhost:5432/approval`)
  console.log('')

  console.log('# API Configuration')
  console.log('PORT=3001')
  console.log('CORS_ORIGIN=http://localhost:3000')
  console.log('')

  console.log('# Frontend Configuration')
  console.log('NEXT_PUBLIC_API_BASE_URL=http://localhost:3001')
  console.log('')

  console.log('# Security Keys')
  console.log(`JWT_SECRET=${secrets.jwtSecret}`)
  console.log(`API_KEY=${secrets.apiKey}`)
  console.log('')

  console.log('# Environment')
  console.log('NODE_ENV=development')
  console.log('')

  console.log('⚠️  IMPORTANT:')
  console.log('1. Copy these values to your .env file')
  console.log('2. Never commit these secrets to git')
  console.log('3. Use different secrets for production')
  console.log('4. Store production secrets securely (e.g., AWS Secrets Manager)')
}

// Main execution
const secrets = generateSecrets()
displaySecrets(secrets)