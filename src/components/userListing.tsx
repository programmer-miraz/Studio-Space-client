import { Plus } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { cn } from "cn";
import StudioCard from "./myListing";
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

};

const UserListing = async ({ userEmail }: { userEmail: string }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/my-listing/${(userEmail)}`
  );

  const studios: MyStudio[] = await res.json()
  console.log(studios);
  return (
    <section className="mx-auto max-w-5xl px-4 py-10">
      {/* Page header + Add New Studio button */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">
            My Studio Listings
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage and update your creative studio spaces.
          </p>
        </div>
        <Link
          href="/Add-new-studio"
          className={cn(buttonVariants(), "rounded-full px-5")}
        >
          <Plus />
          Add New Studio
        </Link>
      </div>

      {/* Content */}
      <div className="mt-8 space-y-5">

        {/* 2. Loaded but empty → friendly empty state */}
        {studios.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border p-12 text-center">
            <h2 className="text-lg font-semibold text-foreground">No studios yet</h2>
            <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
              You haven&apos;t listed a studio yet. Create your first listing so
              creators can find and book your space.
            </p>
            <Link
              href="Add-new-studio"
              className={cn(buttonVariants(), "mt-6 rounded-full px-6")}
            >
              <Plus />
              Add Your First Studio
            </Link>
          </div>
        )}

        {/* 3. Loaded with data → show all cards */}
        {
          studios.map((studio) => (
            <StudioCard key={studio._id} studio={studio} />
          ))}
      </div>
    </section>
  );
};
export default UserListing