#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

console.log('🔍 Verifying Tailwind CSS Setup...\n');

const checks = [
  {
    name: 'Tailwind Config',
    check: () => fs.existsSync('tailwind.config.ts'),
    fix: 'Create tailwind.config.ts file'
  },
  {
    name: 'PostCSS Config',
    check: () => {
      if (!fs.existsSync('postcss.config.js')) return false;
      const content = fs.readFileSync('postcss.config.js', 'utf8');
      return content.includes('@tailwindcss/postcss');
    },
    fix: 'Update postcss.config.js to use @tailwindcss/postcss'
  },
  {
    name: 'Globals CSS',
    check: () => {
      if (!fs.existsSync('src/styles/globals.css')) return false;
      const content = fs.readFileSync('src/styles/globals.css', 'utf8');
      return content.includes('@import "tailwindcss"');
    },
    fix: 'Update globals.css to import tailwindcss'
  },
  {
    name: 'Footer Component',
    check: () => {
      if (!fs.existsSync('src/components/navigation.tsx')) return false;
      const content = fs.readFileSync('src/components/navigation.tsx', 'utf8');
      return content.includes('export function Footer');
    },
    fix: 'Footer component missing from navigation.tsx'
  }
];

let allPassed = true;

checks.forEach(({ name, check, fix }) => {
  const passed = check();
  console.log(`${passed ? '✅' : '❌'} ${name}`);
  if (!passed) {
    console.log(`   → ${fix}`);
    allPassed = false;
  }
});

if (allPassed) {
  console.log('\n🎉 All checks passed! Testing build...');
  try {
    execSync('npm run build', { stdio: 'inherit' });
    console.log('\n✅ Build successful! Styling should be working.');
  } catch (error) {
    console.log('\n❌ Build failed. Check the error messages above.');
    process.exit(1);
  }
} else {
  console.log('\n❌ Some checks failed. Please fix the issues above.');
  process.exit(1);
}