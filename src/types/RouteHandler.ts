import { NextRequest, NextResponse } from 'next/server';

import RouteParams from './RouteParams';

/**
 * Represents the context of a request. Currently, the only value of context is
 * params, which is an object containing the dynamic route parameters for the
 * current route.
 *
 * @template T The type of dynamic route parameters.
 */
export type RouteHandlerContext<
  T extends Record<string, string | string[]> = {}
> = {
  /** An object containing the dynamic route parameters for the current route. */
  params: RouteParams<T>;
};

/**
 * Represents a custom handler handling route requests.
 *
 * @template TBody The type of response body.
 * @template TRouteParams The type of dynamic route parameters.
 */
interface RouteHandler<
  TBody = unknown,
  TRouteParams extends Record<string, string | string[]> = {}
> {
  /**
   * Handle route request.
   *
   * @memberof RouteHandler
   * @param {NextRequest} request An extension of the Web Request API.
   * @param {RouteHandlerContext<TRouteParams>} context The context of a
   *   request.
   * @returns {NextResponse<TBody>} An extension of the Web Response API.
   */
  (
    request: NextRequest,
    context: RouteHandlerContext<TRouteParams>
  ): NextResponse<TBody>;
}

export default RouteHandler;
