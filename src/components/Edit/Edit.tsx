"use client";
import { Suspense, useState } from "react";
import { ArrowLeft, Info, Plus, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/auth";
import type { User } from "better-auth";
type MyStudio = {
    _id: string;
    title?: string;
    category?: string;
    image?: string;
    hourlyRate?: number | string;
    reviews?: number | string;
    capacity?: number | string;
    overview?: string;
    amenities?: string[] | string;
    workingSince: string
    location: string

};

// ---------- Simple option lists (easy to edit later) ----------
const WHO_OPTIONS = ["Studio Owner", "Photographer", "Videographer", "Content Creator"];

const CATEGORY_OPTIONS = [
    "Photography Studio",
    "Sound Stage",
    "Podcast Room",
    "Creative Workspace",
    "Content Creator Studio",
];

// One amenity = one string. Adding an option is just adding a string.
// (These match the "Included Amenities & Production Gear" design)
const AMENITY_OPTIONS = [
    "Cyclorama Wall",
    "Soundproof Vocal Booth",
    "Neve / SSL Preamps",
    "Drive-In Loading Bay",
    "Client Lounge with Espresso Bar",
    "Green Screen / Blue Screen Drops",
    "Electric Ceramic Kiln & Wheels",
    "4K DMX Lighting Grid",
    "Acoustic Treatment Slat Walls",
    "Shure SM7B Dynamic Mic Setup",
    "Hair & Makeup Vanity Station",
    "High-Speed Gigabit WiFi",
    "Heavy Rigging Trusses (2-Ton)",
    "Industrial Screen Printing Press",
];





// One checkbox row. "name" is the text, e.g. "Cyclorama Wall"
function CheckboxOption({
    name,
    isChecked,
    onChange,
}: {
    name: string;
    isChecked: boolean;
    onChange: () => void;
}) {
    return (
        <label className="flex cursor-pointer items-center gap-3 rounded-lg px-1 py-1.5 text-sm transition-colors hover:bg-muted/40">
            {/* Amber check style like the design (instead of purple) */}
            <Checkbox
                checked={isChecked}
                onCheckedChange={onChange}
                aria-label={name}
                className="data-checked:border-amber-400 data-checked:bg-transparent data-checked:text-amber-500"
            />
            <span className="text-foreground">{name}</span>
        </label>
    );
}

const Edit_page = ({ studio, userSession }: { studio: MyStudio, userSession: User }) => {
    const router = useRouter()
    const [form, setForm] = useState({
        who: studio.title || "",
        category: studio.category || "",
        overview: "",
    });

    // Selected amenities live here as a simple array of strings
    const [selectedAmenities, setSelectedAmenities] = useState<string[]>(Array.isArray(studio.amenities)
        ? studio.amenities
        : studio.amenities
            ? [studio.amenities]
            : []);

    // Add the amenity if missing, remove it if already present
    const toggleAmenity = (name: string) => {
        setSelectedAmenities((prev) =>
            prev.includes(name)
                ? prev.filter((item) => item !== name)
                : [...prev, name]
        );
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const userData = Object.fromEntries(formData.entries()) as { workingSince: string, hourlyCost: string, image: string, amenities: string, overview: string }

        const { amenities, ...restUserData } = userData;

        const studioData = {
            ...restUserData,
            amenities: JSON.parse(amenities) as string[],

        };
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-listing-update/${studio._id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify(studioData),
        })

        const jsonData = await res.json()
        if (jsonData.acknowledged === true) {
            toast.success("Update successfully!");
            router.push("/my-listings")
        }
        if (jsonData.acknowledged === false) {
            toast.error("Failed to add studio. Please try again.");


        }
    };

    return (
        <section className="mx-auto w-2xl border rounded-3xl my-5  border-gray-300 max-w-4xl px-5 py-11">

            <Link
                href="/my-listings"
                className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
                <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                Back to My Listings
            </Link>

            <h1 className="text-2xl font-bold text-foreground md:text-3xl">
                Edit Studio WorkSpace
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
                Update your studio information.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                {/* ---------- Section 1: basic details (2 fields per row) ---------- */}
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="who">
                            Who I Am <span className="text-destructive">*</span>
                        </Label>
                        <Select
                            value={form.who}
                            onValueChange={(value) =>
                                setForm((prev) => ({ ...prev, who: value ?? "" }))
                            }>
                            <SelectTrigger id="who" className="w-full">
                                <SelectValue>{form.who}</SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                {WHO_OPTIONS.map((option) => (
                                    <SelectItem key={option} value={option}>
                                        {option}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                            <input type="hidden" name="title" defaultValue={form.who} />
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="category">
                            Category <span className="text-destructive">*</span>
                        </Label>
                        <Select
                            value={form.category}
                            onValueChange={(value) =>
                                setForm((prev) => ({ ...prev, category: value ?? "" }))
                            }
                        >
                            <SelectTrigger id="category" className="w-full">
                                <SelectValue>{form.category || "Select a category"}</SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                {CATEGORY_OPTIONS.map((option) => (
                                    <SelectItem key={option} value={option}>
                                        {option}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                            <input type="hidden" name="category" value={form.category} />
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="working-since">Working Since</Label>
                        <Input
                            id="working-since"
                            placeholder="e.g. 01/2024"
                            type="text"
                            name="workingSince"
                            defaultValue={studio.workingSince}


                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="hourly-cost">Estimated Hourly Cost (Max: 2,000$)</Label>
                        <Input
                            id="hourly-cost"
                            type="number"
                            placeholder="e.g. 50"
                            name="hourlyRate"
                            defaultValue={studio.hourlyRate}

                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="hourly-cost">Address</Label>
                        <Input
                            id="address"
                            type="address"
                            placeholder="address"
                            name="location"
                            defaultValue={studio.location}

                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="studio-image">Studio Image* (JPEG/PNG)</Label>
                        <Input
                            id="studio-image"
                            name="image"
                            type="url"
                            placeholder="https://example.com/studio-image.jpg"
                            required
                            className="cursor-text"
                            defaultValue={studio.image}
                        />
                    </div>


                </div>

                {/* ---------- Section 2: included amenities (like the design) ---------- */}
                <div>
                    <h2 className="mb-3 text-sm font-semibold text-foreground">
                        Included Amenities &amp; Production Gear
                    </h2>

                    <div className="rounded-xl border border-border p-5">
                        <div className="grid grid-cols-1 gap-x-10 gap-y-1 sm:grid-cols-2">
                            {AMENITY_OPTIONS.map((name) => (
                                <CheckboxOption
                                    key={name}
                                    name={name}
                                    isChecked={selectedAmenities.includes(name)}
                                    onChange={() => toggleAmenity(name)}
                                />
                            ))}
                        </div>

                        {/* One hidden input carries the selected amenities to FormData */}
                        <input
                            type="hidden"
                            name="amenities"
                            value={JSON.stringify(selectedAmenities)}

                        />
                    </div>
                </div>

                {/* ---------- Section 3: overview text ---------- */}
                <div className="space-y-1">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="overview">Studio Overview</Label>
                        <span className="text-xs text-muted-foreground">
                            {form.overview.length}/500 characters
                        </span>
                    </div>
                    <Textarea
                        id="overview"

                        onChange={(e) =>
                            setForm({ ...form, overview: e.target.value })
                        }
                        maxLength={500}
                        rows={4}
                        className="resize-none"
                        placeholder="Describe your space, the vibe and what makes it special..."
                        name="overview"
                        defaultValue={studio.overview}
                    />
                </div>

                {/* ---------- Section 4: host information (below the overview) ---------- */}
                <div>
                    <h2 className="mb-3 text-sm font-semibold text-foreground">
                        Host Information
                    </h2>
                    <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4">
                        <Avatar size="lg">
                            <AvatarImage src={userSession?.image ?? undefined} alt={userSession?.name} />
                            <AvatarFallback>{userSession?.name?.slice(0, 2).toUpperCase() ?? "ST"}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <p className="font-semibold text-foreground">{userSession?.name}</p>
                            <p className="text-xs text-muted-foreground">{userSession?.email}</p>
                        </div>
                        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                            Host
                        </span>
                    </div>
                </div>

                {/* ---------- Friendly tip box from the design ---------- */}
                <div className="flex gap-3 rounded-xl bg-emerald-50 p-4 dark:bg-emerald-500/10">
                    <Info className="size-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                    <p className="text-sm text-emerald-800 dark:text-emerald-300">
                        You&apos;re almost done! Double-check your pricing and facility
                        details — your own entries will always replace the defaults.
                    </p>
                </div>

                {/* ---------- Submit ---------- */}
                <Button type="submit" size="lg" className="w-full cursor-pointer rounded-full">
                    <Save />
                    Save change
                </Button>
            </form>
        </section >
    );
};


export default Edit_page;
