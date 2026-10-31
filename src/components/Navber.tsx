"use client"
import { Aperture } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./Theme/ThemeToggle";
import Link from "next/link";
import { usePathname } from "next/navigation";



// Simple array so adding/removing a link is easy
const NAV_LINKS = [
    { name: "Home", url: "/", },
    { name: "Explore Studios", url: "/Explore_Studios" },
    { name: "How It Works", url: "#" },
    { name: "About Us", url: "#" },
];

const Navber = () => {
    const pathname = usePathname();

    return (
        <header className="border-b border-border bg-white dark:bg-card">
            <div className="mx-auto flex h-16 max-w-6xl  items-center justify-between px-4">
                {/* Logo */}
                < Link href="/" className="flex items-center gap-2">
                    <span className="flex size-9 items-center justify-center rounded-lg bg-primary">
                        <Aperture className="size-5 text-primary-foreground" />
                    </span>
                   
                        <span className="text-lg font-bold text-foreground">
                            Studio<span className="text-primary">Space</span>
                        </span>
                   
                </Link>

                {/* Center links (hidden on small screens for now) */}
                <nav className="hidden items-center gap-8 md:flex">
                    {NAV_LINKS.map((link) => {
                        const isActive = pathname === link.url;

                        return (
                            <Link
                                key={link.name}
                                href={link.url}
                                className={
                                    isActive
                                        ? "border-b-2 border-primary font-medium text-primary"
                                        : "text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                                }
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                </nav>


                {/* Right side actions */}
                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <Button variant="outline" className="rounded-full px-5">
                        Login
                    </Button>
                    <Button className="rounded-full px-5">Register</Button>
                </div>
            </div>
        </header>
    );
};

export default Navber;
