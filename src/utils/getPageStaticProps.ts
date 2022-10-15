import { gql } from "@apollo/client";
import type { GetStaticProps } from "next";
import client from "src/lib/apollo/client";
import { cleanAndTransformBlocks } from "src/utils/cleanAndTransformBlocks";

export const getPageStaticProps = async () => {
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
