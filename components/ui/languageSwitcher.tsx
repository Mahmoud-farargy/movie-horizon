"use client"
import { useRouter, usePathname } from "next/navigation"
import { useLocale } from "next-intl"
import { useCallback, useMemo } from "react"
import { LOCALES } from "@/helpers/constants/languages"
import availableLocales from "@/internationalization/locales.generated.json"

export default function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const currentLocale = useLocale()

  const handleChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value
    const segments = pathname.split("/")
    segments[1] = newLocale
    const newPath = segments.join("/")

    router.replace(newPath)
    router.refresh();
  }, [pathname, router]);
  const languageOptions = useMemo(() => {
    return LOCALES.filter((localeItem) =>
      availableLocales.some((langID) => localeItem.iso_639_1 === langID)
    )
  }, [])

  return (
    <select
      value={currentLocale}
      onChange={handleChange}
      className="rounded-sm py-1 px-2"
    >
      {languageOptions?.map((languageItem) => (
        <option key={languageItem.iso_639_1} value={languageItem.iso_639_1}>
          {languageItem.english_name}
        </option>
      ))}
    </select>
  )
}
