import RouteParams from './RouteParams';

/**
 * Represents the props of a page component.
 *
 * @template TSearchParams The type of search parameters.
 * @template TRouteParams The type of additional dynamic route parameters except
 *   `locale`.
 */
type PageProps<
  TSearchParams extends
    | Record<string, string | string[]>
    | undefined = undefined,
  TRouteParams extends Record<string, string | string[]> = {}
> = {
  /**
   * An object containing the dynamic route parameters from the root segment
   * down to that page.
   */
  params: RouteParams<TRouteParams>;
  /** An object containing the search parameters of the current URL. */
  searchParams: TSearchParams;
};

export default PageProps;
