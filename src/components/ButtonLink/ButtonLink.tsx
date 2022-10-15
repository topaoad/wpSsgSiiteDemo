import Link from "next/link";

export type buttonLinkType = {
  destination: string;
  label: string;
};

export const ButtonLink = ({ destination, label }: buttonLinkType) => {
  console.log("destination",destination);
  
  return (
    <Link href={destination}>
      <a className="btn text-white bg-pink-500  text-2xl font-mono px-4 py-2 hover:bg-pink-700 rounded-lg uppercase">
        {label}
      </a>
    </Link>
  );
};
