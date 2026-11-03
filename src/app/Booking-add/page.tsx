
import Studio_Booking from "@/components/booking/Studio_Booking";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Suspense } from "react";
interface StudioDetails {
    _id: string;

    category: string;
    rating: number;
    reviews: number;
    location: string;
    status: string
    title: string
    bookingDate: string
    hourlyRate: string
    totalReviews: string;
    securityDeposit: string;
    image: string;
}

async function  CarouselSize() {
  
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const user = session?.user;


    let bookings: StudioDetails[] = [];

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking/${user?.email}`);

        if (!res.ok) {
            throw new Error(`Request failed with status ${res.status}`);
        }

        bookings = await res.json();
    } catch (error) {
        console.error("Failed to load bookings:", error);

    }

    if (!bookings.length) {
        return (
            <p className="py-10 text-center text-muted-foreground">
                No bookings yet. Explore destinations and book your first trip!
            </p>
        );
    }

    return (
        <div className="space-y-4">
            {bookings.map((booking, ind) => (
                <Studio_Booking key={ind} booking={booking} />
            ))}
        </div>
    );
}

export default function Page() {
    return (
        <main className="min-h-screen bg-white py-10 lg:py-16">
            <div className="mx-auto max-w-6xl px-4 lg:px-6">
                <h1 className="text-4xl text-foreground lg:text-5xl">My Studion booking</h1>
                <p className="mt-3 text-sm text-muted-foreground">
                    Track reservation statues,cancellation requests and shot times
                </p>
                <div className="mt-10">
                    <Suspense fallback={<p className="py-10 text-center">Loading bookings...</p>}>
                        <CarouselSize />
                    </Suspense>
                </div>
            </div>
        </main>
    );
}
