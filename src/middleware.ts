import { NextRequest } from 'next/server';

import Middleware from './helpers/Middleware';
import i18nRedirectionMiddleware from './middleware/i18nRedirectionMiddleware';

export default async function middleware(request: NextRequest) {
  return await new Middleware(request)
    .use(i18nRedirectionMiddleware, { ignoredPathnames: ['/sitemap.xml'] })
    .invokeAsync();
}

export const config = {
  matcher: ['/((?!_next).*)'],
};
