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

// ---------- Simple option lists (easy to edit later) ----------
const WHO_OPTIONS = ["Studio Owner", "Photographer", "Videographer", "Content Creator"];

const CATEGORY_OPTIONS = [
  "Photography Studio",
  "Sound Stage",
  "Podcast Room",
  "Creative Workspace",
  "Content Creator Studio",
];

// One checkbox = one string. Adding an option is just adding a string.
const CAMERA_OPTIONS = [
  "DSLR Cameras",
  "Cinema Cameras",
  "Mirrorless Cameras",
  "GoPro / Action Cams",
  "Camcorders",
  "360° Cameras",
];

const GEAR_OPTIONS = [
  "Tripods & Stabilizers",
  "Softbox Lighting",
  "Ring Lights",
  "Green Screen",
  "Audio Recorders",
  "Professional Microphones",
];

const STUDIO_OPTIONS = [
  "Props & Backdrops",
  "Makeup & Changing Room",
  "Wi-Fi & Power Backup",
  "Air Conditioning",

];





// Reusable checkbox list block (used for every group below)
function OptionGroup({ title, options }: { title: string; options: string[] }) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold text-foreground">{title}</h3>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {options.map((option) => (
          <CheckboxOption key={option} name={option} />
        ))}
      </div>
    </div>
  );
}

// One checkbox row. "name" is the text, e.g. "DSLR Cameras"
function CheckboxOption({ name }: { name: string }) {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <label className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-transparent px-1 py-1 text-sm transition-colors hover:border-border hover:bg-muted/50 hover:font-medium">
      <Checkbox
        checked={isChecked}
        onCheckedChange={(checked: boolean) => setIsChecked(checked === true)}
        aria-label={name}
      />
      <input
        type="hidden"
        name="amenities"
        value={name}
      />
      <span className="text-muted-foreground">{name}</span>
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries()) as { workingSince: string, hourlyCost: string, image: string, amenities: string, overview: string }

    const studioData = {
      ...userData,
      ownerName: userSession?.name,
      ownerEmail: userSession?.email,
      ownerImage: userSession?.image,
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add_studio`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // authorization: `Berara ${token}`
      },
      body: JSON.stringify(studioData),
    })
    const jsonData = await res.json()
    if (jsonData.acknowledged === true) {
      toast.success("Studio added successfully!");
    }
    if (jsonData.acknowledged === false) {
      toast.error("Failed to add studio. Please try again.");


    }


  };

  return (
    <section className="mx-auto w-2xl border rounded-3xl my-5  border-gray-300 max-w-4xl px-5 py-11">
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
              Who I Am <span className="text-destructive">*</span>
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
              <input type="hidden" name="who" value={form.who} />
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
                <SelectValue>{"Select a category"}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {CATEGORY_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
              <input type="hidden" name="who" value={form.category} />
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
              name="hourlyCost"

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

        {/* ---------- Section 2: facility & gear checkboxes ---------- */}
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            The Facility &amp; Production Gear
          </h2>
          <p className="mt-1 mb-5 text-sm text-muted-foreground">
            Select everything that is available in your studio.
          </p>

          <div className="space-y-6 rounded-2xl border border-border p-5">
            <div className="grid gap-6 md:grid-cols-3">
              <OptionGroup title="Camera Options" options={CAMERA_OPTIONS} />
              <OptionGroup title="Gear Options" options={GEAR_OPTIONS} />
              <OptionGroup title="Studio Details" options={STUDIO_OPTIONS} />
            </div>

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
              <AvatarFallback>{userSession?.name.slice(0, 2).toUpperCase()}</AvatarFallback>
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
