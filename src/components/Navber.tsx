"use client"
import { Aperture, CalendarCheck, Heart, LayoutDashboard, LogOutIcon, PlusCircle } from "lucide-react";
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
    const session = useSession()
    const userSession = session?.data?.user
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
                {userSession ? (<div className=" absolute right-40 ">
                    <ThemeToggle />
                </div>) : (<> <ThemeToggle /></>)}

                    {userSession ? (<>

                        <DropdownMenu>
                            <DropdownMenuTrigger className="bg-gray-300" render={<Button variant="ghost" size="icon" className="rounded-full gap-2 cursor-pointer"><Avatar>
                                <AvatarImage
                                    referrerPolicy="no-referrer"
                                    src={userSession?.image || "https://github.com/shadcn.png"}
                                    alt={userSession?.name || "User"}

                                />
                                <AvatarFallback>{userSession?.name?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                            </Avatar></Button>} />
                            <DropdownMenuContent className="w-41 ">
                                <DropdownMenuGroup>

                                    <DropdownMenuItem className="flex cursor-pointer items-center gap-2.5">
                                        <PlusCircle className="h-4 w-4" />
                                        <span>Add New Studio</span>
                                    </DropdownMenuItem>

                                    <DropdownMenuItem className="flex cursor-pointer items-center gap-2.5">
                                        <LayoutDashboard className="h-4 w-4" />
                                        <span>My Studio Listings</span>
                                    </DropdownMenuItem>

                                    <DropdownMenuItem className="flex cursor-pointer items-center gap-2.5">
                                        <CalendarCheck className="h-4 w-4" />
                                        <span>My Bookings</span>
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
