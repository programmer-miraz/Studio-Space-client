import { CalendarCheck, CalendarClock, Search, Video } from "lucide-react";

// One item per step. Adding a step = adding one object here.
const STEPS = [
  {
    icon: Search,
    title: "Discover Spaces",
    description:
      "Explore different creative studios and find the perfect space for your project.",
  },
  {
    icon: CalendarClock,
    title: "Select Shoot Hours",
    description:
      "Choose your preferred booking date and available shooting hours.",
  },
  {
    icon: CalendarCheck,
    title: "Book Instantly",
    description:
      "Complete your booking through a simple and convenient booking process.",
  },
  {
    icon: Video,
    title: "Create & Produce",
    description:
      "Visit your booked studio and bring your creative ideas to life.",
  },
];

const How_Booking = () => {
  return (
    <section
      id="how-it-works"
      className="mx-auto max-w-6xl px-4 py-10"
    >
      {/* Section heading */}
      <h2 className="text-xl font-bold text-foreground md:text-2xl">
        How Booking Works
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        From first look to final shot — four simple steps to your perfect
        studio.
      </p>

      {/* Step cards (4 columns on desktop, stacked with connectors) */}
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step, index) => {
          const Icon = step.icon;
          const isLastStep = index === STEPS.length - 1;

          return (
            <div
              key={step.title}
              className="group relative rounded-2xl bg-card p-6 ring-1 ring-foreground/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Dashed connector to the next card (desktop only) */}
              {!isLastStep && (
                <span
                  aria-hidden
                  className="absolute top-1/2 left-full hidden w-6 border-t-2 border-dashed border-primary/30 lg:block"
                />
              )}

              {/* Big ghost step number */}
              <span
                aria-hidden
                className="absolute right-4 top-4 text-3xl font-extrabold text-foreground/5"
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Icon bubble */}
              <span className="mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/10 transition-transform duration-300 group-hover:scale-110">
                <Icon className="size-6 text-primary" />
              </span>

              <h3 className="text-base font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default How_Booking;
