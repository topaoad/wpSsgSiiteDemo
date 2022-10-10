// export const theme= {
//   foreground: "#000000",
//   background: "#ffffff",
//   primary: "#1a4548",
//   secondary: "#ffe2c7",
//   tertiary: "#F6F6F6",
//   slate: "#1E293B",
//   "sub-accent-color":"#b72aa0",
//   "luminous-vivid-orange": "rgb(255, 105, 0)",
// };

export const theme = (item: string) => {
  let themeColor = "";
  switch (item) {
    case "foreground":
      themeColor = "#000000";
      break;
    case "background":
      themeColor = "#ffffff";
      break;
    case "primary":
      themeColor = "#1a4548";
      break;
    case "secondary":
      themeColor = "#ffe2c7";
      break;
    case "tertiary":
      themeColor = "#F6F6F6";
      break;
    case "slate":
      themeColor = "#1E293B";
      break;
    case "sub-accent-color":
      themeColor = "#b72aa0";
      break;
    case "luminous-vivid-orange":
      themeColor = "rgb(255, 105, 0)";
      break;
  }

  return themeColor;
};
