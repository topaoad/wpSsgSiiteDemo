import { getTextAlign } from "src/utils/fonts";
import { relativeToAbsoluteUrls } from "src/utils/relativeToAbsoluteUrls";

export type ParagraphType = {
  textAlign: string;
  content: string;
  textColor: string;
};

export const Paragraph = ({
  textAlign = "left",
  content,
  textColor,
}: ParagraphType) => {
  console.log(textColor);
  console.log(content);
  return (
    <p
      className={`max-w-5xl mx-auto ${getTextAlign(textAlign)}`}
      style={{ color: textColor }}
      dangerouslySetInnerHTML={{ __html: relativeToAbsoluteUrls(content) }}
    />
  );
};
