"use client";
import { createContext, useContext, useState } from "react"
import type { Dispatch, SetStateAction } from "react";
import type { PhotoItem } from "@/types";

// Inferfaces
interface ContextProps {
    iframeSrc: string | null
    setIframeSrc: Dispatch<SetStateAction<string | null>>;
    images: {list: PhotoItem[], initialIndex: number};
    setImages: Dispatch<SetStateAction<{list: PhotoItem[], initialIndex: number}>>;
}
// Context
const Context = createContext<ContextProps>({
    iframeSrc: null,
    setIframeSrc: () => {},
    images: {list: [], initialIndex: 0},
    setImages: () => {}
});
export const ContextProvider = ({children}: { children: React.ReactNode}) => {
  const [iframeSrc, setIframeSrc] = useState<string | null>(null);
  const [images, setImages] = useState<{list: PhotoItem[], initialIndex: number}>({list: [], initialIndex: 0});

  return (
    <Context.Provider value={{iframeSrc, setIframeSrc, images, setImages}}>
        {children}
    </Context.Provider>
  )
}
export const useAppContext = () => {
    return useContext(Context);
}