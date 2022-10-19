import { gql } from "@apollo/client";
import type { GetStaticProps, NextPage } from "next";
import { ReactElement, useContext } from "react";
import { MainMenu } from "src/components/MainMenu";
import client from "src/lib/apollo/client";
import { AnyAaaaRecord } from "dns";
import { BlockRenderer } from "src/components/BlockRenderer";
import { cleanAndTransformBlocks } from "src/utils/cleanAndTransformBlocks";
import { getPageStaticProps } from "src/utils/getPageStaticProps";
import { Page } from "src/pages/[...slug]"

export default Page;

export const getStaticProps: GetStaticProps = getPageStaticProps;
