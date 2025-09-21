import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { renderWithProviders } from './utils/render';
import { TRPCTestProvider } from './providers/trpc-test-provider';
import { createMockTRPCQuery } from './mocks/trpc';
import { createMockSearchParams } from './mocks/next';

// Simple test component that uses mock data
function TestComponent() {
  return <div data-testid="test-component">Test Component</div>;
}

describe('Test Infrastructure', () => {
  it('should render components without providers', () => {
    const { getByTestId } = render(<TestComponent />);
    expect(getByTestId('test-component')).toBeInTheDocument();
  });

  it('should render components with tRPC provider', () => {
    const { getByTestId } = renderWithProviders(<TestComponent />, { withTRPC: true });
    expect(getByTestId('test-component')).toBeInTheDocument();
  });

  it('should create mock tRPC query correctly', () => {
    const mockQuery = createMockTRPCQuery(['test data'], false, null);
    
    expect(mockQuery.data).toEqual(['test data']);
    expect(mockQuery.isLoading).toBe(false);
    expect(mockQuery.isSuccess).toBe(true);
    expect(mockQuery.isError).toBe(false);
  });

  it('should create mock search params correctly', () => {
    const mockParams = createMockSearchParams({ tab: 'contact', id: '123' });
    
    expect(mockParams.get('tab')).toBe('contact');
    expect(mockParams.get('id')).toBe('123');
    expect(mockParams.get('nonexistent')).toBe(null);
    expect(mockParams.has('tab')).toBe(true);
    expect(mockParams.has('nonexistent')).toBe(false);
  });

  it('should render TRPCTestProvider without errors', () => {
    const { getByTestId } = render(
      <TRPCTestProvider>
        <TestComponent />
      </TRPCTestProvider>
    );
    expect(getByTestId('test-component')).toBeInTheDocument();
  });
});