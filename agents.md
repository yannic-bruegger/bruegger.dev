# Agents Guide

## Important Development Workflow

### Branch Management
- **ALWAYS create a new branch when working on a new issue**
- Use descriptive branch names: `feature/issue-name`, `bugfix/description`, or `issue/number-description`
- Only work on the `main` branch for deployment-ready changes
- Use `staging` branch for testing before production

### Standard Branch Creation
```bash
git checkout -b feature/feature-name
# or
git checkout -b issue/number-description
```

### Example Branch Names
- `feature/theme-toggle`
- `issue/1-dark-light-theme`
- `feature/blog-section`
- `bugfix/mobile-navigation`

### Git Workflow
1. Create feature branch from `main`
2. Make changes and commit
3. Push to remote
4. Create Pull Request to `main` or `staging`
5. Request review before merge

### Testing
- Test on staging branch first for major features
- Use production branch only for ready-to-deploy changes

This ensures proper code organization and deployment safety.