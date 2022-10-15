import { ReactNode } from "react";

export type columnsProps = {
  isStackedOnMobile: string;
  children: ReactNode;
};

export type columnProps = {
  width: string;
  children: ReactNode;
};

// typeのインターセクション(結合）
export type columnIntersectionType = columnProps & columnsProps;
