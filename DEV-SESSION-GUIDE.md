# 🚀 Development Session Guide

## A. Session Workflow

### 1. 📸 BEFORE Each Dev Session
```bash
# Step 1: Check current status
git status

# Step 2: Create snapshot
git add .
git commit -m "📸 Pre-session snapshot - [SESSION_NAME]"

# Step 3: Create session tag
git tag session-start-$(date +%Y%m%d-%H%M)

# Step 4: Verify build works
npm run build
```

**Example:**
```bash
git add .
git commit -m "📸 Pre-session snapshot - Homepage Hero Enhancement"
git tag session-start-20250921-1700
npm run build
```

---

### 2. 💾 AFTER Each Dev Session
```bash
# Step 1: Test your changes
npm run build

# Step 2: Save progress
git add .
git commit -m "✨ [SESSION_NAME]: [WHAT_YOU_CHANGED]"

# Step 3: Create completion tag
git tag session-complete-$(date +%Y%m%d-%H%M)

# Step 4: Push to backup (optional)
git push origin main --tags
```

**Example:**
```bash
npm run build
git add .
git commit -m "✨ Homepage Hero Enhancement: Added modern card layout and improved typography"
git tag session-complete-20250921-1800
```

---

## B. Design Consistency Prompts

### 🎨 Before Writing Any Component Code

**Use this prompt with your developer:**

```
"Please ensure this component follows our design system:

DESIGN SYSTEM CHECKLIST:
✅ Use shadcn/ui components from ~/components/ui/
✅ Follow color scheme: primary, secondary, muted, accent
✅ Use consistent spacing: space-y-4, space-y-6, gap-4, gap-6
✅ Apply proper typography: text-sm, text-base, text-lg, font-medium
✅ Ensure responsive design: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
✅ Include hover states and transitions
✅ Use semantic HTML and proper ARIA labels

COMPONENTS TO USE:
- Button: ~/components/ui/button
- Card: ~/components/ui/card
- Input: ~/components/ui/input
- Badge: ~/components/ui/badge

LAYOUT PATTERNS:
- Container: 'container mx-auto px-4'
- Section: 'py-12'
- Grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
- Flex: 'flex items-center justify-between'

Please implement: [DESCRIBE YOUR FEATURE]"
```

### 🧪 Testing Prompt

**Use this prompt after each change:**

```
"Please verify:
1. Run: npm run build (should pass with no errors)
2. Check responsive design on mobile/tablet/desktop
3. Test dark/light mode if applicable
4. Verify accessibility (keyboard navigation, screen reader friendly)
5. Confirm it matches our design system colors and spacing"
```

### 🎯 Component Enhancement Prompt

**When improving existing components:**

```
"Please enhance this component while maintaining:
✅ Existing functionality
✅ Current design system patterns
✅ Responsive behavior
✅ TypeScript types

Enhancement goals:
- Improve visual hierarchy
- Add subtle animations/transitions
- Better spacing and typography
- Enhanced user experience

Reference: docs/DESIGN-SYSTEM.md"
```

---

## Quick Commands Reference

### Emergency Rollback
```bash
# If something breaks, rollback to last known good state
git reset --hard v1.0-stable
git clean -fd
npm install
npm run build
```

### Daily Backup
```bash
# Create daily backup branch
git checkout -b backup-$(date +%Y%m%d)
git push origin backup-$(date +%Y%m%d)
git checkout main
```

### Check What Changed
```bash
# See recent commits
git log --oneline -5

# See current changes
git diff

# See files changed
git status
```

---

## 🎯 Session Types & Tags

### UI Enhancement Sessions
- **Tag format**: `ui-session-YYYYMMDD-HHMM`
- **Commit format**: `✨ UI Enhancement: [component/page] - [changes]`

### Bug Fix Sessions
- **Tag format**: `bugfix-session-YYYYMMDD-HHMM`
- **Commit format**: `🐛 Bug Fix: [issue] - [solution]`

### Feature Addition Sessions
- **Tag format**: `feature-session-YYYYMMDD-HHMM`
- **Commit format**: `🚀 Feature: [feature-name] - [description]`

---

## 📋 Quick Checklist

### Before Starting:
- [ ] `git status` (clean working tree)
- [ ] Create snapshot commit
- [ ] Create session tag
- [ ] `npm run build` (verify working)

### During Development:
- [ ] Follow design system prompts
- [ ] Test frequently with `npm run build`
- [ ] Commit small changes often

### After Session:
- [ ] Final `npm run build` test
- [ ] Commit all changes
- [ ] Create completion tag
- [ ] Optional: push to backup

**Remember: When in doubt, rollback to `v1.0-stable`!**