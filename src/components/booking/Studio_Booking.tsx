'use client';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "cn";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
    CalendarIcon,
    HashIcon,
    X,
} from "lucide-react";

import { useRouter } from "next/navigation";

import { toast } from "react-toastify";
import { useState } from "react";

export type BookingType = {
    _id: string;
    category: string;
    status: string;
    rating: number;
    reviews: number;
    location: string;
    bookingDate: string
    title: string
    hourlyRate: string
    totalReviews: string;
    securityDeposit: string;
    image: string;
};




function BookingCard({ booking }: { booking: BookingType }) {
    const router = useRouter();
    const [cenceling, setCenceling] = useState(false);

    const handleCancel = async (id: string) => {
        setCenceling(true)
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/bookings/cancel/${id}`,
            {
                method: "PATCH",
            }
        );

        const data = await res.json();
        console.log(data);

        if (data) {
            toast.success("Booking cancelled successfully");
            router.refresh()
        }
    };


    return (
        <Card className="group gap-0 overflow-hidden py-0 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
            <CardContent className="flex flex-col items-stretch gap-4 p-4 md:flex-row md:gap-5">
                {/* Left: cover image (fixed size, responsive crop) */}
                <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-xl bg-muted md:h-36 md:w-56">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={booking.image}
                        alt={`Cover image for ${booking.title}`}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div>

                {/* Middle: all booking info */}
                <div className="flex min-w-0 flex-1 flex-col items-start gap-2">

                    {/* Status badge (readable in both themes) */}
                    <Badge
                        className={cn(
                            "h-auto rounded-full border px-3 py-1 text-xs font-semibold",
                            booking.status === "Pending" &&
                            "border-amber-200 bg-amber-100 text-amber-700 hover:bg-amber-100 dark:border-amber-500/30 dark:bg-amber-500/15 dark:text-amber-300 dark:hover:bg-amber-500/15",
                            booking.status === "Confirmed" &&
                            "border-green-200 bg-green-100 text-green-700 hover:bg-green-100 dark:border-green-500/30 dark:bg-green-500/15 dark:text-green-300 dark:hover:bg-green-500/15",
                            booking.status === "Completed" &&
                            "border-blue-200 bg-blue-100 text-blue-700 hover:bg-blue-100 dark:border-blue-500/30 dark:bg-blue-500/15 dark:text-blue-300 dark:hover:bg-blue-500/15",
                            booking.status === "Cancelled" &&
                            "border-red-200 bg-red-100 text-red-700 hover:bg-red-100 dark:border-red-500/30 dark:bg-red-500/15 dark:text-red-300 dark:hover:bg-red-500/15"
                        )}>
                        {booking.status}
                    </Badge>

                    <h3 className="font-heading text-xl leading-snug font-semibold tracking-tight text-foreground">
                        {booking.title}
                    </h3>
                    <h3 className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <CalendarIcon className="size-3.5 text-primary" />
                        {booking.bookingDate}
                    </h3>
                    <h3 className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <HashIcon className="size-3.5 text-primary" />
                        Booking ID: {booking._id.slice(0, 5)}
                    </h3>

                    {/* Hourly rate */}
                    <p className="mt-1 text-xl font-bold text-foreground">
                        ${booking.hourlyRate}
                        <span className="ml-1 text-xs font-normal text-muted-foreground">
                            / hr
                        </span>
                    </p>
                </div>

                {/* Right: action button */}
                <div className="flex items-end justify-start md:items-center md:justify-end">
                    {booking.status === "Pending" && <AlertDialog>
                        <AlertDialogTrigger
                            render={<Button
                                variant="outline"
                                size="sm"

                                className="cursor-pointer rounded-full border-destructive/40 px-4 text-destructive hover:border-destructive hover:bg-destructive/10 hover:text-destructive"
                            >
                                <X data-icon="inline-start" />
                                cencel
                            </Button>}
                        />
                        <AlertDialogContent className="rounded-2xl p-6">
                            <AlertDialogHeader>
                                <AlertDialogMedia className="bg-destructive/10 text-destructive">
                                    <X />
                                </AlertDialogMedia>
                                <AlertDialogTitle className="font-semibold text-foreground">
                                    Cancel Booking?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    Are you sure you want to cancel this booking?
                                    This action cannot be undone. Your booking status will be changed to Cancelled.

                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel className="cursor-pointer rounded-full font-medium">Keep booking</AlertDialogCancel>
                                <AlertDialogAction
                                    className="cursor-pointer rounded-full bg-destructive text-white hover:bg-destructive/90"
                                    onClick={() => handleCancel(booking._id)}
                                >
                                    {cenceling ? "cencelig...." : "Yes cencel"}
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>}

                </div>
            </CardContent>
        </Card>
    );
}

export default BookingCard;
