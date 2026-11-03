import { Aperture, Send } from "lucide-react";
import Link from "next/link";

// ---------- Simple link lists (edit here anytime) ----------
const QUICK_LINKS = [
  { name: "Home", url: "/" },
  { name: "Explore Studios", url: "/Explore_Studios" },
  { name: "How It Works", url: "/#how-it-works" },
  { name: "About Us", url: "/#about" },
];

// Direct these to the real category pages on Explore Studios
const CATEGORY_LINKS = [
  { name: "Photo Studios", url: "/Explore_Studios?category=photo" },
  { name: "Sound Stages", url: "/Explore_Studios?category=sound" },
  { name: "Podcast Rooms", url: "/Explore_Studios?category=podcast" },
  { name: "Music Suites", url: "/Explore_Studios?category=music" },
];

// Social links (each icon is a small custom SVG below)
const SOCIAL_LINKS = [
  { name: "X (Twitter)", url: "https://x.com", icon: "x" },
  { name: "Facebook", url: "https://facebook.com", icon: "facebook" },
  { name: "YouTube", url: "https://youtube.com", icon: "youtube" },
  { name: "Instagram", url: "https://instagram.com", icon: "instagram" },
];

// Brand icons are not in Lucide, so they are drawn by hand here.
// Each one is a tiny black-white line/shape that inherits color.
function SocialIcon({ type, className }: { type: string; className?: string }) {
  const common = { fill: "none", stroke: "currentColor" };
  switch (type) {
    // X (Twitter) — two crossing strokes
    case "x":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M4 4 L20 20 M20 4 L4 20" />
        </svg>
      );
    // Facebook — the classic "f"
    case "facebook":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" stroke="none">
          <path d="M13.5 21v-7h2.3l.4-2.8h-2.7V9.4c0-.8.3-1.4 1.5-1.4h1.3V5.5c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2H8v2.8h2.4V21h3.1z" />
        </svg>
      );
    // YouTube — rounded play button
    case "youtube":
      return (
        <svg viewBox="0 0 24 24" className={className} {...common} strokeWidth="1.8">
          <rect x="2.5" y="6" width="19" height="12" rx="3.5" />
          <path d="M10.5 9.5 L15 12 L10.5 14.5 Z" fill="currentColor" stroke="none" />
        </svg>
      );
    // Instagram — camera square
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" className={className} {...common} strokeWidth="1.8">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    // Fallback (should never happen)
    default:
      return null;
  }
}

// Small shared heading used above each link column
function ColumnTitle({ children }: { children: string }) {
  return (
    <h3 className="text-sm font-semibold text-white">{children}</h3>
  );
}

const Footer = () => {
  return (
    // Dark navy footer card, inset with light page margin like the design
    <div>
      <footer className="overflow-hidden bg-[#121722] text-white">
        {/* Top area: 4 columns */}
        <div className="grid gap-10 px-6 py-10 grid-cols-2 sm:grid-cols-3  md:grid-cols-4 md:px-10">
          {/* Column 1: logo + tagline */}
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-[#A855F7] to-[#7C3AED]">
                <Aperture className="size-5 text-white" />
              </span>
              <span className="text-lg font-bold">
                Studio<span className="text-[#A78BFA]">Space</span>
              </span>
            </Link>
            <p className="mt-3 text-sm text-[#A1A9B8]">
              Share Space. Create More.
            </p>
          </div>

          {/* Column 2: quick links */}
          <div>
            <ColumnTitle>Quick Links</ColumnTitle>
            <ul className="mt-4 space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.name}>
                  {/* anchor fix: use Link so navigation never reloads */}
                  <Link
                    href={link.url}
                    className="text-sm text-[#C7CCD9] transition-colors hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: categories */}
          <div>
            <ColumnTitle>Categories</ColumnTitle>
            <ul className=" mt-4 pace-y-3">
              {CATEGORY_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.url}
                    className="text-sm text-[#C7CCD9] transition-colors hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: newsletter + socials */}
          <div>
            <ColumnTitle>Newsletter</ColumnTitle>
            <p className="mt-3 text-sm text-[#A1A9B8]">
              Subscribe for updates
            </p>

            {/* Email + send button (connect your newsletter API here later) */}
            <form action="#" className="mt-4 flex items-center gap-2">
              <input
                type="email"
                required
                name="email"
                placeholder="Enter your email"
                className="h-10 min-w-0 flex-1 rounded-full border border-white/10 bg-white/5 px-4 text-sm text-white outline-none transition-colors placeholder:text-[#7D879C] focus:border-[#7C3AED]/60"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#7C3AED] transition-colors hover:bg-[#8B5CF6]"
              >
                <Send className="size-4 text-white" />
              </button>
            </form>

            {/* Social icons */}
            <div className="mt-6 flex items-center gap-5">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.name}
                  className="text-[#9AA3B5] transition-colors hover:text-white"
                >
                  <SocialIcon type={social.icon} className="size-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar: copyright + legal links */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 bg-[#0E1420] px-6 py-4 text-xs text-[#A1A9B8] md:flex-row md:px-10">
          <p>© 2025 StudioSpace. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <a href="#" className="transition-colors hover:text-white">
              Terms &amp; Conditions
            </a>
            <span>|</span>
            <a href="#" className="transition-colors hover:text-white">
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
