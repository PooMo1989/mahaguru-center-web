# CSS & Tailwind Troubleshooting Guide

## 🚨 If Styling Suddenly Disappears

### **Quick Fix Checklist:**

1. **Check if dev server is running:**
   ```bash
   npm run dev
   ```

2. **Verify Tailwind configuration exists:**
   - ✅ File: `tailwind.config.ts` should exist
   - ✅ Content: Should point to `./src/**/*.{js,ts,jsx,tsx,mdx}`

3. **Check PostCSS configuration:**
   - ✅ File: `postcss.config.js`
   - ✅ Should contain: `"@tailwindcss/postcss": {}`

4. **Verify globals.css:**
   - ✅ File: `src/styles/globals.css`
   - ✅ First line should be: `@import "tailwindcss";`

5. **Clear build cache:**
   ```bash
   rm -rf .next
   npm run build
   ```

### **Root Causes & Solutions:**

#### **Cause 1: Tailwind Config Missing**
- **Symptom:** All Tailwind classes stop working
- **Solution:** Create `tailwind.config.ts` with proper content paths
- **Prevention:** Never delete this file

#### **Cause 2: PostCSS Misconfiguration**
- **Symptom:** Build fails or CSS doesn't generate
- **Solution:** Use `@tailwindcss/postcss` plugin (NOT regular `tailwindcss`)
- **Prevention:** Don't switch PostCSS configs without testing

#### **Cause 3: Wrong Tailwind Version**
- **Symptom:** @tailwind directives don't work
- **Solution:** Use `@import "tailwindcss";` for v4, `@tailwind` for v3
- **Prevention:** Stick with project's current version (v4.1.13)

#### **Cause 4: Content Path Issues**
- **Symptom:** Classes work in some components but not others
- **Solution:** Ensure content paths cover all your components
- **Prevention:** Use broad patterns like `./src/**/*.{js,ts,jsx,tsx,mdx}`

### **Emergency Recovery Steps:**

```bash
# 1. Stop all processes
pkill -f node

# 2. Clear all caches
rm -rf .next
rm -rf node_modules/.cache
npm cache clean --force

# 3. Reinstall if needed
npm install

# 4. Test build
npm run build

# 5. Start dev server
npm run dev
```

### **Stable Configuration (DO NOT CHANGE):**

**tailwind.config.ts:**
```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // ... rest of config
}
export default config
```

**postcss.config.js:**
```javascript
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

**src/styles/globals.css (first line):**
```css
@import "tailwindcss";
```

### **Prevention Rules:**

1. ✅ **Always test build after changes:** `npm run build`
2. ✅ **Never edit Tailwind config without backup**
3. ✅ **Test Footer/Navigation components after any CSS changes**
4. ✅ **Use version control - commit working states**
5. ✅ **If unsure, run the Footer test:** `npx vitest run src/components/navigation.test.tsx`

### **Contact:**
If styling breaks again, check this guide first, then run the test suite to verify components still render correctly.