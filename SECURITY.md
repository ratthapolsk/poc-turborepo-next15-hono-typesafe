# Security Guidelines

## 🔒 Environment Variables

### Required Environment Variables

All sensitive data must be stored in environment variables:

```bash
# Database
POSTGRES_DB=approval
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_secure_password

# Security Keys
JWT_SECRET=minimum_32_characters_long_secret
API_KEY=your_api_key_here

# Database URL
DATABASE_URL=postgresql://user:password@host:port/database
```

### Generate Secure Secrets

Use the built-in script to generate secure secrets:

```bash
pnpm secrets
```

This generates:
- Strong database password (20 chars with special characters)
- JWT secret (64 hex characters)
- API key (48 hex characters)

## 🚨 Security Checklist

### Development
- [ ] Use `.env.local` for local development
- [ ] Never commit `.env` files to git
- [ ] Use strong passwords (minimum 16 characters)
- [ ] Rotate secrets regularly

### Production  
- [ ] Use environment variables from secure storage (AWS Secrets Manager, etc.)
- [ ] Enable HTTPS only
- [ ] Use different secrets for each environment
- [ ] Enable database SSL connections
- [ ] Set up proper CORS origins
- [ ] Use rate limiting
- [ ] Enable logging and monitoring

## 🛡️ Security Features

### Environment Validation
The application validates all environment variables at startup using Zod schemas:

```typescript
// apps/services/src/utils/env.ts
const envSchema = z.object({
  JWT_SECRET: z.string().min(32), // Enforces minimum length
  DATABASE_URL: z.string().url(), // Validates URL format
  // ... other validations
})
```

### Database Security
- Uses parameterized queries (Drizzle ORM)
- Environment-based credentials
- No hardcoded passwords

### API Security
- CORS configuration
- Environment validation
- Structured error handling

## 🚫 What NOT to Do

❌ **Never do these:**
```bash
# Don't hardcode secrets
const password = "project0*"

# Don't commit .env files  
git add .env.local

# Don't use weak passwords
POSTGRES_PASSWORD=123456

# Don't log sensitive data
console.log(process.env.JWT_SECRET)
```

## ✅ Best Practices

### Password Requirements
- Minimum 16 characters
- Mix of uppercase, lowercase, numbers, special characters
- Avoid dictionary words
- Use unique passwords per environment

### Secret Management
- Use environment variables only
- Store production secrets in secure services
- Rotate secrets regularly (every 90 days)
- Use different secrets per environment

### Code Security
- Validate all inputs with Zod
- Use TypeScript for type safety
- Never log sensitive information
- Use HTTPS in production

## 🔧 Setup Instructions

1. **Copy environment template:**
   ```bash
   cp .env.example .env.local
   ```

2. **Generate secure secrets:**
   ```bash
   pnpm secrets
   ```

3. **Update .env.local with generated values**

4. **Test environment validation:**
   ```bash
   pnpm dev
   # Should show: "🔒 Security: Environment validated"
   ```

## 📞 Security Issues

If you discover a security vulnerability:

1. **DO NOT** create a public GitHub issue
2. Email security concerns privately
3. Include detailed description and steps to reproduce
4. Allow time for patch before public disclosure

## 🔄 Regular Security Tasks

### Weekly
- Review access logs
- Check for dependency vulnerabilities: `npm audit`

### Monthly  
- Rotate development secrets
- Review CORS settings
- Update dependencies

### Quarterly
- Rotate production secrets
- Security audit
- Review access permissions