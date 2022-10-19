import { gql } from "@apollo/client";
import client from "src/lib/apollo/client";
import { BlockRenderer } from "src/components/BlockRenderer";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { cleanAndTransformBlocks } from "src/utils/cleanAndTransformBlocks";
import { getPageStaticProps } from "src/utils/getPageStaticProps";
import { Layout } from "src/components/Layout";
import { MainMenu } from "src/components/MainMenu";
// import { Page } from "src/components/Page";

export type Data = {
  data: object;
  blocks: [];
  mainMenuItems:[];
  featuredImage: string;
  callToActionLabel: string;
  callToActionDestination: string;
};

// 型拡張
export type DynamicData = Data & {
  title: string;
};

export type getStaticPathsProps = {
  uri: string;
};

// dataは極力レンダリングしない
export const Page: NextPage<DynamicData> = ({
  title,
  blocks,
  // data,
  featuredImage,
  mainMenuItems,
  callToActionLabel,
  callToActionDestination,
}) => {
  console.log(blocks);
  // console.log(data);
  console.log(featuredImage);

  return (
    <Layout value={{ featuredImage: featuredImage, title: title }}>
      <MainMenu
        items={mainMenuItems}
        callToActionLabel={callToActionLabel}
        callToActionDestination={callToActionDestination}
      />
      <div className="container ">
        <BlockRenderer blocks={blocks} />
      </div>
    </Layout>
  );
};

export const getStaticPaths = async () => {
  const { data } = await client.query({
    query: gql`
      query AllPagesQuery {
        pages {
          nodes {
            uri
          }
        }
        galleries {
          nodes {
            id
            title
            uri
          }
        }
      }
    `,
  });

  // ★書き換え後 本当はこちらで実装したいが動かないので保留
  // const paths = [...data.pages.nodes,...data.galleries.nodes]
  //   .filter((page: { uri: string }) => page.uri !== "/")
  //   .map((page: { uri: string }) => {
  //     // const pathsCm = page.uri.substring(1, page.uri.length - 1).split("/");
  //     return page.uri;
  //   });

  return {
    //　★書き換え前。ちなみにこれは、２つの配列を開いて１つの配列に格納することで、いずれかの配列が合致することを表す。
    paths: [...data.pages.nodes, ...data.galleries.nodes]
      .filter((page: any) => page.uri !== "/")
      .map((page: any) => ({
        params: {
          // substring() メソッドは string オブジェクトの開始・終了位置の間、または文字列の最後までの部分集合を返します。
          slug: page.uri.substring(1, page.uri.length - 1).split("/"),
        },
      })),

    //　★書き換え後に対するpaths
    // paths: [{ params: { slug: paths } }],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = getPageStaticProps;

export default Page;
