import Negotiator from 'negotiator';
import { NextResponse } from 'next/server';

import MiddlewareHandler from '@/types/MiddlewareHandler';
import { getSiteConfiguration } from '@/utilities/configuration';
import { match } from '@formatjs/intl-localematcher';

const siteConfig = getSiteConfiguration();

type Options = {
  /**
   * The pathnames that should be bypassed by this middleware. Can be string for
   * fully qualified pathnames or regular expressions to match.
   */
  ignoredPathnames?: (string | RegExp)[];
};

/** Provides request locale auto-detection and auto-redirection functionalities. */
const i18nRedirectionMiddleware: MiddlewareHandler<unknown, Options> = async (
  request,
  invokeNext,
  options
) => {
  const pathname = request.nextUrl.pathname;
  if (options?.ignoredPathnames) {
    for (const ignored of options.ignoredPathnames) {
      if (
        (typeof ignored === 'string' && ignored === pathname) ||
        (typeof ignored === 'object' && ignored.test(pathname))
      ) {
        return await invokeNext();
      }
    }
  }

  const pathnameIsMissingLocale = siteConfig.locales.every(
    locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const headerLanguages = new Negotiator({
      headers: {
        'accept-language': request.headers.get('accept-language') ?? undefined,
      },
    }).languages();
    const locale = match(
      headerLanguages,
      siteConfig.locales,
      siteConfig.defaultLocale
    );
    return NextResponse.redirect(
      new URL(`/${locale}/${pathname}`, request.url)
    );
  }

  return await invokeNext();
};

export default i18nRedirectionMiddleware;
