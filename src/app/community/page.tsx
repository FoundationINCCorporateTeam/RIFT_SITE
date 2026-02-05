import Link from "next/link";
import { 
  Github, 
  MessageCircle, 
  Twitter, 
  BookOpen, 
  Code, 
  Users, 
  Heart,
  Star,
  GitPullRequest,
  Bug,
  Lightbulb,
  FileText,
  ArrowRight,
  ExternalLink
} from "lucide-react";

export const metadata = {
  title: "Community - RIFT Programming Language",
  description: "Join the RIFT community. Get help, contribute, and connect with other developers.",
};

const channels = [
  {
    name: "GitHub",
    description: "Star the repo, report issues, and contribute code",
    icon: Github,
    url: "https://github.com/FoundationINCCorporateTeam/RIFT",
    cta: "View Repository",
    stats: "Star us!",
  },
  {
    name: "Discord",
    description: "Join our Discord server for real-time chat and help",
    icon: MessageCircle,
    url: "https://discord.gg/rift",
    cta: "Join Server",
    stats: "Join the community",
  },
  {
    name: "Twitter/X",
    description: "Follow for updates, tips, and community highlights",
    icon: Twitter,
    url: "https://twitter.com/riftlang",
    cta: "Follow",
    stats: "@riftlang",
  },
];

const contributionWays = [
  {
    icon: Bug,
    title: "Report Bugs",
    description: "Found a bug? Open an issue on GitHub with reproduction steps.",
    link: "https://github.com/FoundationINCCorporateTeam/RIFT/issues/new?labels=bug",
  },
  {
    icon: Lightbulb,
    title: "Suggest Features",
    description: "Have an idea? Open a feature request and discuss with the community.",
    link: "https://github.com/FoundationINCCorporateTeam/RIFT/issues/new?labels=enhancement",
  },
  {
    icon: GitPullRequest,
    title: "Submit Pull Requests",
    description: "Fix bugs, add features, or improve documentation with a PR.",
    link: "https://github.com/FoundationINCCorporateTeam/RIFT/pulls",
  },
  {
    icon: FileText,
    title: "Write Documentation",
    description: "Help improve our docs, tutorials, and examples.",
    link: "https://github.com/FoundationINCCorporateTeam/RIFT/tree/main/docs",
  },
  {
    icon: Code,
    title: "Create Examples",
    description: "Build example projects and share them with the community.",
    link: "/examples",
  },
  {
    icon: Heart,
    title: "Spread the Word",
    description: "Tweet about RIFT, write blog posts, or tell your colleagues.",
    link: "https://twitter.com/intent/tweet?text=Check%20out%20RIFT%20-%20the%20backend%20language%20that%20just%20works!%20https://rift.astroyds.com",
  },
];

const resources = [
  {
    title: "Documentation",
    description: "Complete language reference and guides",
    icon: BookOpen,
    href: "/docs",
  },
  {
    title: "Examples",
    description: "Real-world code examples and tutorials",
    icon: Code,
    href: "/examples",
  },
  {
    title: "GitHub Repository",
    description: "Source code, issues, and discussions",
    icon: Github,
    href: "https://github.com/FoundationINCCorporateTeam/RIFT",
    external: true,
  },
  {
    title: "Playground",
    description: "Try RIFT in your browser",
    icon: Code,
    href: "/playground",
  },
];

export default function CommunityPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-[var(--text-primary)] mb-4">
            Join the RIFT Community
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Connect with developers, get help, and contribute to RIFT&apos;s future.
          </p>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-6 mb-16">
          <div className="glass rounded-xl p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Star className="w-6 h-6 text-[var(--accent-orange)]" />
            </div>
            <div className="text-3xl font-bold text-[var(--text-primary)] mb-1">Open Source</div>
            <div className="text-sm text-[var(--text-muted)]">MIT Licensed</div>
          </div>
          <div className="glass rounded-xl p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Users className="w-6 h-6 text-[var(--accent-blue)]" />
            </div>
            <div className="text-3xl font-bold text-[var(--text-primary)] mb-1">Growing</div>
            <div className="text-sm text-[var(--text-muted)]">Active Community</div>
          </div>
          <div className="glass rounded-xl p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Heart className="w-6 h-6 text-[var(--accent-red)]" />
            </div>
            <div className="text-3xl font-bold text-[var(--text-primary)] mb-1">Beta 0.1.0</div>
            <div className="text-sm text-[var(--text-muted)]">Active Development</div>
          </div>
        </div>

        {/* Communication Channels */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
            Connect With Us
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {channels.map((channel, index) => (
              <a
                key={index}
                href={channel.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass rounded-xl p-6 glass-hover transition-all duration-300 group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-[var(--accent-blue)]/20 flex items-center justify-center">
                    <channel.icon className="w-6 h-6 text-[var(--accent-blue)]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--text-primary)]">{channel.name}</h3>
                    <span className="text-sm text-[var(--text-muted)]">{channel.stats}</span>
                  </div>
                </div>
                <p className="text-sm text-[var(--text-secondary)] mb-4">
                  {channel.description}
                </p>
                <span className="flex items-center gap-2 text-[var(--accent-blue)] font-medium group-hover:gap-3 transition-all">
                  {channel.cta}
                  <ExternalLink className="w-4 h-4" />
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* Contributing */}
        <section className="mb-16" id="contributing">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
            How to Contribute
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {contributionWays.map((item, index) => (
              <a
                key={index}
                href={item.link}
                target={item.link.startsWith('http') ? '_blank' : undefined}
                rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="glass rounded-xl p-6 glass-hover transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-[var(--accent-purple)]/20 flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-[var(--accent-purple)]" />
                </div>
                <h3 className="font-semibold text-[var(--text-primary)] mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--text-secondary)]">{item.description}</p>
              </a>
            ))}
          </div>
          
          <div className="mt-8 glass rounded-xl p-6">
            <h3 className="font-semibold text-[var(--text-primary)] mb-4">Getting Started with Contributing</h3>
            <ol className="space-y-3">
              <li className="flex items-start gap-3 text-[var(--text-secondary)]">
                <span className="w-6 h-6 rounded-full bg-[var(--accent-blue)]/20 flex items-center justify-center text-sm text-[var(--accent-blue)] flex-shrink-0">1</span>
                <span>Fork the repository on GitHub</span>
              </li>
              <li className="flex items-start gap-3 text-[var(--text-secondary)]">
                <span className="w-6 h-6 rounded-full bg-[var(--accent-blue)]/20 flex items-center justify-center text-sm text-[var(--accent-blue)] flex-shrink-0">2</span>
                <span>Clone your fork and create a new branch</span>
              </li>
              <li className="flex items-start gap-3 text-[var(--text-secondary)]">
                <span className="w-6 h-6 rounded-full bg-[var(--accent-blue)]/20 flex items-center justify-center text-sm text-[var(--accent-blue)] flex-shrink-0">3</span>
                <span>Make your changes and test them locally</span>
              </li>
              <li className="flex items-start gap-3 text-[var(--text-secondary)]">
                <span className="w-6 h-6 rounded-full bg-[var(--accent-blue)]/20 flex items-center justify-center text-sm text-[var(--accent-blue)] flex-shrink-0">4</span>
                <span>Submit a pull request with a clear description</span>
              </li>
            </ol>
            <div className="mt-6">
              <a
                href="https://github.com/FoundationINCCorporateTeam/RIFT/blob/main/CONTRIBUTING.md"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[var(--accent-blue)] hover:underline"
              >
                Read the full contributing guide
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* Resources */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
            Resources
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {resources.map((resource, index) => (
              <Link
                key={index}
                href={resource.href}
                target={resource.external ? '_blank' : undefined}
                rel={resource.external ? 'noopener noreferrer' : undefined}
                className="glass rounded-xl p-5 glass-hover transition-all duration-300 flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-lg bg-[var(--accent-teal)]/20 flex items-center justify-center flex-shrink-0">
                  <resource.icon className="w-5 h-5 text-[var(--accent-teal)]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--text-primary)] mb-1">{resource.title}</h3>
                  <p className="text-sm text-[var(--text-muted)]">{resource.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Blog/News Section */}
        <section className="mb-16" id="blog">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
            Latest Updates
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass rounded-xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-1 rounded text-xs bg-[var(--accent-green)]/20 text-[var(--accent-green)]">
                  Release
                </span>
                <span className="text-sm text-[var(--text-muted)]">2026</span>
              </div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                RIFT Beta 0.1.0 Released
              </h3>
              <p className="text-sm text-[var(--text-secondary)] mb-4">
                We&apos;re excited to announce the first public beta of RIFT! This release includes the 
                core language, HTTP module, database support, and crypto module.
              </p>
              <Link
                href="https://github.com/FoundationINCCorporateTeam/RIFT/releases"
                className="text-[var(--accent-blue)] text-sm hover:underline flex items-center gap-1"
              >
                Read more <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            
            <div className="glass rounded-xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-1 rounded text-xs bg-[var(--accent-purple)]/20 text-[var(--accent-purple)]">
                  Announcement
                </span>
                <span className="text-sm text-[var(--text-muted)]">2026</span>
              </div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                Website Launch
              </h3>
              <p className="text-sm text-[var(--text-secondary)] mb-4">
                The official RIFT website is now live! Explore documentation, try the playground, 
                and join our growing community.
              </p>
              <Link
                href="/"
                className="text-[var(--accent-blue)] text-sm hover:underline flex items-center gap-1"
              >
                Explore <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="glass rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
            Stay Updated
          </h2>
          <p className="text-[var(--text-secondary)] mb-6 max-w-xl mx-auto">
            Subscribe to our newsletter for monthly updates, tutorials, and community highlights.
          </p>
          <form className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--glass-border)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-blue)]"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[var(--accent-blue)] text-white font-medium hover:bg-[var(--accent-blue)]/90 transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
          <p className="text-xs text-[var(--text-muted)] mt-4">
            No spam, ever. Unsubscribe at any time.
          </p>
        </section>
      </div>
    </div>
  );
}
