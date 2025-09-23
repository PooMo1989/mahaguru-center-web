import React from "react";
import type { ReactElement, ReactNode } from "react";
import { render as rtlRender } from "@testing-library/react";
import type { RenderOptions, RenderResult } from "@testing-library/react";
import { type QueryClient } from "@tanstack/react-query";
import { TRPCTestProvider } from "../providers/trpc-test-provider";

interface CustomRenderOptions extends Omit<RenderOptions, "wrapper"> {
  withTRPC?: boolean;
  queryClient?: QueryClient;
}

interface WrapperProps {
  children: ReactNode;
}

/**
 * Custom render function that can optionally wrap components with tRPC provider
 * Use this when testing components that use tRPC hooks
 * Provides strict type safety and proper provider composition
 */
export function renderWithProviders(
  ui: ReactElement,
  { withTRPC = false, queryClient, ...renderOptions }: CustomRenderOptions = {},
): RenderResult {
  function Wrapper({ children }: WrapperProps): ReactElement {
    // Best Practice: Validate that tRPC provider is only used when needed
    if (withTRPC && !children) {
      console.warn(
        "TRPCTestProvider is being used with no children. This might indicate a test setup issue.",
      );
    }

    if (withTRPC) {
      return (
        <TRPCTestProvider queryClient={queryClient}>
          {children}
        </TRPCTestProvider>
      );
    }
    return <>{children}</>;
  }

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

/**
 * Standard render function (re-export from testing library)
 *
 * Best Practice: Use renderWithProviders for components that need context,
 * use standard render for simple components without external dependencies
 */
export { render } from "@testing-library/react";

/**
 * Re-export everything else from testing-library/react
 *
 * Best Practice: Import testing utilities from this file to maintain consistency
 * across all test files and enable future customizations
 */
export * from "@testing-library/react";

/**
 * Default export for convenience
 */
export default renderWithProviders;
