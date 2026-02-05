'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Github, Star } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/installation', label: 'Installation' },
  { href: '/docs', label: 'Docs' },
  { href: '/playground', label: 'Playground' },
  { href: '/examples', label: 'Examples' },
  { href: '/comparison', label: 'Compare' },
  { href: '/community', label: 'Community' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-purple)] flex items-center justify-center font-bold text-white text-lg">
              R
            </div>
            <span className="font-bold text-xl text-[var(--text-primary)] group-hover:text-[var(--accent-blue)] transition-colors">
              RIFT
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--accent-orange)]/20 text-[var(--accent-orange)] font-medium">
              Beta
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 rounded-lg text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://github.com/FoundationINCCorporateTeam/RIFT"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-all duration-200"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
              <div className="flex items-center gap-1 text-[var(--accent-orange)]">
                <Star className="w-3 h-3" />
                <span className="text-xs">Star</span>
              </div>
            </a>
            <Link
              href="/installation"
              className="px-4 py-2 rounded-lg bg-[var(--accent-blue)] text-white font-medium text-sm hover:bg-[var(--accent-blue)]/90 transition-all duration-200 btn-glow"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-all duration-200"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-[var(--glass-border)]">
          <nav className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-[var(--glass-border)] space-y-2">
              <a
                href="https://github.com/FoundationINCCorporateTeam/RIFT"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-[var(--text-secondary)]"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <Link
                href="/installation"
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-2 rounded-lg bg-[var(--accent-blue)] text-white font-medium text-center"
              >
                Get Started
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
