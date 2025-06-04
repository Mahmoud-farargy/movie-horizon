"use client"
import { SuspenseLoader } from "@/components"
import dynamic from "next/dynamic"
import { useAppContext } from "@/context"

export default function LazyLoadedModals() {
  const { iframeSrc, images } = useAppContext()

  const VideoModal = dynamic(() => import("@/components/video/modal"))
  const PhotoModal = dynamic(() => import("@/components/photo/modal"))
  return (
    <SuspenseLoader>
      {iframeSrc && <VideoModal />}
      {images.list && <PhotoModal />}
    </SuspenseLoader>
  )
}
