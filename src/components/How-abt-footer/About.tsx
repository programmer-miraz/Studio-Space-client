import Image from "next/image";
import { Eye, Rocket, Target, Users } from "lucide-react";

// A real verified studio image (swap the URL any time you like)
const ABOUT_IMAGE = "https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&w=1200&q=80"


// Small highlight cards (Mission / Vision / Community / Purpose)
const HIGHLIGHTS = [
    {
        icon: Target,
        title: "Our Mission",
        description: "Make creative spaces accessible to everyone.",
    },
    {
        icon: Eye,
        title: "Our Vision",
        description:
            "Build a connected community where creators and studio owners can grow together.",
    },
    {
        icon: Users,
        title: "Our Community",
        description:
            "Connect photographers, filmmakers, content creators, and studio hosts.",
    },
    {
        icon: Rocket,
        title: "Our Purpose",
        description:
            "Make studio discovery and booking easier, faster, and more convenient.",
    },
];

const About = () => {
    return (
        <section id="about" className="mx-auto max-w-6xl px-4 py-10">
            {/* Whole section sits inside one gradient card, like the hero banner */}
            <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-[#F1ECFE] via-[#F6F3FF] to-white dark:from-[#171D29] dark:via-[#121722] dark:to-[#0B0D12] dark:border dark:border-border dark:shadow-2xl dark:shadow-black/40">
                <div className="grid items-center gap-8 md:grid-cols-2">
                    {/* Left: about content */}
                    <div className="space-y-6 p-8 md:p-12">
                        <p className="text-sm font-medium text-muted-foreground">
                            Our Story
                        </p>

                        <h2 className="text-2xl font-extrabold tracking-tight text-foreground md:text-3xl">
                            About <span className="text-primary">Studio</span>Space
                        </h2>

                        <div className="space-y-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                            <p>
                                StudioSpace is a peer-to-peer creative workspace and production
                                studio sharing platform.
                            </p>
                            <p>
                                The platform connects content creators, photographers,
                                videographers, filmmakers, and creative professionals with
                                studio owners who want to share their creative spaces.
                            </p>
                        </div>

                        {/* Four small highlight cards (Mission / Vision / Community / Purpose) */}
                        <div className="grid gap-3 sm:grid-cols-2">
                            {HIGHLIGHTS.map((highlight) => {
                                const Icon = highlight.icon;
                                return (
                                    <div
                                        key={highlight.title}
                                        className="rounded-xl bg-white/80 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:bg-card"
                                    >
                                        <div className="flex items-center gap-2">
                                            <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
                                                <Icon className="size-4 text-primary" />
                                            </span>
                                            <h3 className="text-sm font-semibold text-foreground">
                                                {highlight.title}
                                            </h3>
                                        </div>
                                        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                                            {highlight.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right: studio image + small floating card */}
                    <div className="relative h-64 md:h-[30rem]">
                        <Image
                            src={ABOUT_IMAGE}
                            alt="A creative studio workspace with a video editor at work"
                            fill
                            className="rounded-3xl object-cover md:rounded-l-3xl md:rounded-r-none"
                        />

                        {/* Small floating note card on top of the image */}
                        <div className="absolute bottom-6 left-6 flex items-center gap-3 rounded-xl bg-white/90 p-3 shadow-lg backdrop-blur-sm dark:bg-card/90">
                            <span className="flex size-9 items-center justify-center rounded-full bg-primary/10">
                                <Users className="size-4 text-primary" />
                            </span>
                            <p className="text-xs font-semibold text-foreground">
                                A community of creators
                                <span className="block font-normal text-muted-foreground">
                                    &amp; studio hosts, together
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
