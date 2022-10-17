import { createContext, useContext } from "react";
import { getPageStaticProps } from "src/utils/getPageStaticProps";
import type { GetStaticProps, NextPage } from "next";

type PageContextType = {
  title: string;
  featuredImage: string;
};

const PageContext = createContext({title:"",featuredImage:""});

// Layoutに格納されたvalueをPageContextを通じてuseConetextに渡す。
// 使うページ側の可読性を挙げるためにLayoutにまとめています。
export const Layout = ({ value, children }: any) => {
  return <PageContext.Provider value={value}>{children}</PageContext.Provider>;
};

// これにより、上記で書き換えたPageContextを取得する。
export const usePageContext = () => {
  return useContext(PageContext);
};

export const getStaticProps: GetStaticProps = getPageStaticProps;
