"use client";

import Link from "next/link";
import { FC, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUp } from "../svg-icons/ArrowUp";
import {
  BaseCollapser,
  BaseCollapserHeader,
  BaseCollapserContent,
} from "../collapser/Collapser";

type Props = {
  navbarItems: NavbarItem[];
  containerItemsClass?: string;
  itemClass?: string;
  iconsClass?: string;
  activeItemClass?: string;

  selectedItem?: (item: Item) => void;
};

export const NavbarItems: FC<Props> = (props) => {
  const {
    navbarItems,
    containerItemsClass,
    itemClass,
    activeItemClass,
    iconsClass,
    selectedItem,
  } = props;
  const patthname = usePathname();
  const [items, setItems] = useState<NavbarItem[]>(navbarItems);

  const clickOnHeader = (i: number): void => {
    items[i].isOpen = !items[i].isOpen;

    setItems([...items]);
  };

  const handelSelectedItem = (item: Item) => {
    if (selectedItem) selectedItem(item);
  };

  return (
    <>
      <div className={`w-full`}>
        <div
          className={`m-auto py-3 my-2 sm:my-5 w-11/12 ${containerItemsClass}`}
        >
          {items.map((item: NavbarItem, index: number) => {
            const isActive = patthname === item.href;
            if (item.children) {
              return (
                <BaseCollapser key={index}>
                  <BaseCollapserHeader
                    id={index}
                    isOpen={item.isOpen}
                    clickOnHeader={(e) => clickOnHeader(e)}
                  >
                    <div
                      className={`flex items-center justify-between rounded-lg px-4 text-sm my-2 cursor-pointer py-3 ${itemClass}`}
                    >
                      <span className="flex items-center">
                        {item.iconComponent}
                        {item.title}
                      </span>

                      <ArrowUp
                        style={
                          item.isOpen
                            ? {
                                transform: `rotateX(180deg)`,
                                transition: `transform 1000ms`,
                              }
                            : {
                                transform: `rotateX(0)`,
                                transition: `transform 1000ms`,
                              }
                        }
                        className={`${iconsClass} ${item.isOpen ? "" : ""} `}
                      />
                    </div>
                  </BaseCollapserHeader>
                  <BaseCollapserContent id={index}>
                    <div className="px-4 text-sm rounded-lg last:mb-2">
                      {item.children &&
                        item.children.map((i: NavbarItem, index: number) => {
                          const x = patthname === i.href;
                          return (
                            <Link
                              key={`BaseCollapserContent-${index}`}
                              className={`transition-colors rounded-lg px-4 w-full cursor-pointer text-sm block mb-2 py-3 ${itemClass} ${
                                x && `text-sm ${activeItemClass}`
                              }`}
                              href={i.href}
                              onClick={() => handelSelectedItem(i)}
                            >
                              {i.title}
                            </Link>
                          );
                        })}
                    </div>
                  </BaseCollapserContent>
                </BaseCollapser>
              );
            } else {
              return (
                <div className="w-full" key={`navigation-${item.href}`}>
                  <Link
                    className={`transition-colors rounded-lg px-4 w-full cursor-pointer text-sm block py-3 ${
                      isActive && `${activeItemClass} text-sm `
                    } ${itemClass} `}
                    href={item.href}
                    onClick={() => handelSelectedItem(item)}
                  >
                    {item.title}
                  </Link>
                </div>
              );
            }
          })}
        </div>
      </div>
    </>
  );
};
