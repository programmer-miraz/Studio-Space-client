import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Replace this URL with your own studio photo whenever you want
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&w=1200&q=80";

const Benner = () => {
  return (
    <section className="mx-auto max-w-6xl px-4 py-4">
      <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-[#F1ECFE] via-[#F6F3FF] to-white dark:from-[#171D29] dark:via-[#121722] dark:to-[#0B0D12] dark:border dark:border-border dark:shadow-2xl dark:shadow-black/40">
        <div className="grid items-center gap-8 md:grid-cols-2">
          {/* Left: text */}
          <div className="space-y-6 p-8 md:p-12">
            <p className="text-sm font-medium text-muted-foreground">
              Creative Spaces. Real People. Big Ideas.
            </p>

            <h1 className="text-4xl font-extrabold  leading-tight tracking-tight md:text-5xl">
              Find &amp; Book 
              <br />
              <span className="text-primary">Creative</span> Studios
            </h1>

            <p className="max-w-sm text-muted-foreground">
              Discover amazing creative spaces for your next shoot, production
              or creative project.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button size="lg" className="rounded-full px-6">
                Explore Studios
                <ArrowRight />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-primary px-6 font-medium text-primary hover:text-primary"
              >
                Host Your Space
              </Button>
            </div>
          </div>

          {/* Right: studio photo */}
          <div className="relative h-64 md:h-[26rem]">
            <Image
              src={HERO_IMAGE}
              alt="A creative studio with cameras and lighting"
              fill
              className="rounded-3xl object-cover md:rounded-l-3xl md:rounded-r-none"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benner;
