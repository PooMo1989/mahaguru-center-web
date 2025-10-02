# Development Workflow Guide

## Complete Feature Implementation Process

This guide outlines the complete process for implementing new features or UI changes from story creation to production deployment.

---

## Phase 1: Planning & Documentation

### 1.1 Create Epic (For Large Features)
**Location**: `docs/stories/`

**Template**: `[epic-number].0.[epic-name]-epic.md`

**Content**:
```markdown
# Epic [Number]: [Epic Name]

**Status**: In Progress / Done
**Created**: [Date]
**Owner**: [Name]

## Overview
[Brief description of the epic]

## Objectives
- [ ] Objective 1
- [ ] Objective 2

## Success Criteria
1. Criterion 1
2. Criterion 2

## Stories
- Story [X.1]: [Title]
- Story [X.2]: [Title]
```

### 1.2 Create Story
**Location**: `docs/stories/`

**Template**: `[epic-number].[story-number].[story-name].md`

**Content Must Include**:
- **Story Title & Description**
- **Acceptance Criteria** (detailed, testable)
- **Technical Implementation Plan**
  - Database changes
  - Backend API changes
  - Frontend components
  - Dependencies
- **Testing Requirements**
- **QA Checklist**

**Example**:
```markdown
# Story 8.1: Image Upload Backend and Frontend

## Acceptance Criteria
1. [ ] Database table created with proper relationships
2. [ ] API endpoints created and tested
3. [ ] UI component works with file validation
4. [ ] Images stored in Supabase Storage
5. [ ] Featured image selection works
6. [ ] Delete functionality works with confirmation

## Implementation Tasks
- [ ] Update Prisma schema
- [ ] Create tRPC router
- [ ] Create ImageUpload component
- [ ] Integrate into forms
- [ ] Write tests
```

---

## Phase 2: Development

### 2.1 Create Feature Branch
```bash
# Create and switch to feature branch
git checkout -b feature/[feature-name]

# Example:
git checkout -b feature/admin-image-upload-system
```

**Branch Naming Conventions**:
- `feature/[name]` - New features
- `bugfix/[name]` - Bug fixes
- `hotfix/[name]` - Urgent production fixes
- `refactor/[name]` - Code refactoring
- `ui/[name]` - UI/UX changes

### 2.2 Development Process

#### A. Database Changes
```bash
# 1. Update Prisma schema
# Edit: prisma/schema.prisma

# 2. Generate migration
npm run db:generate

# 3. Apply to database
npm run db:push
# OR create migration
npm run db:migrate

# 4. Verify schema
npm run db:studio
```

#### B. Backend Development
**Files to Create/Modify**:
- `src/server/api/routers/[feature].ts` - tRPC router
- `src/server/api/root.ts` - Register router
- `src/lib/[utilities].ts` - Utility functions

**Backend Checklist**:
- [ ] Input validation with Zod
- [ ] Authentication checks
- [ ] Error handling
- [ ] Database transactions where needed
- [ ] Proper TypeScript types

#### C. Frontend Development
**Files to Create/Modify**:
- `src/components/[feature]/[component].tsx` - React components
- `src/app/[page]/page.tsx` - Page components
- `src/styles/` - Styling if needed

**Frontend Checklist**:
- [ ] Form validation
- [ ] Loading states
- [ ] Error messages
- [ ] Success feedback
- [ ] Accessibility (ARIA labels, keyboard navigation)
- [ ] Responsive design
- [ ] TypeScript types

#### D. Commit Strategy
```bash
# Commit frequently with clear messages
git add [files]
git commit -m "feat: [description]"

# Commit message prefixes:
# feat: New feature
# fix: Bug fix
# docs: Documentation
# style: Formatting, styling
# refactor: Code restructuring
# test: Adding tests
# chore: Maintenance tasks
```

### 2.3 Local Testing

#### Run Development Server
```bash
npm run dev
```

#### Manual Testing Checklist
- [ ] Feature works as expected
- [ ] All acceptance criteria met
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] Forms validate properly
- [ ] Loading states work
- [ ] Error handling works
- [ ] Success messages appear
- [ ] Database changes persist correctly

#### Check for Errors
```bash
# TypeScript check
npm run typecheck

# Linting
npm run lint

# Build check
npm run build
```

---

## Phase 3: Quality Assurance

### 3.1 Automated Tests (If Applicable)

#### Unit Tests
```bash
# Run all tests
npm run test

# Run specific test file
npm run test [filename]

# Coverage report
npm run test:coverage
```

**Test Requirements**:
- [ ] Backend API endpoints tested
- [ ] Component rendering tests
- [ ] Form validation tests
- [ ] Error scenario tests
- [ ] Edge case tests

#### Integration Tests
- [ ] API + Database integration
- [ ] Frontend + Backend integration
- [ ] File upload flows
- [ ] Authentication flows

### 3.2 Manual QA Testing

#### Functional Testing
- [ ] All features work according to acceptance criteria
- [ ] Happy path works correctly
- [ ] Error scenarios handled gracefully
- [ ] Edge cases covered

#### UI/UX Testing
- [ ] Design matches requirements
- [ ] Responsive on mobile, tablet, desktop
- [ ] Accessibility standards met (WCAG 2.1)
- [ ] Loading indicators visible
- [ ] Forms are user-friendly
- [ ] Error messages are clear

#### Browser Testing
Test on:
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

#### Performance Testing
- [ ] Page load time acceptable
- [ ] No memory leaks
- [ ] API response times reasonable
- [ ] Large file uploads work

### 3.3 Security Review
- [ ] Authentication required for protected routes
- [ ] Input sanitization
- [ ] SQL injection prevention (using Prisma)
- [ ] XSS prevention
- [ ] File upload validation (type, size)
- [ ] Environment variables secure

---

## Phase 4: Code Review & Merge

### 4.1 Pre-Review Checklist
```bash
# Ensure branch is up to date
git fetch origin
git merge origin/main

# Resolve any conflicts
# Run tests again
npm run test
npm run lint
npm run typecheck
npm run build
```

### 4.2 Create Pull Request

**PR Title Format**: `[Type]: [Brief Description]`
- Example: `feat: Add admin image upload system`

**PR Description Must Include**:
```markdown
## Summary
[Brief description of changes]

## Related Story
Closes #[story-number] or Link to docs/stories/[file]

## Changes Made
- Database: [changes]
- Backend: [changes]
- Frontend: [changes]

## Testing Done
- [x] Manual testing completed
- [x] All acceptance criteria met
- [x] No console errors
- [x] TypeScript passes
- [x] Linting passes

## Screenshots (if UI changes)
[Add screenshots]

## QA Notes
[Any special testing instructions]
```

### 4.3 Code Review Process

**Reviewer Checklist**:
- [ ] Code follows project conventions
- [ ] No security vulnerabilities
- [ ] Performance considerations addressed
- [ ] Error handling is comprehensive
- [ ] TypeScript types are correct
- [ ] Tests are adequate
- [ ] Documentation is updated
- [ ] No unnecessary code/comments
- [ ] Database migrations are safe

### 4.4 Address Review Comments
```bash
# Make requested changes
git add [files]
git commit -m "fix: address review comments"
git push origin feature/[feature-name]
```

### 4.5 Merge to Staging
```bash
# Once approved, merge to staging branch
git checkout staging
git merge feature/[feature-name]
git push origin staging
```

---

## Phase 5: Staging Deployment

### 5.1 Automatic Deployment
**CI/CD Pipeline** (GitHub Actions):
- Triggers on push to `staging` branch
- Runs: `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build`
- Deploys to **Vercel Staging Environment**

### 5.2 Staging Environment Testing

**Staging URL**: `https://[project]-[team]-staging.vercel.app`

**Testing Checklist**:
- [ ] All features work in staging
- [ ] Database migrations applied successfully
- [ ] Environment variables set correctly
- [ ] External services connected (Supabase, etc.)
- [ ] Authentication works
- [ ] File uploads work
- [ ] Email notifications work (if applicable)

### 5.3 Stakeholder Testing
- Share staging URL with stakeholders
- Gather feedback
- Make adjustments if needed
- Repeat staging deployment if changes made

### 5.4 Staging QA Gate

**Must Pass Before Production**:
- [ ] All acceptance criteria validated
- [ ] No critical bugs
- [ ] Performance acceptable
- [ ] Security review passed
- [ ] Stakeholder approval obtained
- [ ] Documentation updated

---

## Phase 6: Production Deployment

### 6.1 Pre-Production Checklist
```bash
# Ensure staging is stable
# Update main branch
git checkout main
git merge staging
git push origin main
```

**Verify**:
- [ ] All tests passing
- [ ] Build successful
- [ ] Database migrations reviewed
- [ ] Environment variables documented
- [ ] Rollback plan ready

### 6.2 Production Deployment

**Automatic Deployment** (GitHub Actions):
- Triggers on push to `main` branch
- Runs full test suite
- Deploys to **Vercel Production**

**Production URL**: `https://[your-domain].com`

### 6.3 Post-Deployment Verification

**Immediate Checks** (within 5 minutes):
- [ ] Site is accessible
- [ ] No 500 errors in logs
- [ ] Database connection working
- [ ] Authentication working
- [ ] Critical paths working

**Smoke Tests** (within 15 minutes):
- [ ] Homepage loads
- [ ] New feature works
- [ ] Existing features still work
- [ ] Admin panel accessible
- [ ] Forms submit successfully

**Monitoring** (first 24 hours):
- [ ] Error rates normal
- [ ] Performance metrics acceptable
- [ ] User feedback positive
- [ ] No increase in support tickets

### 6.4 Database Migrations

**If Schema Changes**:
```bash
# SSH into production (if applicable)
# OR use Vercel CLI
vercel env pull

# Run migration
npm run db:migrate
```

**Migration Safety**:
- [ ] Backup database before migration
- [ ] Test migration on staging first
- [ ] Use transactions for data migrations
- [ ] Have rollback SQL ready
- [ ] Schedule during low-traffic period

---

## Phase 7: Post-Deployment

### 7.1 Update Documentation

**Files to Update**:
- `README.md` - If setup process changed
- `docs/CHANGELOG.md` - Add release notes
- `docs/stories/[story].md` - Mark as Done
- API documentation - If endpoints added

**Story Completion**:
```markdown
## Completion Notes
- **Completed**: [Date]
- **Deployed**: Production
- **Agent**: [Your Name / AI Assistant]
- **Files Changed**: [List]
- **QA Status**: All acceptance criteria met ✅
```

### 7.2 Clean Up

```bash
# Delete feature branch (locally)
git branch -d feature/[feature-name]

# Delete feature branch (remote)
git push origin --delete feature/[feature-name]

# Clean up local branches
git fetch --prune
```

### 7.3 Team Communication

**Notify Team**:
- Send deployment notification
- Share release notes
- Document known issues (if any)
- Update project management tool

**Release Notes Template**:
```markdown
## Release: [Feature Name] - [Date]

### New Features
- [Feature 1]
- [Feature 2]

### Improvements
- [Improvement 1]

### Bug Fixes
- [Fix 1]

### Known Issues
- [Issue 1] (workaround: ...)

### Migration Notes
- [Any manual steps needed]
```

---

## Rollback Procedures

### Emergency Rollback

**Option 1: Revert via Vercel**
```bash
# Use Vercel dashboard to redeploy previous version
# OR via CLI:
vercel rollback [deployment-url]
```

**Option 2: Git Revert**
```bash
# Revert the merge commit
git revert [commit-hash]
git push origin main
```

**Option 3: Database Rollback**
```bash
# If schema changes broke production
npm run db:migrate:down
# OR restore from backup
```

### Post-Rollback
- [ ] Verify site is working
- [ ] Notify team
- [ ] Create hotfix branch
- [ ] Fix the issue
- [ ] Redeploy

---

## Quick Reference Commands

### Development
```bash
npm run dev                  # Start dev server
npm run db:studio           # Open Prisma Studio
npm run lint                # Run linter
npm run typecheck           # TypeScript check
npm run test                # Run tests
npm run build               # Production build
```

### Git Workflow
```bash
git checkout -b feature/[name]    # Create branch
git add .                         # Stage changes
git commit -m "feat: [desc]"      # Commit
git push origin feature/[name]    # Push to remote
git checkout main                 # Switch to main
git merge feature/[name]          # Merge feature
```

### Deployment
```bash
git push origin staging     # Deploy to staging
git push origin main        # Deploy to production
vercel --prod              # Manual production deploy
vercel logs --follow       # Watch logs
```

---

## Environment Checklist

### Local Development
- [ ] `.env` file configured
- [ ] Database accessible
- [ ] Dependencies installed
- [ ] Dev server runs

### Staging
- [ ] Environment variables set in Vercel
- [ ] Database configured
- [ ] External services connected
- [ ] Domain configured

### Production
- [ ] All staging checks plus:
- [ ] Custom domain configured
- [ ] SSL certificate active
- [ ] Analytics enabled
- [ ] Error monitoring enabled
- [ ] Backup strategy in place

---

## Best Practices

### Code Quality
- Write self-documenting code
- Use TypeScript strictly
- Handle errors gracefully
- Write tests for critical paths
- Keep functions small and focused
- Follow DRY principle

### Performance
- Optimize database queries
- Use proper indexes
- Lazy load components
- Compress images
- Minimize bundle size
- Cache when appropriate

### Security
- Never commit secrets
- Validate all inputs
- Sanitize user content
- Use parameterized queries
- Keep dependencies updated
- Implement rate limiting

### Collaboration
- Write clear commit messages
- Document complex logic
- Update README when needed
- Communicate breaking changes
- Help teammates in reviews
- Share knowledge

---

## Troubleshooting

### Build Fails
1. Check TypeScript errors: `npm run typecheck`
2. Check lint errors: `npm run lint`
3. Clear `.next` folder: `rm -rf .next`
4. Reinstall dependencies: `rm -rf node_modules && npm install`

### Database Issues
1. Check connection string in `.env`
2. Verify Prisma schema is synced: `npm run db:generate`
3. Check database logs in Supabase dashboard
4. Reset database: `npm run db:reset` (dev only!)

### Deployment Fails
1. Check Vercel logs
2. Verify environment variables
3. Check build logs for errors
4. Verify database migrations ran
5. Test build locally: `npm run build`

---

## Support & Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [tRPC Docs](https://trpc.io/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

### Project-Specific
- `docs/Architecture.md` - System architecture
- `docs/PRD.md` - Product requirements
- `docs/stories/` - Feature stories
- `README.md` - Setup instructions

### Getting Help
- Check existing documentation
- Review similar implemented features
- Ask team members
- Check issue tracker
- Review pull request history

---

**Last Updated**: October 2, 2025
**Version**: 1.0
**Maintainer**: Development Team
