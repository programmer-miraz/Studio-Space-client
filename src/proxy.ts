import React from 'react';
import { auth } from './lib/auth';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';


const proxy = async (request: NextRequest) => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }
};

export const config = {
    matcher: ["/Add-new-studio", "/my-listings", "/my-listings/:path*", "/Booking-add"],

}
export default proxy;