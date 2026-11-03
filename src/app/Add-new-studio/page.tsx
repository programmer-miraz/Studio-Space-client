"use client";

import { useState } from "react";
import { Info, Plus } from "lucide-react";
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
import { useSession } from "@/lib/auth-client";
import { toast } from "react-toastify";
import client_getToken from "@/lib/Token/client_get_token";


const WHO_OPTIONS = ["Studio Owner", "Photographer", "Videographer", "Content Creator"];

const CATEGORY_OPTIONS = [
  "Photography Studio",
  "Sound Stage",
  "Podcast Room",
  "Creative Workspace",
  "Content Creator Studio",
];


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

const Add_studio_page = () => {
  const { data: session } = useSession()
  const userSession = session?.user

  const [form, setForm] = useState({
    who: "",
    category: "",
    portfolioUrl: "",
    overview: "",
  });


  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

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
      name: userSession?.name,
      email: userSession?.email,
    };


    const token = await client_getToken()
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-studio`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Berara ${token}`
      },
      body: JSON.stringify(studioData),
    })

    if (!res.ok) {
      toast.error("Failed to add studio. Please try again.");

    }
    const jsonData = await res.json()
    if (jsonData.acknowledged === true) {
      toast.success("Studio added successfully!");
    }
    if (jsonData.acknowledged === false) {
      toast.error("Failed to add studio. Please try again.");

    }

  };

  return (
    <section className="mx-auto w-full max-w-2xl rounded-3xl my-5 border border-gray-300 px-5 py-11">
      {/* Page header */}
      <h1 className="text-2xl font-bold text-foreground md:text-3xl">
        Add New Studio
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Fill in your studio details to list it on StudioSpace.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        {/* ---------- Section 1: basic details (2 fields per row) ---------- */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="who">
              Studio Title <span className="text-destructive">*</span>
            </Label>
            <Select
              value={form.who}
              onValueChange={(value) =>
                setForm((prev) => ({ ...prev, who: value ?? "" }))
              }>
              <SelectTrigger id="who" className="w-full">
                <SelectValue>{form.who || "Select a role"}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {WHO_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
              <input type="hidden" name="title" value={form.who} />
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

            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="hourly-cost">Estimated Hourly Cost (Max: 2,000$)</Label>
            <Input
              id="hourly-cost"
              type="number"
              placeholder="e.g. 50"
              name="hourlyRate"

            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="security-deposit">
              Security Deposit ($)
            </Label>
            <Input
              id="security-deposit"
              type="number"
              name="securityDeposit"
              placeholder="e.g. 100"
              min="0"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="max-capacity">
              Max Capacity
            </Label>
            <Input
              id="max-capacity"
              type="number"
              name="maxCapacity"
              placeholder="e.g. 20 people"
              min="1"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="hourly-cost">Address</Label>
            <Input
              id="address"
              type="address"
              placeholder="address"
              name="location"

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
            value={form.overview}
            onChange={(e) =>
              setForm({ ...form, overview: e.target.value })
            }
            maxLength={500}
            rows={4}
            className="resize-none"
            placeholder="Describe your space, the vibe and what makes it special..."
            name="overview"
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
          <Plus />
          Add Studio
        </Button>
      </form>
    </section >
  );
};

export default Add_studio_page;
