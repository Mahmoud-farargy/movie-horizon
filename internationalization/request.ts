import {getRequestConfig} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import availableLocales from "@/internationalization/locales.generated.json"

const routing = {
  locales: availableLocales,
  defaultLocale: 'en'
}
export default getRequestConfig(async ({requestLocale}) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;
 
  return {
    locale,
    messages: (await import(`./locales/${locale}.json`)).default
  };
});