"use client"
import { Aperture, CalendarCheck, ChevronDown, Heart, LayoutDashboard, LogOutIcon, PlusCircle } from "lucide-react";
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
    { name: "How It Works", url: "#" },
    { name: "About Us", url: "#" },
];

const Navber = () => {
    const router = useRouter()
    const pathname = usePathname();
    const { data: session, isPending } = useSession();
    const userSession = session?.user;
    const handleSignOUt = () => {
        authClient.signOut()
        router.push("/sign-in")
    }


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
                    {userSession ? (<div className=" absolute right-55 ">
                        <ThemeToggle />
                    </div>) : (<> <ThemeToggle /></>)}

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
                                        <Link href="/Listing-studio">
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


                    </>) : (<div>
                        <Link href="/sign-in">
                            <Button variant="outline" className="rounded-full px-5">
                                Sign In
                            </Button>
                        </Link>
                        <Link href="/sign-up">
                            <Button className="rounded-full px-5">Sign Up</Button>
                        </Link>
                    </div>)}
                </div>
            </div>
        </header>
    );
};

export default Navber;
