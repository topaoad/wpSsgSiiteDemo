import { gql } from "@apollo/client";
import type { GetStaticProps, NextPage } from "next";
import { ReactElement } from "react";
import { MainMenu } from "src/components/MainMenu";
import client from "src/lib/apollo/client";
import { AnyAaaaRecord } from "dns";
import { BlockRenderer } from "src/components/BlockRenderer";
import { cleanAndTransformBlocks } from "src/utils/cleanAndTransformBlocks";

export type Data = {
  data: any;
  blocks: any;
  mainMenuItems: any;
};

const Home: NextPage<Data> = ({ data, blocks, mainMenuItems }: Data) => {
  console.log(data);
  console.log(blocks);
  console.log(mainMenuItems);
  return (
    <div>
      <MainMenu
        items={mainMenuItems}
        callToActionLabel="TKBLOG"
        callToActionDestination="https://tktoplog.com/main-blog"
      />
      <BlockRenderer blocks={blocks} />
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query({
    query: gql`
      query PageQuery {
        nodeByUri(uri: "/") {
          ... on Page {
            id
            blocksJSON
            title
          }
        }
        acfOptionsMainMenu {
          mainMenu {
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
    },
  };
};
