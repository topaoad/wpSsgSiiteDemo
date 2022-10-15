import React from "react";
import { getFontSizeForHeading, getTextAlign } from "src/utils/fonts";

type HeadingProps = {
  textAlign: string;
  content: string;
  level: number;
};

export const Heading = ({ textAlign, content, level }: HeadingProps) => {
  const tag = React.createElement(`h${level}`, {
    dangerouslySetInnerHTML: { __html: content },
   
    className: `font-heading max-w-5xl mx-auto my-5
     ${getFontSizeForHeading(level)}
     ${getTextAlign(textAlign)}`,
    
  });
  return tag;
};

