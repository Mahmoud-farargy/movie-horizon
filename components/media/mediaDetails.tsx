"use client";
import { useMemo } from "react";
import type { MediaItem, MediaType } from "@/types";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";

import {
  MediaOverview,
  SuspenseLoader,
  PageTabs,
} from "@/components";

// lazy load tab components
const MediaVideos = dynamic(() => import("@/components/media/tabs/mediaVideos"));
const MediaPhotos = dynamic(() => import("@/components/media/tabs/mediaPhotos"));

function MediaDetails({ item, type = "movie" }: { item: MediaItem; type: MediaType }) {
  const $t = useTranslations();

  const tabItems = useMemo(
    () => [
      {
        tab: "overview",
        label: $t("overview"),
        Component: <MediaOverview item={item} type={type} />,
      },
      {
        tab: "videos",
        label: $t("videos"),
        Component: <SuspenseLoader><MediaVideos item={item} /></SuspenseLoader>,
      },
      {
        tab: "media_photos",
        label: $t("media_photos"),
        Component: <SuspenseLoader><MediaPhotos item={item} /></SuspenseLoader>,
      },
    ],
    [$t, item, type]
  );

  return <PageTabs tabItems={tabItems} />;
}
export default MediaDetails;
