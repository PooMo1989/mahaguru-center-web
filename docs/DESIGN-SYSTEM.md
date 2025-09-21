# Mahaguru Center Web Design System

## Overview
This document outlines the design system for the Mahaguru Center website, ensuring consistent UI/UX across all components and pages.

## Design Principles
- **Simplicity**: Clean, minimal design that doesn't distract from content
- **Accessibility**: WCAG 2.1 AA compliant with proper contrast and navigation
- **Buddhist Aesthetics**: Warm, peaceful colors reflecting Buddhist values
- **Responsive**: Mobile-first design that works on all devices

## Color Palette

### Primary Colors
- **Primary**: `oklch(0.205 0 0)` - Deep charcoal for text and primary actions
- **Primary Foreground**: `oklch(0.985 0 0)` - Light for text on primary backgrounds
- **Secondary**: `oklch(0.97 0 0)` - Light gray for secondary elements
- **Background**: `oklch(1 0 0)` - Pure white for page backgrounds

### Semantic Colors
- **Destructive**: `oklch(0.577 0.245 27.325)` - Red for destructive actions
- **Muted**: `oklch(0.97 0 0)` - Subtle gray for muted content
- **Accent**: `oklch(0.97 0 0)` - Accent color for highlights
- **Border**: `oklch(0.922 0 0)` - Light gray for borders and dividers

### Dark Mode Colors
- **Background**: `oklch(0.145 0 0)` - Dark background
- **Foreground**: `oklch(0.985 0 0)` - Light text
- **Card**: `oklch(0.205 0 0)` - Dark card backgrounds

## Typography

### Font Stack
- **Primary**: Geist Sans (fallback: system fonts)
- **Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### Scale
- **xs**: 0.75rem (12px)
- **sm**: 0.875rem (14px) 
- **base**: 1rem (16px)
- **lg**: 1.125rem (18px)
- **xl**: 1.25rem (20px)
- **2xl**: 1.5rem (24px)
- **3xl**: 1.875rem (30px)
- **4xl**: 2.25rem (36px)

## Spacing
Uses Tailwind's 0.25rem (4px) base unit:
- **1**: 0.25rem (4px)
- **2**: 0.5rem (8px)
- **3**: 0.75rem (12px)
- **4**: 1rem (16px)
- **6**: 1.5rem (24px)
- **8**: 2rem (32px)
- **12**: 3rem (48px)

## Components

### Available UI Components
All components are built with shadcn/ui and follow consistent patterns:

- **Button** (`~/components/ui/button`)
- **Card** (`~/components/ui/card`)
- **Input** (`~/components/ui/input`)
- **Label** (`~/components/ui/label`)
- **Select** (`~/components/ui/select`)
- **Textarea** (`~/components/ui/textarea`)
- **Dialog** (`~/components/ui/dialog`)
- **Dropdown Menu** (`~/components/ui/dropdown-menu`)
- **Tabs** (`~/components/ui/tabs`)
- **Badge** (`~/components/ui/badge`)
- **Separator** (`~/components/ui/separator`)
- **Safe Image** (`~/components/ui/safe-image`)

### Usage Guidelines

#### Buttons
```tsx
import { Button } from "~/components/ui/button"

// Primary action
<Button>Primary Action</Button>

// Secondary action  
<Button variant="secondary">Secondary</Button>

// Destructive action
<Button variant="destructive">Delete</Button>
```

#### Cards
```tsx
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    Card content goes here
  </CardContent>
</Card>
```

#### Forms
```tsx
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Textarea } from "~/components/ui/textarea"

<div className="space-y-2">
  <Label htmlFor="name">Name</Label>
  <Input id="name" placeholder="Enter your name" />
</div>
```

## Layout Patterns

### Page Structure
```tsx
<main className="min-h-screen bg-background">
  <Navigation />
  <div className="container mx-auto px-4 py-8">
    {/* Page content */}
  </div>
  <Footer />
</main>
```

### Responsive Grid
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Grid items */}
</div>
```

### Content Sections
```tsx
<section className="py-12">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold text-center mb-8">Section Title</h2>
    {/* Section content */}
  </div>
</section>
```

## Animation Guidelines

### Transitions
- Use subtle transitions for interactive elements
- Duration: 150-300ms for most interactions
- Easing: Use CSS `ease` or `ease-in-out`

### Loading States
- Show loading spinners for async operations
- Use skeleton screens for content loading
- Provide feedback for form submissions

## Accessibility Standards

### Required Practices
- Use semantic HTML elements
- Provide alt text for images
- Ensure keyboard navigation works
- Maintain color contrast ratios (4.5:1 minimum)
- Use ARIA labels where needed
- Test with screen readers

### Focus Management
- Visible focus indicators on all interactive elements
- Logical tab order
- Focus trapping in modals

## Development Guidelines

### File Organization
```
src/
├── components/
│   ├── ui/           # Base UI components
│   ├── layout/       # Layout components
│   └── features/     # Feature-specific components
├── styles/
│   └── globals.css   # Global styles and CSS variables
└── lib/
    └── utils.ts      # Utility functions
```

### Component Patterns
- Use TypeScript for all components
- Export types for component props
- Use forwardRef for components that need refs
- Implement proper error boundaries

### State Management
- Use React Query for server state
- Use React Hook Form for form state
- Keep local component state minimal

## Testing Strategy

### Component Testing
- Test component rendering
- Test user interactions
- Test accessibility features
- Test responsive behavior

### Visual Testing
- Test dark/light mode
- Test different screen sizes
- Test with different content lengths

## Performance Guidelines

### Image Optimization
- Use Next.js Image component
- Implement lazy loading
- Provide appropriate sizes
- Use modern formats (WebP, AVIF)

### Code Splitting
- Dynamic imports for large components
- Route-based code splitting
- Bundle size monitoring

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Progressive enhancement for older browsers
- Graceful degradation for JavaScript disabled

## Maintenance

### Regular Tasks
- Update dependencies monthly
- Review and update color tokens
- Test accessibility compliance
- Performance audits

### Documentation Updates
- Update this document when patterns change
- Document new components and patterns
- Keep examples current and accurate