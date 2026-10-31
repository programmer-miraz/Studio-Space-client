"use client";
import { useState } from "react";
import Image from "next/image";
import {
  Calendar,
  CheckCircle2,
  MapPin,
  Star,
} from "lucide-react";
import { StudioDetails } from "@/type";




const DetailsContent = ({ studio }: { studio: StudioDetails}) => {

  const [selected, setSelected] = useState(0);
   const images = studio.gallery??[];
     const selectedImage = images[selected];
     const amenities = studio.amenities ?? [];

  return (
    <section className="mx-auto max-w-6xl px-4 py-6">
      {/* ================= GALLERY ================= */}
        <div>
        {/* Main Image */}
        <div className="relative h-64 overflow-hidden rounded-2xl bg-muted md:h-[26rem]">
          {selectedImage ? (
            <Image
              src={selectedImage}
              alt={`${studio.title} — photo ${selected + 1}`}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              No image available
            </div>
          )}

          {/* Image Count */}
          {images.length > 0 && (
            <span className="absolute bottom-3 right-3 rounded-md bg-black/60 px-2 py-1 text-xs text-white">
              Photo {selected + 1} of {images.length}
            </span>
          )}
        </div>

        {/* Thumbnail Images */}
        <div className="mt-3 flex flex-wrap gap-3">
          {images.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setSelected(index)}
              className={`relative h-16 w-24 overflow-hidden rounded-xl transition-all ${
                selected === index
                  ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                  : "opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={image}
                alt={`${studio.title} thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="96px"
              />
            </button>
          ))}
        </div>

   
      </div>

      {/* ================= MAIN CONTENT: 3 columns grid ================= */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* ---- LEFT SIDE (2 columns) ---- */}
        <div className="space-y-6 lg:col-span-2">
          {/* Price / deposit / capacity / rating strip */}
          <div className="grid grid-cols-2 gap-4 rounded-2xl bg-card p-6 ring-1 ring-foreground/10 md:grid-cols-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Hourly Rate</p>
              <p className="font-bold text-primary">${studio.hourlyRate}/hr</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Security Deposit</p>
              <p className="font-bold text-foreground">${studio.securityDeposit}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Max Capacity</p>
              <p className="font-bold text-foreground">{studio.capacity} people</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Client Rating</p>
              <p className="flex items-center gap-1 font-bold text-foreground">
                <Star className="size-4 fill-[#F59E0B] text-[#F59E0B]" />
                {studio.rating}
                <span className="text-xs font-normal text-muted-foreground">
                  ({studio.reviews})
                </span>
              </p>
            </div>
          </div>

          {/* Overview card */}
          <div className="space-y-3 rounded-2xl bg-card p-6 ring-1 ring-foreground/10">
            <h2 className="text-lg font-semibold text-foreground">
              Workspace Overview
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {studio.description || "No description provided for this workspace."}
            </p>
            <p className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="size-4" />
              {studio.location}
            </p>
          </div>

          {/* Amenities card */}
          <div className="space-y-4 rounded-2xl bg-card p-6 ring-1 ring-foreground/10">
            <h2 className="text-lg font-semibold text-foreground">
              Equipment &amp; Amenities
            </h2>
            {amenities.length > 0 ? (
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {amenities.map((amenity, index) => (
                  <li
                    key={`${amenity}-${index}`}
                    className="flex items-center gap-2 text-sm text-foreground"
                  >
                    <CheckCircle2 className="size-4 shrink-0 text-green-600" />
                    {amenity}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">
                No amenity list provided for this workspace.
              </p>
            )}
          </div>
        </div>

        {/* ---- RIGHT SIDE: booking card ---- */}
        <div className="space-y-4 rounded-2xl bg-card p-6 ring-1 ring-foreground/10 lg:sticky lg:top-6 lg:self-start">
          {/* Price + rating */}
          <div className="flex items-start justify-between">
            <p className="text-3xl font-extrabold text-primary">
              ${studio.hourlyRate}
              <span className="ml-1 text-sm font-normal text-muted-foreground">
                / hour
              </span>
            </p>
            <p className="flex items-center gap-1 text-sm font-semibold text-foreground">
              <Star className="size-4 fill-[#F59E0B] text-[#F59E0B]" />
              {studio.rating}
            </p>
          </div>

          <hr className="border-border" />

          {/* Price info rows */}
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Security Deposit</span>
              <span className="font-semibold text-foreground">
                ${studio.securityDeposit}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Cancellation Policy</span>
              <span className="font-semibold text-green-600">
                Free before shoot confirmation
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Availability</span>
              <span className="font-semibold text-foreground">
                Instant Request Slots
              </span>
            </div>
          </div>

          {/* Booking button */}
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Calendar className="size-4" />
            Book Workspace Now
          </button>

          {/* Small helper note */}
          <p className="text-center text-xs text-muted-foreground">
            You won&apos;t be charged immediately. Your reservation will enter
            Pending status for host approval.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DetailsContent;
