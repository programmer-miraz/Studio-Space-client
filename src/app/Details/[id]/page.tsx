import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import DetailsContent from "@/components/DetailsContent";
import { StudioDetails } from "@/type";
import Details_loading from "@/components/loading/Details_loading";




const Details_page = ({params,}: {
    params: Promise<{ id: string }>;
}) => {
    return (
        <Suspense fallback={<Details_loading/>}>
            <FetchStudioDetails params={params} />
        </Suspense>
    );
};



const FetchStudioDetails = async ({ params, }: { params: Promise<{ id: string }>; }) => {
    const { id } = await params;

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/explore-studios/${id}` );
    if (!res.ok) {
        notFound();
    }
    const data:StudioDetails = await res.json();

    return(
        <div>
            
          <DetailsContent studio={data}/>
            

        
        </div>
    )
};

export default Details_page;
