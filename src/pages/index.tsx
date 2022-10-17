import { gql } from "@apollo/client";
import type { GetStaticProps, NextPage } from "next";
import { ReactElement, useContext } from "react";
import { MainMenu } from "src/components/MainMenu";
import client from "src/lib/apollo/client";
import { AnyAaaaRecord } from "dns";
import { BlockRenderer } from "src/components/BlockRenderer";
import { cleanAndTransformBlocks } from "src/utils/cleanAndTransformBlocks";
import { getPageStaticProps } from "src/utils/getPageStaticProps";

export type Data = {
  data: object;
  blocks: [];
  mainMenuItems: [];
  featuredImage: string;
  callToActionLabel: string;
  callToActionDestination: string;
};

const Home: NextPage<Data> = ({
  data,
  blocks,
  featuredImage,
  mainMenuItems,
  callToActionLabel,
  callToActionDestination,
}: Data) => {
  console.log(data);
  console.log(blocks);
  console.log(mainMenuItems);
  console.log(callToActionLabel);
  console.log(callToActionDestination);

  return (
    <div>
      <MainMenu
        items={mainMenuItems}
        callToActionLabel={callToActionLabel}
        callToActionDestination={callToActionDestination}
      />
      <div className="container ">
        <BlockRenderer blocks={blocks} />
      </div>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = getPageStaticProps;
