import createMiddleware from 'next-intl/middleware';
import availableLocales from "@/internationalization/locales.generated.json";

export default createMiddleware({
  locales: availableLocales,
  defaultLocale: 'en',
  // Pathnames that should not be localized (e.g. static files, API, etc.)
  pathnames: {
    // exceptions
  }
});
 
export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};