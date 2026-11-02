
import Looading_Selection from "@/components/Theme/Listing_loading";
import UserListing from "@/components/userListing";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Suspense } from "react";

const MyListing = () => {
  return (
    <div>
      <Suspense fallback={<Looading_Selection />}>
        <MyListingContent />
      </Suspense>
    </div>
  );
};

const MyListingContent = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userEmail = session?.user?.email;

  if (!userEmail) {
    return <p>Please login first</p>;
  }

  return (
    <Suspense fallback={<Looading_Selection />}>
      <UserListing userEmail={userEmail} />
    </Suspense>
  );
};

export default MyListing;