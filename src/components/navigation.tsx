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
            <Link href="/" className="flex items-center space-x-3 text-2xl font-bold text-gray-800 hover:text-gray-600 transition-colors">
              <img 
                src="/logo.png" 
                alt="Mahaguru Center Logo" 
                className="h-10 w-10 object-contain"
              />
              <span>Mahaguru Center</span>
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

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information & Logo */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <img 
                src="/logo.png" 
                alt="Mahaguru Center Logo" 
                className="h-12 w-12 object-contain"
              />
              <h3 className="text-2xl font-bold">Mahaguru Center</h3>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold mb-2">Contact Details</h4>
                <p className="text-gray-300">
                  Email: <a href="mailto:secretary@mahaguru.lk" className="hover:text-white transition-colors">secretary@mahaguru.lk</a>
                </p>
                <p className="text-gray-300">
                  Hotline: <a href="tel:+94777100490" className="hover:text-white transition-colors">+94 777 100 490</a>
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-2">Follow Us</h4>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <a 
                      href="https://www.facebook.com/arahthmaga"
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-white transition-colors"
                      aria-label="Facebook"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                    <span className="text-gray-300 text-sm">Join our active community</span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <a 
                      href="https://www.youtube.com/@maithribuddha"
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-white transition-colors"
                      aria-label="YouTube"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    </a>
                    <span className="text-gray-300 text-sm">Explore Dhamma Videos</span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <a 
                      href="https://www.maithribodhi.org/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-white transition-colors"
                      aria-label="Dhamma Archive"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </a>
                    <span className="text-gray-300 text-sm">Visit our digital Archive</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Location Map */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Visit Us</h4>
            <div className="relative h-64 lg:h-80 rounded-lg overflow-hidden cursor-pointer group">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.456789!2d80.036789!3d7.098765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2fb6c5a3e8d01%3A0x4b9b4d5e1f7a6c8d!2sArahath%20maga%20Center%20(%E0%B6%85%E0%B6%BB%E0%B7%84%E0%B6%AD%E0%B7%8A%E0%B6%B8%E0%B6%9C%20%E0%B6%B8%E0%B6%B0%E0%B7%8A%E2%80%8D%E0%B6%BA%E0%B6%BD%E0%B7%8A%E0%B6%AE%E0%B7%8A%E0%B6%AD%E0%B7%8F%E0%B6%B1%E0%B6%BA%20)!5e0!3m2!1sen!2slk!4v1695308567890!5m2!1sen!2slk"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Arahath maga Center Location"
              ></iframe>
              <a 
                href="https://maps.app.goo.gl/XGJCyoR2QJ1RBdVc7"
                target="_blank" 
                rel="noopener noreferrer"
                className="absolute inset-0 bg-transparent group-hover:bg-black group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center z-10"
                onClick={(e) => {
                  // Allow the link to work normally
                  window.open('https://maps.app.goo.gl/XGJCyoR2QJ1RBdVc7', '_blank');
                }}
              >
                <div className="bg-white bg-opacity-90 px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <span className="text-gray-800 font-medium">Click to open in Maps</span>
                </div>
              </a>
            </div>
            <p className="text-sm text-gray-400">
              <a 
                href="https://maps.app.goo.gl/XGJCyoR2QJ1RBdVc7"
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Open in Google Maps
              </a>
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Mahaguru Center. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}