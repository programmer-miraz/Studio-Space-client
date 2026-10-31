import React from 'react';

const Details_loading = () => {
    return (
        <section className="mx-auto max-w-7xl px-4 py-6">
            {/* Hero image skeleton */}
            <div className="h-64 animate-pulse rounded-2xl bg-muted md:h-[26rem]" />

            {/* Thumbnail skeletons */}
            <div className="mt-3 flex gap-3">
                {Array.from({ length: 2 }).map((_, index) => (
                    <div
                        key={index}
                        className="h-16 w-24 animate-pulse rounded-xl bg-muted"
                    />
                ))}
            </div>

            {/* Main content: left details + right booking card */}
            <div className="mt-6 grid gap-6 lg:grid-cols-3">
                {/* LEFT SIDE (2 columns) */}
                <div className="space-y-6 lg:col-span-2">
                    {/* Stats strip skeleton */}
                    <div className="grid grid-cols-2 gap-4 rounded-2xl bg-card p-6 ring-1 ring-foreground/10 md:grid-cols-4">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <div key={index} className="space-y-2">
                                <div className="h-3 w-3/4 animate-pulse rounded-md bg-muted" />
                                <div className="h-5 w-1/2 animate-pulse rounded-md bg-muted" />
                            </div>
                        ))}
                    </div>

                    {/* Overview card skeleton */}
                    <div className="space-y-3 rounded-2xl bg-card p-6 ring-1 ring-foreground/10">
                        <div className="h-5 w-1/3 animate-pulse rounded-md bg-muted" />
                        <div className="h-4 w-full animate-pulse rounded-md bg-muted" />
                        <div className="h-4 w-5/6 animate-pulse rounded-md bg-muted" />
                    </div>

                    {/* Amenities card skeleton */}
                    <div className="space-y-4 rounded-2xl bg-card p-6 ring-1 ring-foreground/10">
                        <div className="h-5 w-1/3 animate-pulse rounded-md bg-muted" />
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="h-4 animate-pulse rounded-md bg-muted"
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE: booking card skeleton */}
                <div className="space-y-4 rounded-2xl bg-card p-6 ring-1 ring-foreground/10 lg:sticky lg:top-6 lg:self-start">
                    <div className="flex items-start justify-between">
                        <div className="h-8 w-28 animate-pulse rounded-md bg-muted" />
                        <div className="h-5 w-12 animate-pulse rounded-md bg-muted" />
                    </div>
                    <div className="h-px bg-border" />
                    <div className="space-y-3">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <div key={index} className="flex items-center justify-between">
                                <div className="h-4 w-1/3 animate-pulse rounded-md bg-muted" />
                                <div className="h-4 w-1/4 animate-pulse rounded-md bg-muted" />
                            </div>
                        ))}
                    </div>
                    {/* Book button skeleton */}
                    <div className="h-12 w-full animate-pulse rounded-2xl bg-muted" />
                    <div className="mx-auto h-3 w-3/4 animate-pulse rounded-md bg-muted" />
                </div>
            </div>
        </section>
    );
};

export default Details_loading;