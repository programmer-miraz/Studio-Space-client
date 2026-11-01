const CategorySkeleton = () => {
    return (
        <section className="mx-auto max-w-6xl px-4 py-12">
            {/* Section Heading */}
            <div className="mb-8 flex items-center justify-between">
                <div className="space-y-2">
                    <div className="h-3 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />

                    <div className="h-7 w-52 animate-pulse rounded-md bg-gray-200 dark:bg-gray-700" />
                </div>

                <div className="h-5 w-20 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
            </div>

            {/* Category Cards */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card px-4 py-8"
                    >
                        {/* Icon Skeleton */}
                        <div className="size-12 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-700" />

                        {/* Title Skeleton */}
                        <div className="h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CategorySkeleton;