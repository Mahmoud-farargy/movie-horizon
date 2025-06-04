import type { PersonItem } from "@/types";
import { PersonCreditsList } from "@/components";
import { useTranslations } from "next-intl";

export default function PersonCredits({ item }: { item: PersonItem }) {
  const $t = useTranslations();
  return (
    <div className="flex flex-col px-6 md:px-16 gap-5">
        {/* == Cast ==  */}
      {item?.combined_credits?.cast?.length ? (
        <PersonCreditsList
          items={item?.combined_credits?.cast}
          title={$t("acting_credits")}
        />
      ) : null}
        {/* == Crew == */}
        {item?.combined_credits?.crew?.length ? (
        <PersonCreditsList
          items={item?.combined_credits?.crew}
          title={$t("production_credits")}
        />
      ) : null}
    </div>
  );
}
