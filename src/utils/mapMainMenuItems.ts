import { v4 as uuid } from "uuid";


export type menuItemsType = {
  menuItems: Array<menuItemType>;
};

export type menuItemType = {
  items: Array<subMenuItemType>;

  menuItem: {
    destination: {
      uri: string;
    };
    label: string;
    items: string;
  };
};

export type subMenuItemType = {
  id: string;
  label: string;
  destination: {
    uri: string;
  };
};


// menuItemsTypeを充てるとエラーになるのでやむを得ず[]対応。anyよりマシとの認識
export const mapMainMenuItems = (menuItems: []) => {
  return menuItems.map((menuItem: menuItemType) => ({
    id: uuid() ,
    destination: menuItem.menuItem.destination?.uri,
    label: menuItem.menuItem.label,
    subMenuItems: (menuItem.items || []).map(
      (subMenuItem: subMenuItemType) => ({
        id: uuid(),
        destination: subMenuItem.destination?.uri,
        label: subMenuItem.label,
      })
    ),
  }));
};
