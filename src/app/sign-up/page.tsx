"use client"
import React, { useState } from "react";
import {
    Aperture,
    ArrowRight,
    Eye,
    EyeOff,
    ImageIcon,
    Lock,
    Mail,
    UserRound,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export default function Sign_in() {

    /* STEP 1: small UI states */
    const [showPassword, setShowPassword] = useState(false); // eye toggle
    const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
    const [showErrors, setShowErrors] = useState(false); // show rule errors after first submit

    /* STEP 2: the three password rules. Each broken rule adds one message. */
    const validatePassword = (password: string): string[] => {
        const errors: string[] = [];
        if (!/[A-Z]/.test(password)) {
            errors.push("Must have an Uppercase letter in the password");
        }
        if (!/[a-z]/.test(password)) {
            errors.push("Must have a Lowercase letter in the password");
        }
        if (password.length < 6) {
            errors.push("Length must be at least 6 characters");
        }

        return errors;
    };

    /* STEP 3: sign-in handler (same logic as before — validate first,
       then send the request with better-auth) */
    const handleSignUP = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries()) as { name: string, password: string, email: string }
        // Password validation চালানো
        setShowErrors(true);

        const errors = validatePassword(user.password);
        setPasswordErrors(errors);

        if (errors.length > 0) {
            return;
        }


        const { data, error } = await authClient.signUp.email({
            ...user,
            callbackURL: "/",

        });
        if (data) {
            console.log(data);


        }
        if (error) {
            console.log(error);
        }
    }

    const handleGoogle = async () => {
        const { data, error } = await authClient.signIn.social({
            provider: "google",
            callbackURL: "/"

        });

        if (data) {
            console.log(data);
        }
        if (error) {
            console.log(error);
        }

    }
    const handleGithub = async () => {
        const { data, error } = await authClient.signIn.social({
            provider: "github"
        })
        if (data) {
            console.log(data);
        }
        if (error) {
            console.log(error);
        }

    }




    /* STEP 5: the UI */
    return (
        <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gradient-to-br from-[#F5F2FE] to-[#FDFCFF] px-4 py-10 dark:from-[#12151E] dark:to-[#0D0F15]">

            <form
                onSubmit={handleSignUP}
                className="w-full max-w-md space-y-5 rounded-3xl bg-card p-8 shadow-xl ring-1 ring-foreground/10"
            >
                {/* Logo + heading */}
                <div className="flex flex-col items-center gap-3 text-center">
                    <span className="flex size-14 items-center justify-center rounded-full bg-gradient-to-b from-[#8B5CF6] to-[#6D28D9] shadow-md">
                        <Aperture className="size-7 text-white" />
                    </span>

                    <h1 className="text-3xl font-extrabold text-foreground">
                        Create an Accoutn
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Join StudioSpace and start exploring
                    </p>
                </div>

                {/* Name */}
                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-bold text-foreground">
                        Name
                    </label>
                    <div className="relative">
                        <UserRound className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Name"
                            className="w-full rounded-xl border border-border bg-background py-2.5 pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
                        />
                    </div>
                </div>
                {/* image url */}
                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-bold text-foreground">
                        image url
                    </label>
                    <div className="relative">
                              <ImageIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                            id="image"
                            name="url"
                            type="url"
                            placeholder="image url"
                            className="w-full rounded-xl border border-border bg-background py-2.5 pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
                        />
                    </div>
                </div>
                {/* Email Address */}
                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-bold text-foreground">
                        Email Address
                    </label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="alex.creator@studiospace.io"
                            className="w-full rounded-xl border border-border bg-background py-2.5 pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
                        />
                    </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className="text-sm font-bold text-foreground">
                            Password
                        </label>
                        <Link
                            href="#"
                            className="text-xs font-semibold text-primary hover:underline"
                        >
                            Forgot Password?
                        </Link>
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="w-full rounded-xl border border-border bg-background py-2.5 pl-9 pr-10 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
                        />
                        {/* Eye button: show / hide the password */}
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                        >
                            {showPassword ? (
                                <EyeOff className="size-4" />
                            ) : (
                                <Eye className="size-4" />
                            )}
                        </button>
                    </div>

                    {/* Rule errors (visible after the first submit) */}
                    {showErrors && passwordErrors.length > 0 && (
                        <div className="space-y-1">
                            {passwordErrors.map((error) => (
                                <p key={error} className="text-xs font-medium text-red-500">
                                    {error}
                                </p>
                            ))}
                        </div>
                    )}
                </div>

                {/* Sign In button (purple gradient) */}
                <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#9333EA] py-3 font-bold text-white transition-opacity hover:opacity-90"
                >
                    Sign up
                    <ArrowRight className="size-4" />
                </button>

                {/* OR CONTINUE WITH separator */}
                <div className="flex items-center gap-3">
                    <span className="h-px flex-1 bg-border" />
                    <span className="text-xs font-medium tracking-widest text-muted-foreground">
                        OR CONTINUE WITH
                    </span>
                    <span className="h-px flex-1 bg-border" />
                </div>

                {/* Sign in with Google */}

                <button
                    onClick={handleGoogle}
                    type="button"
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-3 font-medium text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 hover:shadow-md dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 48 48"
                    >
                        <path
                            fill="#4285F4"
                            d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.6c3.9-3.6 6.1-8.8 6.1-15Z"
                        />
                        <path
                            fill="#34A853"
                            d="M24 44c5.5 0 10.1-1.8 13.5-4.8l-6.6-5.1c-1.8 1.2-4.1 1.9-6.9 1.9-5.3 0-9.8-3.6-11.4-8.4H5.8v5.3A20 20 0 0 0 24 44Z"
                        />
                        <path
                            fill="#FBBC05"
                            d="M12.6 27.6a12 12 0 0 1 0-7.2v-5.3H5.8a20 20 0 0 0 0 17.8l6.8-5.3Z"
                        />
                        <path
                            fill="#EA4335"
                            d="M24 12.1c3 0 5.7 1 7.8 3.1l5.8-5.8C34.1 6.1 29.5 4 24 4A20 20 0 0 0 5.8 15.1l6.8 5.3C14.2 15.7 18.7 12.1 24 12.1Z"
                        />
                    </svg>

                    <span>Continue with Google</span>
                </button>

                <button
                    onClick={handleGithub}
                    type="button"
                    className="flex w-full items-center cursor-pointer justify-center gap-3 rounded-xl border border-gray-300 bg-white px-4 py-3 font-medium text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 hover:shadow-md dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.53v-2.08c-3.1.67-3.76-1.32-3.76-1.32-.5-1.28-1.24-1.62-1.24-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 .1.76 2.1 3.5 1.6.1-.71.39-1.2.7-1.48-2.47-.28-5.06-1.24-5.06-5.5 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.95 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.12-1.44 3.05-1.14 3.05-1.14.61 1.53.23 2.67.11 2.95.72.78 1.15 1.78 1.15 3 0 4.27-2.6 5.21-5.08 5.49.4.34.75 1.02.75 2.06V22c0 .29.2.64.76.53A11.1 11.1 0 0 0 12 .9Z" />
                    </svg>

                    <span>Continue with GitHub</span>
                </button>


                {/* Register link at the bottom */}
                <p className="text-center text-sm text-muted-foreground">
                    Already have an account?
                    <Link href="/sign-in" className="font-semibold text-primary hover:underline">
                        Login
                    </Link>
                </p>
            </form>
        </section>
    );
}
