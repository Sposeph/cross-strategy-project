"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Track Record", href: "/#track-record" },
  { label: "Benefits", href: "/#benefits" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "About", href: "/about" },
  { label: "Content", href: "/blog" },
];

interface NavbarProps {
  logoText?: string
  calendarUrl?: string
}

export default function Navbar({ logoText = "[Owner Name]", calendarUrl }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const bookHref = calendarUrl || "/#contact";
  const bookIsExternal = /^https?:\/\//.test(bookHref);

  return (
    <header className="bg-brand-jet-black border-b border-brand-dim-grey sticky top-0 z-50">
      <nav
        className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-16"
        aria-label="Primary navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="shrink-0 hover:opacity-90 transition-opacity duration-200"
          aria-label="Homepage"
        >
          <Image
            src="/logo/crossover-strategies-logo-light.png"
            alt={logoText}
            width={900}
            height={176}
            priority
            className="h-8 w-auto"
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-barlow font-semibold text-brand-silver hover:text-brand-alabaster transition-colors duration-200 text-label"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={bookHref}
            {...(bookIsExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="font-barlow font-bold text-brand-alabaster bg-brand-red px-5 py-2 hover:opacity-90 transition-opacity duration-200 text-label"
          >
            Book a Call
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`block w-6 h-0.5 bg-brand-alabaster transition-transform duration-200 ${open ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-brand-alabaster transition-opacity duration-200 ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-brand-alabaster transition-transform duration-200 ${open ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-brand-jet-black border-t border-brand-dim-grey px-6 pb-6 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-barlow font-semibold text-brand-silver hover:text-brand-alabaster transition-colors duration-200 text-label py-2"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={bookHref}
            {...(bookIsExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="font-barlow font-bold text-brand-alabaster bg-brand-red px-5 py-3 hover:opacity-90 transition-opacity duration-200 text-label text-center"
            onClick={() => setOpen(false)}
          >
            Book a Call
          </Link>
        </div>
      )}
    </header>
  );
}
