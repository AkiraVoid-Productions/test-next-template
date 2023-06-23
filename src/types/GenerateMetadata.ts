import { Metadata, ResolvingMetadata } from 'next';

/**
 * Represents a function used to generate metadata about this route.
 *
 * @template T The type of props of the main component of the route.
 */
interface GenerateMetadata<T> {
  /**
   * Generate metadata about this route.
   *
   * @memberof GenerateMetadata
   * @param {T} props An object containing the parameters of the current route.
   * @param {ResolvingMetadata} parent A promise of the resolved metadata from
   *   parent route segments.
   * @returns {Metadata | Promise<Metadata>} A Metadata object containing one or
   *   more metadata fields.
   */
  (props: T, parent: ResolvingMetadata): Metadata | Promise<Metadata>;
}

export default GenerateMetadata;
