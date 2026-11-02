import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import Edit_page from "@/components/Edit/Edit";
import type { User } from "better-auth";
import { Suspense } from "react";
import Loading from "@/components/loading/Cart_Suspense";
export type MyStudio = {
    _id: string;
    title: string;
    description: string;
    category: string;
    location: string;
    price: number;
    images: string[];
    amenities: string[];
    email: string;
    createdAt?: string;
    workingSince:string
    updatedAt?: string;
};

export default function EditPage({params}: { params: Promise<{ id: string }>}) {
    return (
        <Suspense fallback={<Loading></Loading>}>
            <Edit params={params} />
        </Suspense>
    );
}
const Edit = async ({params}: {params: Promise<{ id: string }>;}) => {
    const { id } = await params;
    const session = await auth.api.getSession({
        headers: await headers()
    });
    const userSession = session?.user;


    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/my-listing-edit/${id}`,
        { cache: "no-store" }
    );

    const userData: MyStudio = await res.json();


    return (
        <Edit_page
            studio={userData}
            userSession={userSession as User}
        />
    );
};
