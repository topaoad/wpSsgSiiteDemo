import { gql } from "@apollo/client";
import type { GetStaticProps, NextPage } from "next";
import { ReactElement } from "react";

import client from "src/lib/apollo/client";
import { AnyAaaaRecord } from "dns";
import { BlockRenderer } from "src/components/BlockRenderer";
import { cleanAndTransformBlocks } from "src/utils/cleanAndTransformBlocks";

export type Data = {
  data: any;
  blocks: any;
};

const Home: NextPage<Data> = ({ data, blocks }) => {
  console.log(data);
  console.log(blocks);
  return (
    <div>
      <BlockRenderer blocks={blocks} />
    </div>
  );
};

export default Home;


export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query({
    query: gql`
      query NewQuery {
        nodeByUri(uri: "/") {
          ... on Page {
            id
            blocksJSON
            title
          }
        }
      }
    `
  });
  // awaitをつけないとエラーとなります。blocksにpromiseが返ってきます。
  const blocks= await cleanAndTransformBlocks(data.nodeByUri.blocksJSON);
  
  return {
    props: {
      data: data,
      blocks:blocks,
    },
  };
};
