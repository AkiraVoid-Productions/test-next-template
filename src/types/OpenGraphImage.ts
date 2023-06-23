import { ImageResponse } from 'next/server';

import RouteParams from './RouteParams';

/**
 * Represents a component for generating OpenGraph image.
 *
 * @template T The type of additional dynamic route parameters except `locale`.
 */
interface OpenGraphImage<T extends Record<string, string | string[]> = {}> {
  /**
   * Generate OpenGraph image for this route.
   *
   * @memberof OpenGraphImage
   * @param props The props of this component.
   * @returns Generated OpenGraph image.
   */
  (props: { params: RouteParams<T> }): ImageResponse | Promise<ImageResponse>;
}

export default OpenGraphImage;
