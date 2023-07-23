import { getSiteConfiguration } from '@/utilities/configuration';
import { expect, Page, test } from '@playwright/test';

const config = getSiteConfiguration();
const localeRegex = /^\/([a-zA-Z0-9\-]+)\/?/;

async function specifyLocaleAsync(page: Page, locale: string) {
  await page.route('**/*', async (route, request) => {
    await route.continue({
      headers: {
        ...(await request.allHeaders()),
        'accept-language': locale,
      },
    });
  });
}

function getAcceptedLanguages() {
  let languages: string[] = [];
  let priority = 1;
  for (const locale of config.locales) {
    priority === 1
      ? languages.push(locale)
      : languages.push(`${locale};q=${priority}`);
    if (priority > 0.1) {
      priority -= 0.1;
    }
  }

  languages.push('*;q=0.1');
  return languages.join(', ');
}

function getLocaleFromUrl(url: URL) {
  const localeMatches = localeRegex.exec(url.pathname);
  if (localeMatches) {
    return localeMatches[1];
  } else {
    return undefined;
  }
}

test.describe('Locale auto-detection', () => {
  test('redirects to URL with most proper locale when no locale is provided', async ({
    page,
  }) => {
    await test.step('specify available locales', async () =>
      await specifyLocaleAsync(page, getAcceptedLanguages()));
    await test.step('redirect to a URL without locale', async () =>
      await page.goto('/'));
    await test.step('check if the final URL contains locale', () => {
      const url = new URL(page.url());
      const urlLocale = getLocaleFromUrl(url);
      expect(urlLocale).toBe(config.locales[0]);
    });
  });

  if (config.locales.length > 1) {
    test('respect user-specified locale', async ({ page }) => {
      await test.step('specify available locales', async () =>
        await specifyLocaleAsync(page, getAcceptedLanguages()));
      await test.step('redirect to a URL with locale which is not the locale with highest priority', async () =>
        await page.goto(`/${config.locales[1]}`));
      await test.step('check if the final URL contains user-specified locale', () => {
        const url = new URL(page.url());
        const urlLocale = getLocaleFromUrl(url);
        expect(urlLocale).toBe(config.locales[1]);
      });
    });
  }

  /**
   * FIXME - Webkit products will always try to add user's locale of current
   * machine settings to `Accept-Language` header. For example, in this test,
   * only HTTP request sent by Webkit browsers will result in a
   * `Accept-Language` header with value like `unavailable-locale, zh-CN`.
   */
  test.fixme(
    'redirects to default locale if user requested an unavailable locale',
    async ({ page }) => {
      await test.step('redirect to a URL without locale', async () =>
        await page.goto('/'));
      await test.step('check if the final URL contains default locale', () => {
        const url = new URL(page.url());
        const urlLocale = getLocaleFromUrl(url);
        expect(urlLocale).toBe(config.defaultLocale);
      });
    }
  );
});

test.describe('Redirecting', () => {
  test('preserve path and search parameters', async ({ page }) => {
    const testPath = '/test/path';
    const testSearchParameters = '?s=test';
    await test.step('specify available locales', async () =>
      await specifyLocaleAsync(page, getAcceptedLanguages()));
    await test.step('redirect to a URL with path and search parameters', async () =>
      await page.goto(`${testPath}${testSearchParameters}`));
    await test.step('check if the final URL contains path and search parameters', () => {
      const url = new URL(page.url());
      expect(url.pathname).toBe(`/${config.locales[0]}${testPath}`);
      expect(url.search).toBe(testSearchParameters);
    });
  });
});
