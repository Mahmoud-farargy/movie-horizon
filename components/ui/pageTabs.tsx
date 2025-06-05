"use client";
import { Fragment, memo, useCallback, useState } from "react";

function Tabs({
  tabItems,
}: {
  tabItems: {
    tab: string;
    label: string;
    Component: React.ReactNode;
  }[];
}) {
  const [tab, setTab] = useState<number>(0);
  const changeCurrentTab = useCallback((index: number) => {
    setTab(index)
  }, []);
  return (
    <Fragment>
      {/* == Tab buttons == */}
      <div className="overflow-y-auto overscroll-x-none scroll-smooth">
        <div className="flex items-center w-max justify-center gap-3 md:gap-5 lg:gap-8 py-6 mx-auto">
          {tabItems?.map((tabItem, index) => {
            const isActive = tab == index;
            return (
              <button
                key={tabItem.tab}
                onClick={() => changeCurrentTab(index)}
                className={`${
                  isActive
                    ? "opacity-100 border-white"
                    : "opacity-[0.2] border-transparent hover:opacity-40"
                } border-b-[0.12rem] md:border-b-[0.125rem] text-[1rem] md:text-[1.25rem] p-3 uppercase leading-[1.75rem] tracking-[0.025rem] transition-[opacity,color,border-color] ease-linear duration-200`}
                role="tab"
              >
                {tabItem.label}
              </button>
            );
          })}
        </div>
      </div>
      {/* == Tab Component == */}
      {tabItems[tab].Component}
    </Fragment>
  );
}
export default memo(Tabs);
