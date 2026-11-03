// Route-level loading UI: shows while any page (without its own
// loading.tsx) is being prepared. Same skeleton look as the other
// loading components in src/components/loading/.
const LoadingRoute = () => {
  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      {/* Page heading + action button skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-7 w-56 animate-pulse rounded-md bg-muted" />
          <div className="h-4 w-72 animate-pulse rounded-md bg-muted" />
        </div>
        <div className="h-9 w-36 animate-pulse rounded-full bg-muted" />
      </div>

      {/* Horizontal card skeletons (like booking / listing cards) */}
      <div className="mt-8 space-y-5">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col gap-4 rounded-2xl bg-card p-4 ring-1 ring-foreground/10 md:flex-row"
          >
            {/* Cover image */}
            <div className="h-40 w-full shrink-0 animate-pulse rounded-xl bg-muted md:h-36 md:w-56" />

            {/* Info lines */}
            <div className="flex-1 space-y-3 py-1">
              <div className="flex items-center justify-between">
                <div className="h-5 w-1/2 animate-pulse rounded-md bg-muted" />
                <div className="h-4 w-20 animate-pulse rounded-full bg-muted" />
              </div>
              <div className="h-4 w-1/3 animate-pulse rounded-md bg-muted" />
              <div className="h-4 w-full animate-pulse rounded-md bg-muted" />
              <div className="h-4 w-2/3 animate-pulse rounded-md bg-muted" />
              <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                <div className="h-8 w-28 animate-pulse rounded-full bg-muted" />
                <div className="h-8 w-36 animate-pulse rounded-full bg-muted" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LoadingRoute;
