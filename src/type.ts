
export interface StudioDetails {
    _id?: string;
    name?: string;
    title?: string;
    location?: string;
    address?: string;
    description?: string;
    overview?: string;


    image?: string;
    coverImage?: string;
    images?: string[];
    photos?: string[];
    gallery?:string[]

    // price / info fields
    hourlyRate?: number | string;
    price?: number | string;
    securityDeposit?: number | string;
    deposit?: number | string;
    capacity?: number | string;
    maxCapacity?: number | string;
    rating?: number | string;
    reviews?: number | string;

    // amenity list from the database
    amenities?: string[];
    features?: string[];
};