import React, { Suspense } from "react";
import {
  ArrowRight,
  AudioLines,
  Camera,
  EighthNote as Music,
  LayoutGrid,
  Mic,
  Palette,
} from "lucide-react";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Category = {
  _id?: string;
  id?: string;
  name?: string;
  title?: string;
};

type IconStyle = {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  className: string;
};

const ICON_STYLES: Array<{ match: string[]; style: IconStyle }> = [
  {
    match: ["photo", "camera"],
    style: { icon: Camera, className: "text-[#6D28D9]" },
  },
  {
    match: ["sound", "stage"],
    style: { icon: AudioLines, className: "text-[#D946EF]" },
  },
  {
    match: ["podcast", "mic"],
    style: { icon: Mic, className: "text-[#22C55E]" },
  },
  {
    match: ["music", "suite"],
    style: { icon: Music, className: "text-[#8B5CF6]" },
  },
  {
    match: ["art", "workshop"],
    style: { icon: Palette, className: "text-[#F59E0B]" },
  },
];

const FALLBACK_STYLE: IconStyle = {
  icon: LayoutGrid,
  className: "text-primary",
};

const getIconStyle = (name: string): IconStyle => {
  const lower = name.toLowerCase();
  const found = ICON_STYLES.find((entry) =>
    entry.match.some((keyword) => lower.includes(keyword))
  );
  return found?.style ?? FALLBACK_STYLE;
};

// Shared card markup so the grid and carousel use the exact same design.
const CategoryCard = ({ category, index }: { category: Category; index: number }) => {
  const name = category.name ?? category.title ?? "Category";
  const { icon: Icon, className } = getIconStyle(name);
  return (
    <a
      href="#"
      className="flex flex-col items-center gap-3 rounded-2xl bg-[#F4F1FB] px-4 py-8 transition-transform hover:-translate-y-1 hover:shadow-md dark:bg-card dark:border dark:border-border"
    >
      <Icon className={`size-8 ${className}`} strokeWidth={2} />
      <p className="text-sm font-semibold text-foreground">{name}</p>
    </a>
  );
};

const SuspenseCetagory = () => {
  return (
    <>
      <Suspense fallback={<p>Loading.....</p>}>
        <Cetagory />
      </Suspense>
    </>
  );
};

const Cetagory = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cetagory`);
  if (!res.ok) {
    throw new Error("Failed to fetch category data");
  }
  const data = await res.json();
  const categories: Category[] = Array.isArray(data) ? data : data?.data ?? [];

  return (
    <section className="mx-auto mt-3 max-w-6xl px-4 py-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground md:text-xl">
          Browse by Categories
        </h2>
        <Link
          href="#"
          className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          View All
          <ArrowRight className="size-4" />
        </Link>
      </div>

      {/* Desktop / laptop: original grid layout */}
      <div className="mt-4 hidden gap-4 lg:grid lg:grid-cols-5">
        {categories.map((category, index) => (
          <div key={category._id ?? category.id ?? index}>
            <CategoryCard category={category} index={index} />
          </div>
        ))}
      </div>

      {/* Tablet / mobile: swipeable carousel */}
      <Carousel
        className="mt-4 lg:hidden"
        opts={{ align: "start", watchDrag: true }}
      >
        <CarouselContent className="mr-0">
          {categories.map((category, index) => (
            <CarouselItem
              key={category._id ?? category.id ?? index}
              className="basis-1/2 sm:basis-1/3 md:basis-1/4"
            >
              <CategoryCard category={category} index={index} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="inset-y-auto left-1 top-1/2 size-8 -translate-y-1/2 bg-card shadow-md" />
        <CarouselNext className="inset-y-auto right-1 top-1/2 size-8 -translate-y-1/2 bg-card shadow-md" />
      </Carousel>
    </section>
  );
};

export default SuspenseCetagory;
