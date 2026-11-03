"use client";
import { toast } from "react-toastify";
import {
    Calendar,
    Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { StudioDetails } from "@/type";
import { useRouter } from "next/navigation";
import client_getToken from "@/lib/Token/client_get_token";

const Booking_Now = ({ studio }: { studio: StudioDetails }) => {
    const { data: session } = authClient.useSession();
    const user = session?.user;
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const bookingInfo = Object.fromEntries(formData.entries());

        const { overview, amenities, gallery, _id, title, ...userStudio } = studio;
        try {
            const bookingData = {
                name: user?.name,
                email: user?.email,
                studioId: _id,
                ...userStudio,
                ...bookingInfo,

            };
            const token = await client_getToken()

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                   authorization: `Berara ${token}`

                },
                body: JSON.stringify(bookingData),
            });
            const data = await res.json()

            if (res.ok) {
                toast.success("Booking request submitted!");
                router.push("/Booking-add")
            }
            else {
                toast.error(data.message || "Booking failed!");
            }
            
        } catch {
            
            router.push("/sign-in")
        }
    };

    return (
        <Dialog>
            <DialogTrigger render={
                <button
                    type="button"
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-primary py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                    <Calendar className="size-4" />
                    Book Workspace Now
                </button>}
            />
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Book This Workspace</DialogTitle>
                    <DialogDescription>
                        Fill in your booking details. Your request will be set
                        to Pending until the host approves it.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit}>
                    <FieldGroup>
                        {/* 1. Studio Name — read-only */}
                        <Field>
                            <Label htmlFor="studioName">Studio Name</Label>
                            <Input
                                id="studioName"
                                name="title"
                                className="bg-muted"
                                defaultValue={studio.title}
                            />
                        </Field>

                        {/* 2. Booking Date */}
                        <Field>
                            <Label htmlFor="bookingDate">Booking Date</Label>
                            <Input

                                id="bookingDate"
                                name="bookingDate"
                                placeholder="mm/dd/yy"
                                required
                            />
                        </Field>
                        <Field>
                            <Label htmlFor="startTime">Start Time</Label>
                            <Input
                                id="startTime"
                                name="startTime"
                                type="time"
                                required
                            />
                        </Field>

                        {/* 4. End Time */}
                        <Field>
                            <Label htmlFor="endTime">End Time</Label>
                            <Input
                                id="endTime"
                                name="endTime"
                                type="time"
                                required
                            />
                        </Field>

                        {/* 5. Number of Guests */}
                        <Field>
                            <Label htmlFor="guests">Number of Guests</Label>
                            <Input
                                id="guests"
                                type="number"
                                name="guests"
                                min={1}
                                max={studio.maxCapacity}
                                placeholder="guests id"
                                required
                            />
                        </Field>
                    </FieldGroup>

                    {/* Summary card: Total Hours, Hourly Rate, Total Amount */}
                    <div className="mt-5 mb-2 space-y-2 rounded-2xl bg-primary/5 p-4 ring-1 ring-primary/20">

                        <div className="flex items-center  justify-between text-sm">
                            <span className="flex items-center gap-2 text-muted-foreground">
                                <Wallet className="size-4" /> Hourly Rate
                            </span>
                            <span className="font-semibold text-foreground">
                                ${studio.hourlyRate}/hr
                            </span>
                        </div>

                    </div>
                    <DialogFooter>
                        <DialogClose
                            type="button"
                            className="cursor-pointer border border-input bg-background px-4 py-2 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                        >
                            Cancel
                        </DialogClose>

                        <Button type="submit" className="cursor-pointer ">
                            Confirm Booking
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default Booking_Now;
