import { usePageContext } from "src/components/Layout";
import next from "next";
import Image from "next/image";
import { ReactDOM, ReactElement } from "react";
import { ReactNode } from "react";
import { isConditionalExpression } from "typescript";

interface CoverProps {
  children: ReactNode;
  backgroundUrl: string;
}

export const Cover = ({ children, backgroundUrl }: CoverProps) => {
  const {featuredImage} = usePageContext();

  // !!の二重否定は、値をbooleanとして使用できる。
  return (
    <div className="animate-scale-in-center  h-screen text-white bg-slate-800 relative min-h-[400px] flex justify-center items-center margin--64 mainview__width">
      {(!!backgroundUrl || !!featuredImage) && (
        <Image
          alt="Cover"
          src={backgroundUrl || featuredImage}
          layout="fill"
          objectFit="cover"
          className="mix-blend-hard-light"
        />
      )}
      <div className="max-w-5xl z-10">{children}</div>
    </div>
  );
};
