import {
  faBathtub,
  faBed,
  faCar,
  faDog,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import numeral from "numeral";

type PropertyCardProps = {
  title: string;
  destination: string;
  image: string;
  bathrooms: number;
  bedrooms: number;
  gardens:  boolean;
  parkings:  boolean;
  price: number;
};

export const PropertyCard = ({
  title,
  destination,
  image,
  bathrooms,
  bedrooms,
  gardens,
  parkings,
  price,
}: PropertyCardProps) => {
  return (
    <Link href={destination}>
      <a className="border-2 border-slate-300 p-5 block bg-slate-100 hover:bg-slate-200">
        <div className="flex w-full relative">
          <Image
            src={image}
            height="200px"
            width="300px"
            objectFit="cover"
            alt=""
          />
          <div className="post-img-frame"></div>
        </div>
        <div className="mt-3 text-lg font-bold">{title}</div>
        <div className="text-lg">£{numeral(price).format("0,0")}</div>
        <div className="flex justify-between text-sm mt-3">
          <div>
            <FontAwesomeIcon icon={faBathtub} />
            <span className="pl-2">{bathrooms} bathrooms</span>
          </div>
          <div>
            <FontAwesomeIcon icon={faBed} />
            <span className="pl-2">{bedrooms} bedrooms</span>
          </div>
        </div>
      </a>
    </Link>
  );
};

// {(!!hasParking || !!petFriendly) && (
//   <div className="flex justify-between text-sm mt-3">
//     <div>
//       {!!hasParking && (
//         <>
//           <FontAwesomeIcon icon={faCar} /> parking available
//         </>
//       )}
//     </div>
//     <div>
//       {!!petFriendly && (
//         <>
//           <FontAwesomeIcon icon={faDog} /> pet friendly
//         </>
//       )}
//     </div>
//   </div>
// )}
