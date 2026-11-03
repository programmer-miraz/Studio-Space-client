import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Replace this URL with your own studio photo whenever you want
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&w=1200&q=80";

const Benner = () => {
  return (
    <section className="mx-auto max-w-6xl px-2 py-4">
      <div className="relative isolate flex min-h-[480px] items-center justify-center overflow-hidden rounded-2xl border border-border md:min-h-[560px] lg:min-h-[600px]">

        {/* Background Image */}
        <Image
          src={HERO_IMAGE}
          alt="A creative studio with cameras and lighting"
          fill
          priority
          className="absolute inset-0 -z-20 object-cover"
          sizes="(max-width: 768px) 100vw, 1200px"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/35 via-black/45 to-black/65" />

        {/* Content */}
        <div className="mx-auto w-full max-w-3xl space-y-6 px-5 py-16 text-center sm:px-8 md:py-20">

          <p className="inline-flex rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-medium tracking-wide text-white backdrop-blur-md sm:text-sm">
            Creative Spaces. Real People. Big Ideas.
          </p>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Find &amp; Book
            <br />
            <span className="text-purple-300">Creative Studios</span>
          </h1>

          <p className="mx-auto max-w-xl text-sm leading-relaxed text-white/85 sm:text-base md:text-lg">
            Discover amazing creative spaces for your next shoot, production
            or creative project.
          </p>

          <div className="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row">
            <Link href="/Explore_Studios">
              <Button
                size="lg"
                className="w-full cursor-pointer rounded-full px-7 shadow-lg shadow-purple-950/20 sm:w-auto"
              >
                Explore Studios
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </Link>

            <Link href="/Add_Studio">
              <Button
                size="lg"
                variant="outline"
                className="w-full rounded-full border-white/60 bg-white/10 px-7 text-white backdrop-blur-md hover:bg-white/20 hover:text-white sm:w-auto"
              >
                Host Your Space
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benner;
