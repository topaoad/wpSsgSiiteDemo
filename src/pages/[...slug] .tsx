import { gql } from "@apollo/client";
import client from "src/lib/apollo/client";
import { BlockRenderer } from "src/components/BlockRenderer";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { cleanAndTransformBlocks } from "src/utils/cleanAndTransformBlocks";
import { getPageStaticProps } from "src/utils/getPageStaticProps";
// import { Page } from "src/components/Page";

export type DynamicData = {
  blocks: [];
};

export type getStaticPathsProps = {
  uri: string;
};

export const Page: NextPage<DynamicData> = ({ blocks }) => {
  console.log(blocks);
  return (
    <div>
      <BlockRenderer blocks={blocks} />
    </div>
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
        # properties {
        #   nodes {
        #     uri
        #   }
        # }
      }
    `,
  });

  // ★うまく取得できなかったので書き換えてみたが、それでもエラー
  const paths = data.pages.nodes
    .filter((page: { uri: string }) => page.uri !== "/")
    .map((page: { uri: string }) => {
      const pathsCm = page.uri.substring(1, page.uri.length - 1).split("/");
      return pathsCm;
    });

  return {
    //　★ここは解答例のとおり
    // paths: data.pages.nodes
    //   .filter((page: any) => page.uri !== "/")
    //   .map((page: any) => ({
    //     params: {
    //       // substring() メソッドは string オブジェクトの開始・終了位置の間、または文字列の最後までの部分集合を返します。
    //       slug: page.uri.substring(1, page.uri.length - 1).split("/"),
    //     },
    //   })),

    //　★静的slugと動的slugを両方書いてもどちらも反応しない。
    paths: [{ params: { slug: "contact" } }, { params: { slug: paths } }],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = getPageStaticProps;

export default Page;
