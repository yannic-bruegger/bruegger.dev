# Deployment Guide

## 🚀 Manual Deployment

### Quick Start
1. Copy `.env.example` to `.env` and fill in your server details
2. Run: `./deploy.sh production` or `npm run deploy`

### Local Testing
```bash
# Build locally
npm run build

# Test the built site
npm run preview
```

## 🔄 CI/CD Pipeline (GitHub Actions)

### Required Secrets
Set these in GitHub repository Settings > Secrets:

- `REMOTE_HOST` - Your server hostname
- `REMOTE_USER` - SSH username
- `SSH_PRIVATE_KEY` - Your private SSH key (contents of id_rsa)
- `REMOTE_STAGING_PATH` - Staging directory path
- `REMOTE_PRODUCTION_PATH` - Production directory path

### Setup SSH Key
```bash
# Generate SSH key (if you don't have one)
ssh-keygen -t rsa -b 4096 -C "github-actions"

# Add public key to server
ssh-copy-id user@your-server.com

# Add private key to GitHub secrets
cat ~/.ssh/id_rsa
```

### Pipeline Flow
1. **Push to main** → Build → Deploy to staging
2. **Manual approval** (if configured) → Deploy to production

## 📁 Environment Setup

### Staging Environment
- URL: `https://staging.bruegger.dev` (example)
- Auto-deploys from main branch
- For testing changes before production

### Production Environment  
- URL: `https://bruegger.dev`
- Requires manual approval (configurable)
- Live deployment

## 🔧 Customization

### Manual Deployment Script
Edit `deploy.sh` to:
- Add database migrations
- Clear server caches
- Run post-deployment scripts
- Send notifications

### CI/CD Pipeline
Edit `.github/workflows/deploy.yml` to:
- Add testing steps
- Configure approvals
- Add rollback procedures
- Include quality checks

## 🚨 Safety Features

- ✅ Build verification before deployment
- ✅ Staging environment testing
- ✅ Environment protection rules
- ✅ SSH key authentication
- ✅ Backup before deployment (optional)

## 📋 Deployment Checklist

Before deploying to production:
- [ ] All tests passing
- [ ] Staging deployment tested
- [ ] Manual review completed
- [ ] Performance tests passed
- [ ] SEO validation checked