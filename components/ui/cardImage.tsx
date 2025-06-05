'use client';
import { useCallback, useState } from "react";
import NextImage from "next/image";
import type  { ImageProps } from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";

// interfaces
interface CardImageProps extends ImageProps {
  src: string;
  alt: string;
  errorIconName: string;
  cardIconName?: string;
  aspectRatio?: string | number
}
export default function CardImage({
  src,
  alt = '',
  errorIconName = 'question',
  cardIconName,
  aspectRatio,
  ...props
}: CardImageProps) {
  const [hasError, setErrorState] = useState(!Boolean(src));
  // const [isLoading, setLoadingState] = useState<boolean>(true);

  const handleError = useCallback(() => {
    setErrorState(true);
  },[]);
  // const handleLoadingState = useCallback((newState: boolean) => {
  //   setLoadingState(newState);
  // }, []);
  return !hasError ? (
        // Image
        <div className="h-full relative">
            <NextImage src={src} alt={alt} {...props} onError={handleError} style={{aspectRatio: aspectRatio || 'auto'}}/>
            {cardIconName ? <div className="flex w-full h-full absolute inset-0 opacity-20 hover:opacity-100 transition-[opacity] duration-200">
                <Icon icon={`ph:${cardIconName}`} className="m-auto text-3xl" />
            </div> : null}
            {/* {isLoading && <div className="flex items-center justify-center absolute inset-0 animate-pulse w-full h-full opacity-10">
              <Icon icon="ph:circle-notch-duotone" className="animate-spin m-auto  text-4xl" />
            </div>} */}
        </div>
        // Error
      ) : (
        <div className="flex items-center justify-center w-full h-full opacity-10">
          <Icon icon={`ph:${errorIconName}`} className="m-auto text-4xl" />
        </div>
      )
}
