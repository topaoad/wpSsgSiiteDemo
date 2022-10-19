import { PropertyCard } from "./PropertyCard";

type ResultsProps = {
  galleries: ResultProp[];
};
type ResultProp = {
  key: string;
  databaseId: string;
  uri: string;
  title: string;
  galleryProperty: {
    price: number;
    bathrooms: number;
    parkings: boolean;
    bedrooms: number;
    gardens:  boolean;
  };
  featuredImage: {
    node: {
      sourceUrl: string;
    };
  };
};

export const Results = ({ galleries }: ResultsProps) => {
  return (
    <div className="max-w-5xl mx-auto grid grid-cols-3 gap-5 my-[20px]">
      {galleries.map((gallery) => (
        <PropertyCard   
          key={gallery.databaseId}
          title={gallery.title}
          destination={gallery.uri} 
          bedrooms={gallery.galleryProperty.bedrooms}
          bathrooms={gallery.galleryProperty.bathrooms}
          parkings={gallery.galleryProperty.parkings}
          gardens={gallery.galleryProperty.gardens}
          price={gallery.galleryProperty.price}
          image={gallery.featuredImage?.node?.sourceUrl}
        />
      ))}
    </div>
  );
};
