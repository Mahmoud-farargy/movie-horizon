"use client";
import NextLink from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import { memo } from "react";

function NavBar() {
  const locale = useLocale(); 
  const $t = useTranslations();
  const pathname = usePathname();

  const activePath = pathname.replace(`/${locale}`, "") || "/";
  const isRouteActive = (route: string): boolean => {
    return activePath === route;
  }
  return (
    <aside className="fixed z-[10] lg:z-auto lg:relative bottom-0 w-full lg:w-max lg:h-full bg-black py-[1rem] md:py-[1.25rem] md:p-[1.25rem] border-t lg:order-[-100] lg:border-r border-mainBorder ">
      <ul className="flex row lg:flex-col justify-evenly h-full">
        <li>
          <NextLink href={`/${locale}`} title={$t("home")}>
            <Icon icon={`ph:house${isRouteActive("/") ? "-fill": ""}`} className={`${isRouteActive("/") ? "text-primary": ""} transition-colors duration-150 text-3xl`} />
          </NextLink>
        </li>
        <li>
          <NextLink href={`/${locale}/movie`} title={$t("movies")}>
            <Icon icon={`ph:film-strip${isRouteActive("/movie") ? "-fill": ""}`}  className={`${isRouteActive("/movie") ? "text-primary": ""} transition-colors duration-150 text-3xl`}/>
          </NextLink>
        </li>
        <li>
          <NextLink href={`/${locale}/tv`} title={$t("tv_shows")}>
            <Icon icon={`ph:television-simple${isRouteActive("/tv") ? "-fill": ""}`}  className={`${isRouteActive("/tv") ? "text-primary": ""} transition-colors duration-150 text-3xl`}/>
          </NextLink>
        </li>
        <li>
          <NextLink href={`/${locale}/search`} title={$t("search")}>
            <Icon icon={`ph:magnifying-glass${isRouteActive("/search") ? "-fill": ""}`}  className={`${isRouteActive("/search") ? "text-primary": ""} transition-colors duration-150 text-3xl`}/>
          </NextLink>
        </li>
      </ul>
    </aside>
  );
}
export default memo(NavBar);