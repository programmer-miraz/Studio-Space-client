import { Headphones, ShieldCheck, UserCheck, Wrench } from "lucide-react";

// One item per guarantee. Adding one = adding a single object here.
const GUARANTEES = [
  {
    icon: ShieldCheck,
    title: "Liability Protection",
    description:
      "Every booking is protected by clear platform policies and booking assurance, so both sides stay safe.",
  },
  {
    icon: UserCheck,
    title: "Verified Profiles",
    description:
      "Hosts and creators are verified before they list or book, building real trust in every session.",
  },
  {
    icon: Wrench,
    title: "Equipment Safety",
    description:
      "Studios follow responsible equipment handling guidelines so your gear and our gear stay protected.",
  },
  {
    icon: Headphones,
    title: "24/7 Host Support",
    description:
      "Round-the-clock support is always ready to help hosts and creators, before and after the shoot.",
  },
];

const Host_Guarantee = () => {
  return (
    <section
      id="host-guarantee"
      className="mx-auto max-w-6xl px-4 py-10"
    >
      {/* Section heading */}
      <h2 className="text-xl font-bold text-foreground md:text-2xl">
        Host Guarantee &amp; Creator Support
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Book with confidence — protection, verification and support built into
        every studio.
      </p>

      {/* Guarantee cards (tinted like the category cards) */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {GUARANTEES.map((guarantee) => {
          const Icon = guarantee.icon;
          return (
            <div
              key={guarantee.title}
              className="rounded-2xl bg-[#F4F1FB] px-6 py-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border dark:border-border dark:bg-card"
            >
              {/* Icon bubble */}
              <span className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-white shadow-sm transition-transform duration-300 hover:scale-110 dark:bg-secondary">
                <Icon className="size-6 text-primary" />
              </span>

              <h3 className="text-sm font-semibold text-foreground">
                {guarantee.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {guarantee.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Host_Guarantee;
