import { Heading } from "src/components/Heading";
import { usePageContext } from "src/components/Layout";

type postTitleProps = {
  level: number;
  textAlign: string;
};

export const PostTitle = ({ level, textAlign }: postTitleProps) => {
  const { title } = usePageContext();
  console.log("レンダーしてます");
  return <Heading content={title} level={level} textAlign={textAlign} />;
};
