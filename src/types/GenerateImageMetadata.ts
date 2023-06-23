import ImageMetadata from './ImageMetadata';
import RouteParams from './RouteParams';

/**
 * Represents a function to generates a series of image metadata which are
 * usually used to provide better SEO experience.
 *
 * @template T The type of available dynamic routes.
 */
interface GenerateImageMetadata<
  T extends Record<string, string | string[]> = {}
> {
  /**
   * Generates a series of image metadata which are usually used to provide
   * better SEO experience.
   *
   * @memberof GenerateImageMetadata
   * @param {RouteParams<T>} props An object containing the [dynamic route
   *   parameters](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes)
   *   object from the root segment down to the segment `generateImageMetadata`
   *   is called from.
   * @returns {ImageMetadata[]} An array of objects containing the image's
   *   metadata such as alt and size.
   */
  (props: RouteParams<T>): ImageMetadata[];
}

export default GenerateImageMetadata;
