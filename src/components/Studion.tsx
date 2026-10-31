
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { ArrowRight } from "lucide-react";
import Studio_Card from "./Feature";
import { Suspense } from "react";
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


const Feature_studios = () => {
    return (
        <div>
            <Suspense fallback={<h3>looading</h3>}>
               <Feature></Feature>
            </Suspense>

        </div>
    )

}



const Feature = async () => {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/explore-studios`);
    if (!res.ok) {
        throw new Error("Failed to fetch studios data");
    }
    const data: Studio[] = await res.json();
    console.log(data);

    return (
        <section className="mx-auto max-w-6xl px-4 py-10">
            {/* Section header */}
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                    Featured Studios
                </h2>
                <Link
                    href="Explore_Studios"
                    className="flex items-center gap-1 text-sm font-medium text-foreground transition-colors hover:text-primary"
                >
                    View All
                    <ArrowRight className="size-4" />
                </Link>
            </div>

            {/* Carousel showing 1 card on mobile, 2 on tablet, 3 on desktop */}
            <Carousel
                opts={{ align: "start" }}
                className="mt-6"
                aria-label="Featured studios"
            >
                <CarouselContent>
                    {data.map((studio) => (
                        <CarouselItem
                            key={studio._id}
                            className="md:basis-1/2 lg:basis-1/4"
                        >
                            <Studio_Card studio={studio} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="-left-4 rounded-full bg-background" />
                <CarouselNext className="-right-4 rounded-full bg-background" />
            </Carousel>
        </section>
    );
};

export default Feature_studios;
