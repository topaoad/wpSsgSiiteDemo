import { gql } from "@apollo/client";
import client from "src/lib/apollo/client";
import { BlockRenderer } from "src/components/BlockRenderer";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { cleanAndTransformBlocks } from "src/utils/cleanAndTransformBlocks";
import { getPageStaticProps } from "src/utils/getPageStaticProps";
// import { Page } from "src/components/Page";

// export default Page;

export type DynamicData = {
  blocks: [];
};

export type getStaticPathsProps= {
  uri: string;

};

export const Page: NextPage<DynamicData> = ({ blocks }) => {
  return (
    <div>
      <BlockRenderer blocks={blocks} />
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
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

  return {
    // paths: [...data.pages.nodes, ...data.properties.nodes]
    paths: data.pages.nodes
      // .filter((page) => page.uri !== "/")
      .map((page:getStaticPathsProps) => ({
        params: {
          // substring() メソッドは string オブジェクトの開始・終了位置の間、または文字列の最後までの部分集合を返します。
          slug: page.uri.substring(1, page.uri.length - 1).split("/"),
        },
      })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = getPageStaticProps;

export default Page;
