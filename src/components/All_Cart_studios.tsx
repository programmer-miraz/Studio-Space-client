
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, Image as ImageIcon, MapPin, Star } from "lucide-react";
import { Button } from "./ui/button";
type Studio = {
    name: string;
    category: string;
    rating: number;
    reviews: number;
    location: string;
    title: string
    totalReviews: string;
    securityDeposit: string;
    image: string; // <- the image that is stored in the database for this card
};


const StudioCard = ({ studio }: { studio: Studio }) => {
    // Fallback values for safely rendering missing data
    console.log(studio);
    return (
        <div className="overflow-hidden rounded-2xl bg-card ring-1 ring-foreground/10 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
            {/* Card image — straight from the database */}
            <div className="relative h-40 bg-muted">
                <Image
                    src={studio.image}
                    alt="images"
                    fill
                    className="object-cover"
                />

                {/* Category badge on top of the image */}
                <span className="absolute left-3 top-3 rounded-lg bg-gradient-to-r from-[#7C3AED] to-[#A855F7] px-3 py-1 text-xs font-medium text-white shadow">
                    {studio.category}
                </span>

                {/* Like (favorite) button on top of the image */}

                <Button
                    type="button"
                    size="icon"
                    variant="secondary"
                    aria-label="Add to favorites"
                    className="absolute right-3 top-3 size-9 rounded-full  text-gray-700 shadow-md backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white hover:text-red-500"
                >
                    <Heart className="size-4.5 transition-all duration-300 hover:fill-red-500" />
                </Button>
            </div>

            {/* Card details */}
            <div className="space-y-2 p-4">
                {/* Studio name */}
                <h3 className="font-bold text-foreground">{studio.title}</h3>

                {/* Star rating + review count */}
                <p className="flex items-center gap-1 text-sm">
                    <Star className="size-4 fill-[#F59E0B] text-[#F59E0B]" />
                    <span className="font-semibold text-foreground">{studio.rating}</span>
                    <span className="text-muted-foreground">({studio.totalReviews} reviews)</span>
                </p>

                {/* Location */}
                <p className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="size-4" />
                    {studio.location}
                </p>
            </div>

            {/* Bottom row: price + details button */}
            <div className="border-t border-border">
                <div className="flex items-center justify-between p-4">
                    <p className="font-bold text-foreground">
                        ${studio.securityDeposit}
                        <span className="ml-1 text-sm font-normal text-muted-foreground">
                            / hr
                        </span>
                    </p>
                    <Link
                        href="#"
                        className="flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                        View Details
                        <ArrowRight className="size-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
};
export default StudioCard