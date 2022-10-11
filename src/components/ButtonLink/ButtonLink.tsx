import Link from "next/link";

export type buttonLinkType={
  destination:string,
   label:string
}

export const ButtonLink = ({ destination, label }:buttonLinkType) => {
  return (
    <Link href={destination}>
      <a className="btn">{label}</a>
    </Link>
  );
};
