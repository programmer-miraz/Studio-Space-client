"use client"
import { useState } from "react";
import { Aperture, CalendarCheck, ChevronDown, Heart, LayoutDashboard, LogOutIcon, Menu, PlusCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./Theme/ThemeToggle";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient, useSession } from "@/lib/auth-client";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


// Simple array so adding/removing a link is easy
const NAV_LINKS = [
    { name: "Home", url: "/", },
    { name: "Explore Studios", url: "/Explore_Studios" },
    { name: "How It Works", url: "/#how-it-works" },
    { name: "About Us", url: "/#about" },
];

const Navber = () => {
    const router = useRouter()
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { data: session, isPending } = useSession();
    const userSession = session?.user;
    const handleSignOUt = async () => {
        const { data } = await authClient.signOut()
        if (data?.success) {
            localStorage.clear();
            router.push("/sign-in")
            router.refresh()
        }

    }


    return (
        <header className="border-b border-border bg-white dark:bg-card">
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
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

                    {isPending ? (<div className="h-9 w-28 animate-pulse rounded-2xl bg-gray-100 dark:bg-gray-800" />) : userSession ? (<>

                        <DropdownMenu>
                            <DropdownMenuTrigger
                                render={
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        className="h-10 gap-2 rounded-full border border-border/60 bg-transparent px-3 shadow-none cursor-pointer hover:bg-primary/5 active:bg-transparent"
                                    >
                                        <Avatar className="size-8 border border-primary/20">
                                            <AvatarImage
                                                referrerPolicy="no-referrer"
                                                src={userSession?.image || "https://github.com/shadcn.png"}
                                                alt={userSession?.name || "User"}
                                            />

                                            <AvatarFallback className="bg-primary/10 font-semibold text-primary">
                                                {userSession?.name?.charAt(0).toUpperCase() || "U"}
                                            </AvatarFallback>
                                        </Avatar>

                                        <span className="max-w-24 truncate bg-transparent text-sm font-medium text-foreground">
                                            {userSession?.name?.slice(0, 9) || "User"}
                                        </span>

                                        <ChevronDown className="size-4 text-muted-foreground" />
                                    </Button>
                                }
                            />
                            <DropdownMenuContent className="w-41 ">
                                <DropdownMenuGroup>

                                    <DropdownMenuItem className="flex cursor-pointer items-center gap-2.5">
                                        <PlusCircle className="h-4 w-4" />
                                        <Link href="/Add-new-studio">
                                            <span>Add New Studio</span>
                                        </Link>
                                    </DropdownMenuItem>

                                    <DropdownMenuItem className="flex cursor-pointer items-center gap-2.5">
                                        <LayoutDashboard className="h-4 w-4" />
                                        <Link href="/my-listings">
                                            <span>My Studio Listings</span>
                                        </Link>
                                    </DropdownMenuItem>

                                    <DropdownMenuItem className="flex cursor-pointer items-center gap-2.5">
                                        <CalendarCheck className="h-4 w-4" />
                                        <Link href="/Booking-add">
                                            <span>My Bookings</span>
                                        </Link>
                                    </DropdownMenuItem>

                                    <DropdownMenuItem className="flex cursor-pointer items-center gap-2.5">
                                        <Heart className="h-4 w-4" />
                                        <span>Saved Wishlist</span>
                                    </DropdownMenuItem>

                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem variant="destructive" onClick={handleSignOUt}><LogOutIcon />Log out</DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>


                    </>) : (<div className="hidden items-center gap-2 sm:flex">
                        <Link href="/sign-in">
                            <Button variant="outline" className="rounded-full cursor-pointer px-4 text-sm sm:px-5">
                                Sign In
                            </Button>
                        </Link>
                        <Link href="/sign-up">
                            <Button className="rounded-full cursor-pointer px-4 text-sm sm:px-5">Sign Up</Button>
                        </Link>
                    </div>)}

                    {/* Mobile hamburger (opens the stacked nav panel below) */}
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                        aria-expanded={isMobileMenuOpen}
                        onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                        className="cursor-pointer text-foreground md:hidden"
                    >
                        {isMobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
                    </Button>
                </div>
            </div>

            {/* Mobile navigation panel (md and below only) */}
            {isMobileMenuOpen && (
                <nav className="border-t border-border bg-white px-4 py-3 md:hidden dark:bg-card">
                    <ul className="space-y-1">
                        {NAV_LINKS.map((link) => {
                            const isActive = pathname === link.url;

                            return (
                                <li key={link.name}>
                                    <Link
                                        href={link.url}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={
                                            isActive
                                                ? "block rounded-lg border-b-2 border-primary px-3 py-2 font-medium text-primary"
                                                : "block rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
                                        }
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    {/* Mobile-only sign in / sign up shortcuts */}
                    {!userSession && (
                        <div className="mt-3 flex items-center gap-2 border-t border-border pt-3 sm:hidden">
                            <Link href="/sign-in" className="flex-1" onClick={() => setIsMobileMenuOpen(false)}>
                                <Button variant="outline" className="w-full cursor-pointer rounded-full">
                                    Sign In
                                </Button>
                            </Link>
                            <Link href="/sign-up" className="flex-1" onClick={() => setIsMobileMenuOpen(false)}>
                                <Button className="w-full cursor-pointer rounded-full">Sign Up</Button>
                            </Link>
                        </div>
                    )}
                </nav>
            )}
        </header>
    );
};

export default Navber;
