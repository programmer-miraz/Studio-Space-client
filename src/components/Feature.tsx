
"use client"
import { useState } from "react";
import Image from "next/image";
import { ArrowRight, Heart, MapPin, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";


type Studio = {
  _id: string;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  location: string;
  totalReviews: string;
  title: string
  securityDeposit: string;
  image: string; // <- the image that is stored in the database for this card
};

function Studio_Card({ studio }: { studio: Studio }) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Card className="group gap-0 overflow-hidden rounded-2xl py-0">
      {/* Top: studio image + badge + heart */}
      <div className="relative h-48 bg-muted">
        <Image
          src={studio.image}
          alt="images"
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />

        {/* Category badge */}
        <span className="absolute left-3 top-3 rounded-lg bg-gradient-to-r from-[#7C3AED] to-[#A855F7] px-3 py-1 text-xs font-medium text-white shadow">
          {studio.category}
        </span>

        {/* Heart button */}
        <button
          type="button"
          onClick={() => setIsFavorite(!isFavorite)}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-white/80 shadow-sm shadow-black/10 backdrop-blur-sm transition-colors hover:bg-white dark:bg-black/50 dark:hover:bg-black/70"
        >
          <Heart
            className={
              isFavorite
                ? "size-4 fill-red-500 text-red-500"
                : "size-4 text-foreground"
            }
          />
        </button>
      </div>

      {/* Bottom: studio info */}
      <CardContent className="space-y-2">
        {/* Name */}
        <h3 className="font-semibold text-foreground">{studio.name}</h3>

        {/* Star rating + review count */}
        <p className="flex items-center gap-1 text-sm">
          <Star className="size-4 fill-[#F59E0B] text-[#F59E0B]" />
          <span className="font-semibold text-foreground">{studio.rating}</span>
          <span className="text-muted-foreground">
            ({studio.reviews} reviews)
          </span>
        </p>

        {/* Location */}
        <p className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="size-4 text-primary" />
          {studio.location}
        </p>

        {/* Price + View Details button */}
        <div className="flex items-center justify-between pt-2 pb-1">
          <p className="font-bold text-foreground">
            ${studio.securityDeposit}
            <span className="ml-1 text-sm font-normal text-muted-foreground">
              / hr
            </span>
          </p>
          <Link
          href={`/Details/${studio._id}`}
   
            className="flex items-center gap-1 rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/80"
          >
            View Details
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

// Section: heading + "View All" link + carousel of studio cards
export default Studio_Card