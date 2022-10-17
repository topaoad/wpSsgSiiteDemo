import { CallToActionButton } from "src/components/CallToActionButton";
import { Column } from "src/components/Column";
import { Columns } from "src/components/Columns";
import { Cover } from "src/components/Cover";
// import { FormspreeForm } from "src/components/FormspreeForm";
import { Heading } from "src/components/Heading";
import { Paragraph } from "src/components/Paragraph";
// import { PostTitle } from "src/components/PostTitle";
// import { PropertyFeatures } from "src/components/PropertyFeatures";
// import { PropertySearch } from "src/components/PropertySearch";
import Image from "next/image";
import { theme } from "src/utils/theme";

type ArrayBlockRendererProps = {
  blocks: [];
};

type BlockRendererProps = {
  name: string;
  id: string;
  attributes: {
    textAlign: string;
    textColor: string;
    align: string;
    content: string;
    level: number;
    url: string;
    originalHeight: number;
    originalWidth: number;
    alt: string;
    isStackedOnMobile: string;
    width: string;

    style: {
      textColor: {
        text: string;
      };
    };
    data: {
      label: string;
      destination: string;
      align: string;
    };
  };

  innerBlocks: any;
};

export const BlockRenderer = ({ blocks }: any) => {

  
  return blocks.map((block: BlockRendererProps) => {
    switch (block.name) {
      // case "acf/formspreeform": {
      //   return (
      //     <FormspreeForm
      //       key={block.id}
      //       formId={block.attributes.data.form_id}
      //     />
      //   );
      // }
      // case "acf/propertyfeatures": {
      //   return <PropertyFeatures key={block.id} />;
      // }
      case "acf/ctabutton": {
        console.log("CTA: ", block);
        return (
          <CallToActionButton
            key={block.id}
            buttonLabel={block.attributes.data.label}
            destination={block.attributes.data.destination || "/"}
            align={block.attributes.data.align}
          />
        );
      }
      case "core/paragraph": {
        return (
          <Paragraph
            key={block.id}
            textAlign={block.attributes.align}
            content={block.attributes.content}
            textColor={
              // 参照コードを書き換えて関数化
              // theme[block.attributes.textColor] ||
              theme(block.attributes.textColor) ||
              block.attributes.style?.textColor.text
            }
          />
        );
      }
      case "core/heading": {
        return (
          <Heading
            key={block.id}
            level={block.attributes.level}
            content={block.attributes.content}
            textAlign={block.attributes.textAlign}
          />
        );
      }
      // case "core/post-title": {
      //   return (
      //     <PostTitle
      //       key={block.id}
      //       level={block.attributes.level}
      //       textAlign={block.attributes.textAlign}
      //     />
      //   );
      // }
      // case "acf/propertysearch": {
      //   return <PropertySearch key={block.id} />;
      // }
      case "core/cover": {
        console.log("COVER BLOCK: ", block);
        return (
          <Cover key={block.id} backgroundUrl={block.attributes.url}>
            <BlockRenderer blocks={block.innerBlocks} />
          </Cover>
        );
      }
      case "core/columns": {
        return (
          <Columns
            key={block.id}
            isStackedOnMobile={block.attributes.isStackedOnMobile}
          >
            <BlockRenderer blocks={block.innerBlocks} />
          </Columns>
        );
      }
      case "core/column": {
        return (
          <Column key={block.id} width={block.attributes.width}>
            <BlockRenderer blocks={block.innerBlocks} />
          </Column>
        );
      }
      case "core/group":
      case "core/block": {
        return <BlockRenderer key={block.id} blocks={block.innerBlocks} />;
      }
      case "core/image": {
        return (
          <Image
            key={block.id}
            src={block.attributes.url}
            height={block.attributes.originalHeight}
            width={block.attributes.originalWidth}
            alt={block.attributes.alt ? block.attributes.alt : ""}
          />
        );
      }
      case "core/spacer": {
        return <div key={block.id}>スペーサーブロックです</div>;
      }
      default: {
        console.log("UNKNOWN: ", block);
        return null;
      }
    }
  });
};
