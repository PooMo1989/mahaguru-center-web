"use client";

import React, { useState } from "react";
import Link from "next/link";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { HamburgerMenuIcon, Cross2Icon } from "@radix-ui/react-icons";

const navigationLinks = [
  { href: "/mahaguru", label: "Mahaguru" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/events", label: "Events" },
  { href: "/contact", label: "Contact Us" },
];

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-gray-800 hover:text-gray-600 transition-colors">
              Mahaguru Center
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-gray-100"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <DropdownMenu.Root open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <DropdownMenu.Trigger className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500">
                {isMobileMenuOpen ? (
                  <Cross2Icon className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <HamburgerMenuIcon className="h-6 w-6" aria-hidden="true" />
                )}
                <span className="sr-only">Open main menu</span>
              </DropdownMenu.Trigger>

              <DropdownMenu.Portal>
                <DropdownMenu.Content 
                  className="bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 w-48 mt-2"
                  align="end"
                  sideOffset={5}
                >
                  {navigationLinks.map((link) => (
                    <DropdownMenu.Item key={link.href} asChild>
                      <Link
                        href={link.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </DropdownMenu.Item>
                  ))}
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </div>
        </div>
      </div>
    </nav>
  );
}