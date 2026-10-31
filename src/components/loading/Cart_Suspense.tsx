import React from 'react';

const Loading = () => {
    return (
        <div>
            <section className="mx-auto max-w-7xl px-4 py-8">
                {/* Header skeleton */}
                <div className="flex items-center justify-between">
                    <div className="h-6 w-48 animate-pulse rounded-md bg-muted" />
                    <div className="h-4 w-16 animate-pulse rounded-md bg-muted" />
                </div>

                {/* Card skeletons */}
                <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {Array.from({ length: 12 }).map((_, index) => (
                        <div
                            key={index}
                            className="overflow-hidden rounded-2xl bg-card ring-1 ring-foreground/10 shadow-sm"
                        >
                            <div className="relative h-40 animate-pulse bg-muted" />
                            <div className="space-y-2 p-4">
                                <div className="h-5 w-3/4 animate-pulse rounded-md bg-muted" />
                                <div className="h-4 w-1/2 animate-pulse rounded-md bg-muted" />
                                <div className="h-4 w-2/3 animate-pulse rounded-md bg-muted" />
                            </div>
                            <div className="border-t border-border">
                                <div className="flex items-center justify-between p-4">
                                    <div className="h-5 w-14 animate-pulse rounded-md bg-muted" />
                                    <div className="h-8 w-24 animate-pulse rounded-lg bg-muted" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
};

export default Loading;