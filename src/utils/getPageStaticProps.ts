import { gql } from "@apollo/client";
import type { GetStaticProps } from "next";
import client from "src/lib/apollo/client";
import { cleanAndTransformBlocks } from "src/utils/cleanAndTransformBlocks";

export const getPageStaticProps = async (context: any) => {
  console.log("CONTEXT: ", context);
  const uri = context.params?.slug ? `/${context.params.slug.join("/")}/` : "/";

  const { data } = await client.query({
    query: gql`
      query PageQuery($uri: String!) {
        nodeByUri(uri: $uri) {
          ... on Page {
            id
            blocksJSON
            title
            featuredImage {
              node {
                sourceUrl
              }
            }
          }
          ... on Gallery {
            id
            blocksJSON
            title
            featuredImage {
              node {
                sourceUrl
              }
            }
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
    variables: {
      uri,
    },
  });

  // awaitをつけないとエラーとなります。blocksにpromiseが返ってきます。
  const blocks = await cleanAndTransformBlocks(data.nodeByUri.blocksJSON);

  return {
    props: {
      data: data,
      blocks: blocks,
      // featuredImage: data.nodeByUri.featuredImage.node.sourceUrl ,
      mainMenuItems: data.acfOptionsMainMenu.mainMenu.menuItems,
      callToActionLabel:
        data.acfOptionsMainMenu.mainMenu.callToActionButton.label,
      callToActionDestination:
        data.acfOptionsMainMenu.mainMenu.callToActionButton.destination.uri,
    },
  };
};
