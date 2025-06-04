import { APP_INFO } from "@/helpers/constants";
import NextImage from "next/image";
import { useTranslations } from "next-intl";
import { IconTMDB, LanguageSwitcher } from "@/components";

export default function Footer() {
  const $t = useTranslations();
  return (
    <footer className="flex flex-col gap-4 py-16 px-4 sm:px-6 md:px-8 lg:px-10">
      {/* == Logo == */}
      <div className="flex flex-row gap-2 items-center my-2">
        <NextImage src="/assets/images/movies-sm.webp" width="25" height="25" alt="" loading="lazy" />
        <div className="text-xl">
          {APP_INFO.name}
        </div>
      </div>
      {/* == Copyright == */}
      <div className="flex gap-2 items-center">
        <div className="opacity-50 text-sm">
          {$t("made_by")}
        </div>
        <a href={APP_INFO.portfolio} target="_blank" title="Mahmoud Elfarargy" className="text-sm">
          Mahmoud Elfarargy &copy;
        </a>
      </div>
      {/* == TMDB == */}
      <div className="flex gap-2 items-center">
        <div className="opacity-50 text-sm">
          {$t("data_provided_by")}
        </div>
        <a href='https://www.themoviedb.org/' target="_blank" rel="noopener" title="The Movie Database" className="text-sm opacity-100">
          <IconTMDB className="inline h-4"/>
        </a>
      </div>
      {/* == Disclaimer == */}
      <div className="flex gap-2 items-center">
        <div className="text-offGray text-sm">
          {$t("disclaimer")}
        </div>
      </div>
      <div>
        {/* Language Changer */}
        <label className="me-2">
          { $t('language')}
        </label>
        <LanguageSwitcher />
      </div>
    </footer>
  )
}
