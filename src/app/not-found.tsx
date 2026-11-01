import Link from "next/link";
import { ArrowRight, Home, Sparkles } from "lucide-react";

// ---------------------------------------------------------------
// Mascot scene — hand-drawn SVG so no image files are needed.
// Colors are fixed pastels on purpose (illustrations don't change
// between light/dark mode, same as normal <Image> assets).
// ---------------------------------------------------------------
function MascotScene() {
  return (
    <div className="relative mx-auto h-72 w-full max-w-sm md:h-80">
      <svg viewBox="0 0 340 320" className="h-full w-full">
        <defs>
          {/* Lens glass gradient */}
          <radialGradient id="lensGrad" cx="40%" cy="35%" r="70%">
            <stop offset="0%" stopColor="#A78BFA" />
            <stop offset="45%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#2E1065" />
          </radialGradient>
          {/* Purple gradient (used for bubble, cone, pill shapes) */}
          <linearGradient id="purpleGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#A855F7" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
          {/* Camera body: white softening into lavender */}
          <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#EFE9FB" />
          </linearGradient>
          {/* Tiny picture inside the polaroid frame */}
          <linearGradient id="imgGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C4B5FD" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>

        {/* Ground shadow under the character */}
        <ellipse cx="175" cy="295" rx="125" ry="18" fill="#7C3AED" opacity="0.12" />
        {/* Soft lavender circle behind the character */}
        <circle cx="80" cy="215" r="68" fill="#8B5CF6" opacity="0.16" />

        {/* Clap / surprise strokes (top left) */}
        <g
          stroke="#7C3AED"
          strokeWidth="5"
          strokeLinecap="round"
          transform="translate(128 52) rotate(-18)"
        >
          <line x1="0" y1="0" x2="-8" y2="-14" />
          <line x1="14" y1="-2" x2="14" y2="-18" />
          <line x1="28" y1="0" x2="36" y2="-12" />
        </g>

        {/* Polaroid picture frame (top left) */}
        <g transform="translate(26 62) rotate(-10)">
          <rect width="52" height="56" rx="8" fill="#FFFFFF" stroke="#E4DBF8" strokeWidth="2" />
          <rect x="6" y="6" width="40" height="34" rx="4" fill="url(#imgGrad)" />
          <path d="M10 38 L21 22 L29 32 Z" fill="#FFFFFF" opacity="0.75" />
          <path d="M28 39 L37 26 L44 39 Z" fill="#FFFFFF" opacity="0.6" />
          <circle cx="38" cy="13" r="4" fill="#FB923C" />
        </g>

        {/* Traffic cone with white stripes (left) */}
        <g transform="translate(34 232)">
          <path d="M9 0 L21 0 L30 36 L0 36 Z" fill="#7C3AED" />
          <rect x="2" y="10" width="26" height="5" fill="#FFFFFF" transform="rotate(-2 15 12)" />
          <rect x="4" y="22" width="24" height="5" fill="#FFFFFF" transform="rotate(-2 16 24)" />
          <rect x="-5" y="34" width="40" height="9" rx="4.5" fill="#5B21B6" />
        </g>

        {/* Camera character (center) */}
        <g transform="translate(95 100)">
          {/* Feet */}
          <rect x="28" y="112" width="36" height="24" rx="12" fill="#FFFFFF" stroke="#E4DBF8" strokeWidth="2" />
          <rect x="86" y="112" width="36" height="24" rx="12" fill="#FFFFFF" stroke="#E4DBF8" strokeWidth="2" />
          {/* Body */}
          <rect x="0" y="0" width="152" height="114" rx="30" fill="url(#bodyGrad)" stroke="#E4DBF8" strokeWidth="2" />
          {/* Top grip */}
          <rect x="20" y="-9" width="58" height="16" rx="8" fill="#C4B5FD" />
          {/* Big lens */}
          <circle cx="76" cy="58" r="42" fill="#FFFFFF" stroke="#E4DBF8" strokeWidth="2" />
          <circle cx="76" cy="58" r="34" fill="url(#lensGrad)" />
          <circle cx="64" cy="46" r="8" fill="#FFFFFF" opacity="0.3" />
          {/* Side buttons */}
          <circle cx="130" cy="28" r="5" fill="#C4B5FD" />
          <circle cx="134" cy="43" r="5" fill="#8B5CF6" />
          {/* Hands holding the map */}
          <circle cx="-4" cy="62" r="13" fill="#FFFFFF" stroke="#E4DBF8" strokeWidth="2" />
          <circle cx="156" cy="62" r="13" fill="#FFFFFF" stroke="#E4DBF8" strokeWidth="2" />
        </g>

        {/* Folded map with route + pin (front, center) */}
        <g transform="translate(112 148) rotate(-7)">
          <rect width="76" height="56" rx="8" fill="#FFF9F3" stroke="#F0DCC8" strokeWidth="2" />
          <line x1="38" y1="4" x2="38" y2="52" stroke="#EAD8C5" strokeWidth="1.5" />
          <path d="M9 42 C22 24 42 14 62 14" stroke="#E58E4E" strokeWidth="3" fill="none" strokeDasharray="5 5" strokeLinecap="round" />
          {/* Location pin */}
          <path d="M63 14 a8 8 0 1 1 0.1 0" fill="#F4511E" />
          <circle cx="63" cy="7" r="2.5" fill="#FFFFFF" />
        </g>

        {/* Oops! speech bubble (top right) */}
        <g transform="translate(196 30)">
          <rect width="92" height="42" rx="15" fill="url(#purpleGrad)" />
          <path d="M26 40 L16 56 L40 42 Z" transform="rotate(14 28 44)" fill="#A855F7" />
          <text x="46" y="28" textAnchor="middle" fontSize="21" fontWeight="800" fill="#FFFFFF">
            Oops!
          </text>
        </g>

        {/* Sparkles sprinkled around */}
        <path d="M0 -11 C2 -3 3 -2 11 0 C3 2 2 3 0 11 C-2 3 -3 2 -11 0 C-3 -2 -2 -3 0 -11 Z" fill="#C4B5FD" transform="translate(268 20) scale(1.1)" />
        <path d="M0 -11 C2 -3 3 -2 11 0 C3 2 2 3 0 11 C-2 3 -3 2 -11 0 C-3 -2 -2 -3 0 -11 Z" fill="#A855F7" transform="translate(310 96) scale(0.7)" />
        <path d="M0 -11 C2 -3 3 -2 11 0 C3 2 2 3 0 11 C-2 3 -3 2 -11 0 C-3 -2 -2 -3 0 -11 Z" fill="#C4B5FD" transform="translate(302 200) scale(0.9)" />
        <path d="M0 -11 C2 -3 3 -2 11 0 C3 2 2 3 0 11 C-2 3 -3 2 -11 0 C-3 -2 -2 -3 0 -11 Z" fill="#8B5CF6" transform="translate(60 24) scale(0.5)" />

        {/* Tiny floating dots */}
        <circle cx="296" cy="150" r="4" fill="#A855F7" opacity="0.5" />
        <circle cx="210" cy="290" r="5" fill="#C4B5FD" opacity="0.6" />
      </svg>
    </div>
  );
}

const NotFound = () => {
  return (
    <section className="relative flex min-h-svh items-center justify-center overflow-hidden p-4">
      {/* Page background circles */}
      <div className="absolute -left-16 -top-16 size-56 rounded-full bg-primary/10" />
      <div className="absolute -bottom-20 -right-10 size-64 rounded-full bg-primary/10" />
      <div className="absolute right-10 top-8 size-10 rounded-full bg-primary/15" />

      {/* Main card */}
      <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-border bg-white shadow-xl md:grid md:grid-cols-2 md:items-center md:px-10 md:py-12 dark:border-white/10 dark:bg-card dark:shadow-black/30">
        {/* Card corner circles (like the design) */}
        <div className="pointer-events-none absolute -left-14 -top-14 size-44 rounded-full bg-primary/15" />
        <div className="pointer-events-none absolute -left-16 -bottom-20 size-52 rounded-full bg-primary/15" />
        <div className="pointer-events-none absolute -right-12 top-1/3 size-36 rounded-full bg-primary/10" />
        <div className="pointer-events-none absolute -bottom-16 -right-10 size-40 rounded-[40%] bg-primary/35" />

        {/* Left: mascot illustration */}
        <div className="relative z-10 static px-6 pt-10 md:px-0 md:py-8">
          <MascotScene />
        </div>

        {/* Right: 404 content */}
        <div className="relative z-10 space-y-5 px-6 pb-12 pt-8 md:px-0 md:py-0">
          {/* StudioSpace pill */}
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-foreground">
            <Sparkles className="size-4 text-primary" />
            StudioSpace
          </span>

          {/* Big gradient 404 with the swoosh ellipse */}
          <div className="relative inline-block">
            <span className="pointer-events-none absolute -inset-x-10 -inset-y-6 rounded-[50%] border-2 border-primary/40 -rotate-12" />
            <span className="bg-gradient-to-b from-[#A78BFA] to-[#7C3AED] bg-clip-text text-[6.5rem] font-black leading-none tracking-tight text-transparent md:text-[7.5rem] dark:from-[#B79CFF] dark:to-[#8B5CF6]">
              404
            </span>
          </div>

          <h1 className="text-2xl font-bold text-foreground md:text-3xl">
            Oops! <span className="text-primary">Studio Not Found</span>
          </h1>

          <p className="max-w-sm text-muted-foreground">
            Looks like this creative space doesn&apos;t exist or may have been
            moved. Let&apos;s get you back to exploring amazing studios.
          </p>

          {/* Return home button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
          >
            <Home className="size-4" />
            Return Home
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
