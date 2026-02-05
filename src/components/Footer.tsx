import Link from 'next/link';
import { Github, MessageCircle, Twitter } from 'lucide-react';

const footerLinks = {
  product: [
    { href: '/installation', label: 'Installation' },
    { href: '/docs', label: 'Documentation' },
    { href: '/playground', label: 'Playground' },
    { href: '/examples', label: 'Examples' },
    { href: '/api-reference', label: 'API Reference' },
  ],
  compare: [
    { href: '/comparison', label: 'Overview' },
    { href: '/comparison#python', label: 'vs Python' },
    { href: '/comparison#javascript', label: 'vs JavaScript' },
    { href: '/comparison#php', label: 'vs PHP' },
    { href: '/comparison#go', label: 'vs Go' },
  ],
  community: [
    { href: '/community', label: 'Overview' },
    { href: 'https://github.com/FoundationINCCorporateTeam/RIFT', label: 'GitHub', external: true },
    { href: 'https://discord.gg/rift', label: 'Discord', external: true },
    { href: '/community#contributing', label: 'Contributing' },
  ],
  resources: [
    { href: '/docs/syntax', label: 'Syntax Reference' },
    { href: '/docs/modules', label: 'Standard Library' },
    { href: '/examples/tutorials', label: 'Tutorials' },
    { href: '/community#blog', label: 'Blog' },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-[var(--glass-border)] bg-[var(--bg-secondary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-purple)] flex items-center justify-center font-bold text-white text-lg">
                R
              </div>
              <span className="font-bold text-xl text-[var(--text-primary)]">
                RIFT
              </span>
            </Link>
            <p className="text-sm text-[var(--text-secondary)] mb-4">
              The backend language that just works. Zero setup, built-in everything.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/FoundationINCCorporateTeam/RIFT"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://discord.gg/rift"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors"
                aria-label="Discord"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/riftlang"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold text-[var(--text-primary)] mb-4">Product</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Compare Links */}
          <div>
            <h3 className="font-semibold text-[var(--text-primary)] mb-4">Compare</h3>
            <ul className="space-y-2">
              {footerLinks.compare.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Links */}
          <div>
            <h3 className="font-semibold text-[var(--text-primary)] mb-4">Community</h3>
            <ul className="space-y-2">
              {footerLinks.community.map((link) => (
                <li key={link.href}>
                  {'external' in link && link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-semibold text-[var(--text-primary)] mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-[var(--glass-border)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[var(--text-muted)]">
            © {new Date().getFullYear()} RIFT Programming Language. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-sm text-[var(--text-muted)]">
            <span>Version</span>
            <span className="px-2 py-0.5 rounded bg-[var(--bg-tertiary)] text-[var(--accent-blue)] font-mono">
              0.1.0
            </span>
            <span className="px-2 py-0.5 rounded bg-[var(--accent-orange)]/20 text-[var(--accent-orange)]">
              Beta
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
