"use client"
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { MapPin, Pencil, Plus, Star, Trash2 } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { Button, buttonVariants } from "@/components/ui/button";

import { cn } from "cn";
import { useRouter } from "next/navigation";

type MyStudio = {
    _id: string;
    title?: string;
    name?: string;
    category?: string;
    image?: string;
    location?: string;
    hourlyRate?: number | string;
    price?: number | string;
    securityDeposit?: number | string;
    rating?: number | string;
    reviews?: number | string;
    totalReviews?: number | string;
    capacity?: number | string;
    maxCapacity?: number | string;
    description?: string;
    overview?: string;
    amenities?: string[] | string;
    features?: string[] | string;
};

// ---------- Small piece: one studio card ----------
function StudioCard({ studio }: { studio: MyStudio; }) {
    
    const router = useRouter()
    const { data: session } = useSession()
    const userSession = session?.user
    console.log(userSession);
    const handleDelete = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-listing/${encodeURIComponent(userSession?.email ?? "")}`, { method: "DELETE" })
        const data = await res.json()
        console.log(data);

        if (res.ok) {
            toast.success("Deleted successfully!");
            router.refresh()

        } else {
            toast.error(data.message || "Failed to delete listings!");
        }
    }
    return (
        <article className="flex flex-col overflow-hidden rounded-2xl bg-card ring-1 ring-foreground/10 transition-all hover:-translate-y-0.5 hover:shadow-lg md:flex-row">
            {/* <StudioImage cover={studio.image} category={studio.category} title={studio.title} />
             */}
            <div className="relative h-44 w-full shrink-0 bg-muted md:h-auto md:w-60">

                <Image
                    src={studio.image ?? "https://placehold.co/600x400/e9e5f5/6b5b95?text=Studio+Image"}
                    alt="images"
                    fill
                    className="rounded-t-2xl object-cover md:rounded-l-2xl md:rounded-tr-none"
                />



            </div>

            {/* Right side: all information */}
            <div className="flex flex-1 flex-col gap-2 p-4 md:p-5">
                {/* Title + rating in one row */}
                <div className="flex items-start justify-between gap-3">
                    <h3 className="font-bold text-foreground">{studio.title}</h3>
                    <p className="flex shrink-0 items-center gap-1 text-sm">
                        <Star className="size-4 fill-[#F59E0B] text-[#F59E0B]" />
                        <span className="font-semibold text-foreground">{studio.rating || "–"}</span>
                        <span className="text-muted-foreground">({studio.reviews ?? 0} reviews)</span>
                    </p>
                </div>

                {/* Location + price row */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                    <p className="flex items-center gap-1 text-muted-foreground">
                        <MapPin className="size-4" />
                        {studio.location ?? "Location not set"}
                    </p>
                    <p className="font-bold text-foreground">
                        ${studio.hourlyRate}
                        <span className="ml-1 text-xs font-normal text-muted-foreground">/ hr</span>
                    </p>

                </div>

                {/* Short description */}
                <p className="line-clamp-2 flex-1 text-sm text-muted-foreground">
                    {studio.overview ?? "No description added yet."}
                </p>



                {/* Action row: View Details left, Edit + Delete right */}
                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-4">
                    <Link
                        href={`/Details/${studio._id}`}
                        className={cn(buttonVariants({ size: "sm" }), "rounded-full px-4")}
                    >
                        View Details
                    </Link>

                    <div className="flex items-center gap-2">
                        <Link
                             href={`/my-listings/${studio._id}`}
                            className={cn(buttonVariants({ variant: "outline", size: "sm" }), "rounded-full px-4")}
                        >
                            <Pencil />
                            Edit
                        </Link>
                        <Button
                            variant="destructive"
                            size="sm"
                            className="rounded-full cursor-pointer px-4"
                            onClick={handleDelete}
                        >
                            <Trash2 />
                            Delete
                        </Button>
                    </div>
                </div>
            </div>
        </article>
    );
}
export default StudioCard
// ---------- Main page component ----------

