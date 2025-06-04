import { Fragment, useMemo } from "react";
import type { PersonItem } from "@/types"
import { PageTabs, PersonInfo, PersonGrid, SuspenseLoader } from "@/components";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";

// lazy load tab components
const PersonCredits = dynamic(() => import("@/components/person/tabs/personCredits"));
const PersonPhotos = dynamic(() => import("@/components/person/tabs/personPhotos"));


export default function PersonDetails({ item } : { item: PersonItem }) {
    
    const $t = useTranslations();

    const tabItems = useMemo(
      () => [
        {
          tab: "known_for",
          label: $t("known_for"),
          Component: <PersonGrid item={item} />,
        },
        {
          tab: "credits",
          label: $t("credits"),
          Component: <SuspenseLoader><PersonCredits item={item} /></SuspenseLoader>,
        },
        {
          tab: "person_photos",
          label: $t("person_photos"),
          Component: <SuspenseLoader><PersonPhotos item={item} /></SuspenseLoader>,
        },
      ],
      [$t, item]
    );
  
    return (
        <Fragment>
            <PersonInfo item={item} />
            <PageTabs tabItems={tabItems} />
        </Fragment>
    );
}
