# 🔄 Mahaguru Center Web - Rollback Guide

## Quick Recovery Commands

### 🚨 Emergency Rollback to Stable Version
If anything goes wrong during UI enhancement, use these commands to quickly restore the stable version:

```bash
# Navigate to project directory
cd "C:\Users\User\OneDrive - DP Education\Desktop\AMC\Mahaguru Center Front\mahaguru-center-web"

# Option 1: Reset to stable tag (RECOMMENDED)
git reset --hard v1.0-stable

# Option 2: Reset to specific commit
git reset --hard ecc4d27

# Clean any untracked files
git clean -fd

# Restore node_modules if needed
npm install

# Verify everything works
npm run build
```

## Checkpoint Information

### v1.0-stable (September 21, 2025)
- **Commit**: `ecc4d27`
- **Tag**: `v1.0-stable`
- **Status**: ✅ Fully functional, all features working
- **Features**:
  - Complete PRD implementation
  - All pages working (Home, Events, Projects, Contact, Admin)
  - Full design system with shadcn/ui components
  - Working authentication and database integration
  - Responsive design
  - TypeScript compilation successful

### What's Included:
- ✅ Navigation and routing
- ✅ Event management system
- ✅ Project management system
- ✅ Contact forms
- ✅ Admin dashboard
- ✅ Database integration (Prisma)
- ✅ Authentication (NextAuth)
- ✅ UI component library (shadcn/ui)
- ✅ Design system documentation
- ✅ Responsive layout

## Snapshot Strategy for UI Enhancement

### Before Starting Each UI Enhancement Session:
```bash
# Create a snapshot before changes
git add .
git commit -m "Snapshot before UI enhancement session [DATE]"
git tag -a ui-enhancement-start-[DATE] -m "UI enhancement starting point"
```

### After Each Major Change:
```bash
# Save incremental progress
git add .
git commit -m "UI Enhancement: [DESCRIPTION OF CHANGES]"
```

### If You Need to Undo Recent Changes:
```bash
# See recent commits
git log --oneline -10

# Undo last commit (keep files)
git reset --soft HEAD~1

# Undo last commit (discard files)
git reset --hard HEAD~1

# Go back multiple commits
git reset --hard HEAD~3
```

## Recovery Checklist

After any rollback, verify these are working:

1. **Build System**
   ```bash
   npm run build
   ```

2. **Development Server**
   ```bash
   npm run dev
   ```

3. **Database Connection**
   ```bash
   npm run db:push
   ```

4. **Tests (Optional)**
   ```bash
   npm run test:run
   ```

## Environment Recovery

If you need to completely restart:

```bash
# Remove node_modules and reinstall
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm install

# Reset database (if needed)
npm run db:push

# Clear Next.js cache
Remove-Item -Recurse -Force .next
npm run build
```

## Backup Strategy

### Manual Backup (Recommended before major changes):
```bash
# Create a complete backup
cd ..
xcopy "mahaguru-center-web" "mahaguru-center-web-backup-[DATE]" /E /I

# Or use robocopy
robocopy "mahaguru-center-web" "mahaguru-center-web-backup-[DATE]" /E /MIR
```

### Git Remote Backup:
```bash
# Push to backup branch
git checkout -b backup-v1.0-stable
git push origin backup-v1.0-stable
```

## Emergency Contacts & Notes

- **Stable Version**: v1.0-stable (ecc4d27)
- **Last Known Good Build**: September 21, 2025
- **Critical Files to Never Delete**:
  - `package.json`
  - `prisma/schema.prisma`
  - `src/env.js`
  - `.env` (if exists)

## Common Issues & Solutions

### Build Failures
1. Check Node.js version: `node --version` (should be 18+)
2. Clear cache: `Remove-Item -Recurse -Force .next`
3. Reinstall dependencies: `Remove-Item -Recurse -Force node_modules; npm install`

### Database Issues
1. Reset database: `npm run db:push`
2. Generate Prisma client: `npx prisma generate`

### TypeScript Errors
1. Check version: `npx tsc --version`
2. Clear TypeScript cache: `Remove-Item -Recurse -Force .tsbuildinfo`

Remember: **When in doubt, rollback to v1.0-stable and start over!**