import { ButtonLink } from "src/components/ButtonLink";

type CallToActionButtonProps = {
  align: string;
  buttonLabel: string;
  destination: string;
};

export const CallToActionButton = ({
  align = "left",
  buttonLabel,
  destination,
}: CallToActionButtonProps) => {
  // TSがエラーを吐くので書き直し
  let alignPosition = "text-align";
  if (align === "center") {
    alignPosition = "text-center";
  }
  if (align === "right") {
    alignPosition = "text-right";
  }
  // const alignMap= {
  //   left: "text-align",
  //   center: "text-center",
  //   right: "text-right",
  // };

  return (
    <div className={`mt-[2rem] ${alignPosition}`}>
      <ButtonLink destination={destination} label={buttonLabel} />
    </div>
  );
};
