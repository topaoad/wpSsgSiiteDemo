import { ButtonLink } from "src/components/ButtonLink";
import Link from "next/link";
import { FaHouseUser, FaHeart } from "react-icons/fa";

export type mainMenuType = {
  items: mainMenuItemType[];
  callToActionLabel: string;
  callToActionDestination: string;
};
export type mainMenuItemType = {
  id: string;
  menuItem: {
    destination: {
      id: string;
      uri: string;
    };
    label: string;
  };
  items: subMenuItemType[];
};

// mapMainMenuItemsとパラメータが違うので共有化は断念
export type subMenuItemType = {
  destination: {
    id: string;
    uri: string;
  };
  label: string;
};

export const MainMenu = ({
  items,
  callToActionLabel,
  callToActionDestination,
}: mainMenuType) => {
  console.log("MAIN MENU: ", items);
  return (
    <div className="bg-slate-800 text-white px-5 h-[64px] sticky top-0 z-20 flex ">
      <div className="py-4 pl-5 flex text-pink-600  text-3xl font-mono">
        <Link href="/">
          <a className=" "> とっぷのサブサイト</a>
        </Link>
      </div>
      <div className="flex flex-1 justify-end">
        {(items || []).map((item: mainMenuItemType) => (
          <div
            key={item.menuItem.destination.id}
            // className=" mmd:flex mmd:items-center mt-30 hover:bg-slate-700 cursor-pointer relative group "
            className="mlg:flex mlg:items-center relative group"
          >
            <div>
              <Link href={item.menuItem.destination.uri}>
                <a className="p-2 lg:p-5 block">{item.menuItem.label} </a>
              </Link>
            </div>
            {item.items?.length && (
              <div className="group-hover:block hidden bg-slate-800 text-right absolute right-0 top-full -mt-3">
                {item.items.map((subMenuItem: subMenuItemType) => (
                  <Link
                    key={subMenuItem.destination.id}
                    href={`https://tktoplog.com/main-blog${subMenuItem.destination.uri}`}
                  >
                    <a className="text-center block whitespace-nowrap p-5 hover:bg-slate-700">
                      {subMenuItem.label}
                    </a>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
        <div className="ml-3 my-auto">
          <ButtonLink
            destination={`https://tktoplog.com/main-blog${callToActionDestination}`}
            label={callToActionLabel}
          />
        </div>
      </div>
    </div>
  );
};
