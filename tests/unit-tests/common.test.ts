import LanguageCode from '@/types/LanguageCode';
import {
  combinePaths,
  getPageAlternates,
  removeLeadingSlashes,
  removeTrailingSlashes,
} from '@/utilities/common';
import { getSiteConfiguration } from '@/utilities/configuration';
import { expect, test } from '@playwright/test';

const config = getSiteConfiguration();

test.describe('Paths combination tool', () => {
  test('combines multiple parts of path into path', () => {
    const path = combinePaths('a', 'b', 'c');
    expect(path).toBe('a/b/c');
  });

  test('does not add leading slash if first part of path is not given with leading slash', () => {
    const path = combinePaths('a', 'b', 'c');
    expect(path).toBe('a/b/c');
  });

  test('preserves leading slash if first part of path is given with leading slash', () => {
    const path = combinePaths('/a', 'b', 'c');
    expect(path).toBe('/a/b/c');
  });

  test('removes trailing slash', () => {
    const path = combinePaths('a', 'b', 'c/');
    expect(path).toBe('a/b/c');
  });

  test('produces consistent result without regarding to the leading slash and trailing slash existence of any part except first part of path', () => {
    let path = combinePaths('a', 'b', 'c/');
    expect(path).toBe('a/b/c');

    path = combinePaths('a', 'b/', 'c');
    expect(path).toBe('a/b/c');

    path = combinePaths('a', '/b/', 'c');
    expect(path).toBe('a/b/c');

    path = combinePaths('a', 'b', 'c');
    expect(path).toBe('a/b/c');

    path = combinePaths('a', 'b', '/c');
    expect(path).toBe('a/b/c');

    path = combinePaths('a', 'b', '/c/');
    expect(path).toBe('a/b/c');
  });
});

test.describe('Trailing slash removing tool', () => {
  test('removes all trailing slash of given slash', () => {
    expect(removeTrailingSlashes('a///')).toBe('a');
  });

  test("returns the given string as is if there's no trailing slash", () => {
    expect(removeTrailingSlashes('b')).toBe('b');
  });

  test('will not throw if empty string was given', () => {
    expect(() => removeTrailingSlashes('')).not.toThrow();
  });
});

test.describe('Leading slash removing tool', () => {
  test('removes all leading slash of given slash', () => {
    expect(removeLeadingSlashes('///a')).toBe('a');
  });

  test("returns the given string as is if there's no leading slash", () => {
    expect(removeLeadingSlashes('b')).toBe('b');
  });

  test('will not throw if empty string was given', () => {
    expect(() => removeLeadingSlashes('')).not.toThrow();
  });
});

test.describe('Localized page alternates generating tool', () => {
  const currentLocale = config.locales[0];
  const pageRoute = '/test/route';
  const alternates = getPageAlternates(currentLocale, pageRoute);

  test('generates the canonical path', () => {
    expect(alternates.canonical).toBeTruthy();
  });

  test('generates alternates if there are other locales', () => {
    if (config.locales.length > 1) {
      expect(alternates.languages).toHaveProperty(
        config.locales.filter(locale => locale !== currentLocale)
      );
    }
  });

  test('generates URLs with configured host', () => {
    expect(alternates.canonical).toMatch(new RegExp(`^${config.host}`));
    if (alternates.languages) {
      for (const languageCode in alternates.languages) {
        const language = alternates.languages[languageCode as LanguageCode];
        expect(language).toMatch(new RegExp(`^${config.host}`));
      }
    }
  });

  test('adds current locale to canonical path', () => {
    expect(alternates.canonical).toBe(
      combinePaths(config.host, currentLocale, pageRoute)
    );
  });

  test('generates alternates with locales added to URLs', () => {
    if (config.locales.length > 1) {
      for (const languageCode in alternates.languages) {
        const language = alternates.languages[languageCode as LanguageCode];
        expect(language).toBe(
          combinePaths(config.host, languageCode, pageRoute)
        );
      }
    }
  });
});
