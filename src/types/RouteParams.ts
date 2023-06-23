import LanguageCode from './LanguageCode';

/**
 * Represents the dynamic route parameters of a route.
 *
 * @template T The type of additional dynamic route parameters except `locale`.
 */
type RouteParams<T extends Record<string, string | string[]> = {}> = T & {
  /** The locale of requested route. */
  locale: LanguageCode;
};

export default RouteParams;
