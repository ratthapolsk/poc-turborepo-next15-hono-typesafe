#!/usr/bin/env node

/**
 * Generate secure secrets for the application
 * Usage: node scripts/generate-secrets.js
 */

import { randomBytes } from 'crypto'

function generateSecret(length = 32) {
  return randomBytes(length).toString('hex')
}

function generatePassword(length = 16) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

console.log('🔐 Generated Secure Secrets')
console.log('=' .repeat(50))
console.log('')

const dbPassword = generatePassword(20)
const jwtSecret = generateSecret(32)
const apiKey = generateSecret(24)

console.log('# Database Configuration')
console.log(`POSTGRES_DB=approval`)
console.log(`POSTGRES_USER=postgres`)
console.log(`POSTGRES_PASSWORD=${dbPassword}`)
console.log('')

console.log('# Database URL for applications')
console.log(`DATABASE_URL=postgresql://postgres:${dbPassword}@localhost:5432/approval`)
console.log('')

console.log('# Security Keys')
console.log(`JWT_SECRET=${jwtSecret}`)
console.log(`API_KEY=${apiKey}`)
console.log('')

console.log('⚠️  IMPORTANT:')
console.log('1. Copy these values to your .env.local file')
console.log('2. Never commit these secrets to git')
console.log('3. Use different secrets for production')
console.log('4. Store production secrets securely (e.g., AWS Secrets Manager)')