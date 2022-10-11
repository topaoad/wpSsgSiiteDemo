// import { usePageContext } from "context/page";
import next from "next";
import Image from "next/image";
import { ReactDOM, ReactElement } from "react";
import { ReactNode } from "react";

interface CoverProps {
  children: ReactNode;
  backgroundUrl: string;
}

export const Cover = ({ children,  backgroundUrl }: CoverProps) => {
  // const { featuredImage } = usePageContext();

  return (
    <div className="h-screen text-white bg-slate-800 relative min-h-[400px] flex justify-center items-center margin--64">
      {(!! backgroundUrl ) && (
        <Image
          alt="Cover"
          src={ backgroundUrl }
          layout="fill"
          objectFit="cover"
          className="mix-blend-hard-light"
        />
      )}
      <div className="max-w-5xl z-10">{children}</div>
    </div>
  );
};
