import { gql } from "@apollo/client";
import type { GetStaticProps, NextPage } from "next";
import { ReactElement } from "react";

import client from "src/lib/apollo/client";
import { AnyAaaaRecord } from "dns";

export type Data = {
  data: any;
};

const Home: NextPage<Data> = ({ data }) => {
  console.log(data);
  return (
    <div>
      <div>hello</div>
      <div>hello</div>
      <div>hello</div>
      <div>hello</div>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query({
    query: gql`
      query NewQuery {
        posts {
          nodes {
            link
            uri
            title
          }
        }
      }
    `,
  });

  return {
    props: {
      data,
    },
  };
};
