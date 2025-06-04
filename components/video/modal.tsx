"use client";
import { useRef } from "react";
import { useOnClickOutside } from "@/helpers/hooks";
import { useAppContext } from "@/context";

export default function VideoModal() {
 
  const { iframeSrc, setIframeSrc } = useAppContext();
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  useOnClickOutside(iframeRef, () => {
    setIframeSrc(null);
  });
  return (
    <>
        {iframeSrc ? (<div className="fixed top-0 right-0 left-0 bottom-0 z-10 bg-black/90 flex w-full">
            {/* Close button */}
            <button className="absolute top-1 right-1 p-3 z-[100] text-3xl bg-black/60 rounded-full"
            title="Close"
            onClick={() => setIframeSrc(null)}>
                <i>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"/></svg>
                </i>
            </button>
             {/* Iframe video */}
             <iframe 
                ref={iframeRef}
                allow="autoplay; encrypted-media"
                allowFullScreen
                src={iframeSrc}
                className="w-full m-5 lg:m-20 border-none"
             />
        </div>
        ) : null}
    </>
  )
}
