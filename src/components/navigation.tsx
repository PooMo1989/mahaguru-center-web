"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
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
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Set initial state on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled
          ? "bg-[#4A1232]/75 backdrop-blur-lg border-b border-white/10"
          : "bg-transparent border-b border-transparent"
      }`}
    >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="flex items-center space-x-3 text-2xl font-bold text-[#FCE8D9] transition-colors hover:text-[#F3D1C4]"
            >
              <Image
                src="/logo.png"
                alt="Mahaguru Center Logo"
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
              />
              <span>Mahaguru Center</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigationLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-2 text-sm font-medium transition-all relative ${
                      isActive
                        ? "text-[#E85D5D] after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#E85D5D]"
                        : "text-[#FCE8D9] hover:bg-[#E85D5D] hover:text-white hover:rounded-md"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <DropdownMenu.Root
              open={isMobileMenuOpen}
              onOpenChange={setIsMobileMenuOpen}
            >
              <DropdownMenu.Trigger className="inline-flex items-center justify-center rounded-md p-2 text-[#FCE8D9] hover:bg-[#E85D5D] hover:text-white focus:ring-2 focus:ring-[#E85D5D] focus:outline-none focus:ring-inset">
                {isMobileMenuOpen ? (
                  <Cross2Icon className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <HamburgerMenuIcon className="h-6 w-6" aria-hidden="true" />
                )}
                <span className="sr-only">Open main menu</span>
              </DropdownMenu.Trigger>

              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  className="ring-opacity-5 mt-2 w-48 rounded-md bg-[#FFF9F5] shadow-lg ring-1 ring-[#4A1232]"
                  align="end"
                  sideOffset={5}
                >
                  {navigationLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <DropdownMenu.Item key={link.href} asChild>
                        <Link
                          href={link.href}
                          className={`block px-4 py-2 text-sm transition-colors focus:outline-none ${
                            isActive
                              ? "text-[#E85D5D] font-semibold border-l-4 border-[#E85D5D]"
                              : "text-[#301020] hover:bg-[#E85D5D] hover:text-white focus:bg-[#E85D5D] focus:text-white"
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {link.label}
                        </Link>
                      </DropdownMenu.Item>
                    );
                  })}
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
    <footer className="bg-gradient-to-b from-[#47203B] to-[#7A344E] text-[#FFF9F5]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Contact Information & Logo */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <Image
                src="/logo.png"
                alt="Mahaguru Center Logo"
                width={48}
                height={48}
                className="h-12 w-12 object-contain"
              />
              <h3 className="text-2xl font-bold">Mahaguru Center</h3>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="mb-2 text-lg font-semibold">Contact Details</h4>
                <p className="text-[#FCE8D9]">
                  Email:{" "}
                  <a
                    href="mailto:secretary@mahaguru.lk"
                    className="transition-colors hover:text-[#E85D5D]"
                  >
                    secretary@mahaguru.lk
                  </a>
                </p>
                <p className="text-[#FCE8D9]">
                  Hotline:{" "}
                  <a
                    href="tel:+94777100490"
                    className="transition-colors hover:text-[#E85D5D]"
                  >
                    +94 777 100 490
                  </a>
                </p>
              </div>

              <div>
                <h4 className="mb-2 text-lg font-semibold">Follow Us</h4>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <a
                      href="https://www.facebook.com/arahthmaga"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#FCE8D9] transition-colors hover:text-[#E85D5D]"
                      aria-label="Facebook"
                    >
                      <svg
                        className="h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </a>
                    <span className="text-sm text-[#FCE8D9]">
                      Join our active community
                    </span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <a
                      href="https://www.youtube.com/@maithribuddha"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#FCE8D9] transition-colors hover:text-[#E85D5D]"
                      aria-label="YouTube"
                    >
                      <svg
                        className="h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    </a>
                    <span className="text-sm text-[#FCE8D9]">
                      Explore Dhamma Videos
                    </span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <a
                      href="https://www.maithribodhi.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#FCE8D9] transition-colors hover:text-[#E85D5D]"
                      aria-label="Dhamma Archive"
                    >
                      <svg
                        className="h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                    </a>
                    <span className="text-sm text-[#FCE8D9]">
                      Visit our digital Archive
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Location Map */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Visit Us</h4>
            <div className="group relative h-64 cursor-pointer overflow-hidden rounded-lg lg:h-80">
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
                className="group-hover:bg-opacity-10 absolute inset-0 z-10 flex items-center justify-center bg-transparent transition-all duration-300 group-hover:bg-black"
              >
                <div className="bg-opacity-90 pointer-events-none rounded-lg bg-[#FFF9F5] px-4 py-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="font-medium text-[#301020]">
                    Click to open in Maps
                  </span>
                </div>
              </a>
            </div>
            <p className="text-sm text-[#FCE8D9]">
              <a
                href="https://maps.app.goo.gl/XGJCyoR2QJ1RBdVc7"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-[#E85D5D]"
              >
                Open in Google Maps
              </a>
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-[#F3D1C4] pt-8 text-center">
          <p className="text-sm text-[#FCE8D9]">
            © {new Date().getFullYear()} Mahaguru Center. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
