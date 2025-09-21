# Testing Infrastructure & Best Practices

## Overview
This directory contains standardized testing utilities, mocks, and providers that ensure consistent and reliable testing across the Mahaguru Center application.

## Directory Structure
```
src/test/
├── mocks/          # Reusable mock utilities
│   ├── navigation.ts    # Navigation & Footer component mocks
│   ├── trpc.ts         # tRPC query/mutation mocks
│   └── next.ts         # Next.js hooks mocks
├── providers/      # Test context providers
│   └── trpc-test-provider.tsx  # tRPC context for tests
├── utils/          # Testing utilities
│   └── render.tsx      # Enhanced render functions
└── README.md       # This file
```

## Best Practices

### 1. Type Safety
- **Always use proper TypeScript types** for mock functions and components
- **Define interfaces** for complex mock structures
- **Avoid `any` types** - use generics instead
- **Provide explicit return types** for utility functions

### 2. Mock Management
- **Use centralized mocks** from `src/test/mocks/` instead of inline mocks
- **Keep mocks consistent** across test files
- **Mock at the module level** when possible for better performance
- **Clean up mocks** after tests using `vi.clearAllMocks()`

### 3. Provider Usage
- **Use `renderWithProviders`** for components that need context
- **Use standard `render`** for simple components without dependencies
- **Only enable tRPC provider** when testing components that use tRPC hooks
- **Pass custom queryClient** when testing specific query behaviors

### 4. Test Organization
- **Group related tests** using nested `describe` blocks
- **Use descriptive test names** that explain the expected behavior
- **Follow AAA pattern**: Arrange, Act, Assert
- **Test one behavior per test** case

### 5. Error Handling
- **Test both success and error states** for async operations
- **Validate error messages** are user-friendly
- **Test loading states** for better UX coverage
- **Handle edge cases** explicitly

## Quick Start Guide

### Testing a Simple Component
```typescript
import { render, screen } from '../test/utils/render';
import MyComponent from './MyComponent';

test('renders correctly', () => {
  render(<MyComponent />);
  expect(screen.getByText('Expected Text')).toBeInTheDocument();
});
```

### Testing a Component with tRPC
```typescript
import { renderWithProviders, screen } from '../test/utils/render';
import { createMockTRPCQuery } from '../test/mocks/trpc';
import MyTRPCComponent from './MyTRPCComponent';

// Mock the tRPC API
vi.mock('~/trpc/react', () => ({
  api: {
    myRouter: {
      myQuery: {
        useQuery: vi.fn(() => createMockTRPCQuery(['mock data'])),
      },
    },
  },
}));

test('displays data from tRPC', () => {
  renderWithProviders(<MyTRPCComponent />, { withTRPC: true });
  expect(screen.getByText('mock data')).toBeInTheDocument();
});
```

### Testing Navigation Components
```typescript
import { render, screen } from '../test/utils/render';
import { mockNavigation } from '../test/mocks/navigation';

// Mock navigation components
vi.mock('~/components/navigation', () => mockNavigation());

test('includes navigation', () => {
  render(<PageComponent />);
  expect(screen.getByTestId('navigation')).toBeInTheDocument();
  expect(screen.getByTestId('footer')).toBeInTheDocument();
});
```

## Common Patterns

### Mock Setup Pattern
```typescript
// At the top of test file
vi.mock('~/components/navigation', () => mockNavigation());
vi.mock('next/navigation', () => ({
  useSearchParams: () => createMockSearchParams(),
  useRouter: () => createMockRouter(),
  usePathname: () => '/',
}));
```

### tRPC Testing Pattern
```typescript
// Mock specific tRPC endpoints
vi.mock('~/trpc/react', () => ({
  api: {
    event: {
      getEvents: {
        useQuery: vi.fn(() => createMockTRPCQuery(mockEventsData)),
      },
    },
  },
}));
```

### Error State Testing
```typescript
test('handles error state', () => {
  const mockError = new Error('Test error');
  vi.mocked(api.myQuery.useQuery).mockReturnValue(
    createMockTRPCQuery(null, false, mockError)
  );
  
  renderWithProviders(<Component />, { withTRPC: true });
  expect(screen.getByText(/error/i)).toBeInTheDocument();
});
```

## Troubleshooting

### Common Issues

1. **"No Footer export defined"**
   - Solution: Use `mockNavigation()` in your vi.mock call
   - File: `src/test/mocks/navigation.ts`

2. **"Unable to find tRPC Context"**
   - Solution: Use `renderWithProviders` with `{ withTRPC: true }`
   - File: `src/test/utils/render.tsx`

3. **"Cannot find name 'render'"**
   - Solution: Import from `src/test/utils/render` instead of `@testing-library/react`

4. **Type errors with mocks**
   - Solution: Use typed mock utilities from `src/test/mocks/`
   - Ensure proper generic types: `createMockTRPCQuery<YourDataType>`

### Performance Tips

1. **Reuse QueryClient instances** when possible
2. **Mock at module level** rather than per-test for better performance
3. **Use `vi.clearAllMocks()`** in beforeEach for clean state
4. **Avoid deep rendering** when testing specific behaviors

## Migration Guide

### From Inline Mocks
```typescript
// Before
vi.mock('~/components/navigation', () => ({
  Navigation: () => <div>Mock Nav</div>,
  Footer: () => <div>Mock Footer</div>,
}));

// After
import { mockNavigation } from '../test/mocks/navigation';
vi.mock('~/components/navigation', () => mockNavigation());
```

### From Standard Render
```typescript
// Before
import { render } from '@testing-library/react';

// After
import { renderWithProviders } from '../test/utils/render';
// Use renderWithProviders for components with context needs
// Still use render for simple components
```

## Contributing

When adding new test utilities:

1. **Add proper TypeScript types**
2. **Document the purpose and usage**
3. **Include JSDoc comments**
4. **Add examples to this README**
5. **Update existing tests to use new utilities**

---

For questions or improvements to the testing infrastructure, please discuss with the development team.