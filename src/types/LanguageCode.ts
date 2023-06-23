import { AlternateURLs } from 'next/dist/lib/metadata/types/alternative-urls-types';

/** Represents a code of one of all supported languages. */
type LanguageCode = keyof Omit<
  Exclude<AlternateURLs['languages'], undefined>,
  'x-default'
>;

export default LanguageCode;
