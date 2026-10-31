import React, { Suspense } from "react";

import Link from "next/link";
import Loading from "@/components/loading/Cart_Suspense";
import { ArrowRight } from "lucide-react";
import StudioCard from "@/components/All_Cart_studios";
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
const Explore_page = () => {
    return (
        <Suspense fallback={<Loading />}>
            <ExploreContent />
        </Suspense>
    );
};


const ExploreContent = async () => {
    // 1. Fetch the data from the API
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/explore-studios`);
    if (!res.ok) {
        throw new Error("Failed to fetch studios data");
    }
    const data: Studio[] = await res.json();



    return (
        <section className="mx-auto max-w-6xl px-4 py-8">
            {/* Section header */}
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-foreground md:text-xl">
                    Featured Studios
                </h2>
                <Link
                    href="#"
                    className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                    View All
                    <ArrowRight className="size-4" />
                </Link>
            </div>

            {/* Card grid: 1 column on mobile, 2 on tablet, 4 on desktop */}
            <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {data.map((studio: Studio, index) => (
                    <StudioCard
                        key={index}
                        studio={studio}
                    />
                ))}
            </div>
        </section>
    );
};

export default Explore_page;
