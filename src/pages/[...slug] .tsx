import { gql } from "@apollo/client";
import client from "src/lib/apollo/client";
import { BlockRenderer } from "src/components/BlockRenderer";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { cleanAndTransformBlocks } from "src/utils/cleanAndTransformBlocks";
// import { getPageStaticProps } from "src/utils/getPageStaticProps";
// import { Page } from "src/components/Page";

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
      .filter((page:any) => page.uri !== "/")
      .map((page:any) => ({
        params: {
          // substring() メソッドは string オブジェクトの開始・終了位置の間、または文字列の最後までの部分集合を返します。
          slug: page.uri.substring(1, page.uri.length - 1).split("/"),
        },
      })),
    fallback: false,
  };
};

// export const getStaticProps: GetStaticProps = getPageStaticProps;

export const getPageStaticProps:GetStaticProps = async () => {
  const { data } = await client.query({
    query: gql`
      query PageQuery {
        nodeByUri(uri: "/ssg-relation-page") {
          ... on Page {
            id
            blocksJSON
            title
          }
        }
        acfOptionsMainMenu {
          mainMenu {
            callToActionButton {
              destination {
                ... on Page {
                  id
                  uri
                }
              }
              label
            }
            menuItems {
              menuItem {
                destination {
                  ... on Page {
                    id
                    uri
                  }
                }
                label
              }
              items {
                destination {
                  ... on Page {
                    uri
                    id
                  }
                }
                label
              }
            }
          }
        }
      }
    `,
  });

  // awaitをつけないとエラーとなります。blocksにpromiseが返ってきます。
  const blocks = await cleanAndTransformBlocks(data.nodeByUri.blocksJSON);

  return {
    props: {
      data: data,
      blocks: blocks,
      mainMenuItems: data.acfOptionsMainMenu.mainMenu.menuItems,
      callToActionLabel:
        data.acfOptionsMainMenu.mainMenu.callToActionButton.label,
      callToActionDestination:
        data.acfOptionsMainMenu.mainMenu.callToActionButton.destination.uri,
    },
  };
};


export default Page;
