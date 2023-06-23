import { PropsWithChildren } from 'react';

import RouteParams from './RouteParams';

/**
 * Represents the props of a layout component.
 *
 * @template T The type of additional dynamic route parameters except `locale`.
 */
type LayoutProps<T extends Record<string, string | string[]> = {}> =
  PropsWithChildren<{
    /**
     * The dynamic route parameters object from the root segment down to that
     * layout.
     */
    params: RouteParams<T>;
  }>;

export default LayoutProps;
