import { ReactNode } from "react";
import { columnsProps } from "src/types/column";

export const Columns = ({ isStackedOnMobile, children }: columnsProps) => {
  return (
    <div className="my-10">
      <div
        className={`max-w-5xl mx-auto ${
          isStackedOnMobile ? "block md:flex" : "flex"
        }`}
      >
        {children}
      </div>
    </div>
  );
};
