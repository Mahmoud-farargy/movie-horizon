import { useTranslations } from "next-intl";

export default function NotAvailableList({className}: {className?: string}) {
  const $t = useTranslations();
  return (
    <div className={`${className} flex opacity-50`.trim()}>
      <strong>{$t("empty_list")}</strong>
    </div>
  );
}
