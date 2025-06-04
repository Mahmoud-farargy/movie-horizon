"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Fragment, useRef } from "react";

export default function CarouselRow({
  children,
  moreNode,
  titleNode,
}: {
  children: React.ReactNode;
  moreNode?: React.ReactNode;
  titleNode: React.ReactNode;
}) {
  const scrollContainer = useRef<HTMLDivElement>(null);
  type Direction = "left" | "right";
  const scrollHorizontally = (direction: Direction) => {
    const windowHeight = window.innerHeight;
    scrollContainer.current?.scrollBy({
      left: direction === "left" ? windowHeight * -1 : windowHeight,
      behavior: "smooth",
    });
  };
  return (
    <Fragment>
      <div className="flex justify-between py-3 px-5 md:px-10 items-center mt-5">
        {/* === Row Title === */}
        <div className="text-lg md:text-xl lg:text-2xl text-ellipsis">{titleNode}</div>

        {/* === Row More Button === */}
        {moreNode && <div className="self-end text-sm md:text-base">{moreNode}</div>}
      </div>
      <div className="relative">
        <div ref={scrollContainer} className="overflow-y-auto overscroll-x-none scroll-smooth">
          <div className="flex gap-2 w-max py-2 px-5 md:px-10">{children}</div>
        </div>
        {/* === Scroll to Left Button === */}
        <button
          type="button"
          className="flex flex-col absolute z-[2] top-0 left-0 bottom-0 bg-black/10 p-3 items-center justify-center opacity-0 hover:opacity-100 transition-[opacity] duration-200 ease-in-out"
          title="Scroll left"
          onClick={() => scrollHorizontally("left")}
        >
          <Icon icon="ph:caret-left-light" className="text-3xl text-white" />
        </button>

        {/* === Scroll to Right Button === */}
        <button
          type="button"
          className="flex flex-col absolute z-[2] top-0 right-0 bottom-0 bg-black/10 p-3 items-center justify-center opacity-0 hover:opacity-100 transition-[opacity] duration-200 ease-in-out"
          title="Scroll right"
          onClick={() => scrollHorizontally("right")}
        >
          <Icon icon="ph:caret-right-light" className="text-3xl text-white" />
        </button>
      </div>
    </Fragment>
  );
}
