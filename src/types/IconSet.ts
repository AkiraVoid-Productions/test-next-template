/**
 * Represents a set of icons.
 *
 * @export
 * @interface IIconSet
 */
export interface IIconSet {
  /** Icon of type SVG. */
  svg?: string;
}

/**
 * Represents a set of icons in different sizes.
 *
 * The size of an icon indicates the number of horizontal pixels for a portrait
 * icon, or the number of vertical pixels for a landscape icon.
 *
 * @export
 * @interface IIconSet
 */
export type CustomizedIconSet = IIconSet & {
  /** Icon of specified size. */
  [size: number]: string | undefined;
};

/**
 * Represents a set of icons in most common sizes.
 *
 * The size of an icon indicates the number of horizontal pixels for a portrait
 * icon, or the number of vertical pixels for a landscape icon.
 *
 * @export
 * @interface IIconSet
 */
export type CommonIconSet = IIconSet & {
  /** The icon of size 16px. */
  16?: string;
  /** The icon of size 20px. */
  20?: string;
  /** The icon of size 24px. */
  24?: string;
  /** The icon of size 32px. */
  32?: string;
  /** The icon of size 40px. */
  40?: string;
  /** The icon of size 48px. */
  48?: string;
  /** The icon of size 60px. */
  60?: string;
  /** The icon of size 64px. */
  64?: string;
  /** The icon of size 72px. */
  72?: string;
  /** The icon of size 80px. */
  80?: string;
  /** The icon of size 96px. */
  96?: string;
  /** The icon of size 256px. */
  256?: string;
};

export default CommonIconSet;
