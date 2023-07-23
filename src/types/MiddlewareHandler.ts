import { NextRequest, NextResponse } from 'next/server';

/**
 * Represents a middleware handler.
 *
 * @template TBody The type of response body.
 * @template TOptions The type of options of this middleware.
 */
interface MiddlewareHandler<
  TBody = unknown,
  TOptions extends Record<string, any> | undefined = undefined
> {
  /**
   * Handle request as a middleware.
   *
   * @memberof MiddlewareHandler
   * @param {NextRequest} request The request to be handled.
   * @param {() => Promise<NextResponse<TBody> | undefined>} invokeNext Invoke
   *   next middleware in middleware pool.
   * @returns {Promise<NextResponse<TBody> | undefined>} The response if request
   *   need to be response immediately, or `undefined` to continue.
   */
  (
    request: NextRequest,
    invokeNext: () => Promise<NextResponse<TBody> | undefined | void>,
    options?: TOptions
  ): Promise<NextResponse<TBody> | undefined | void>;
}

export default MiddlewareHandler;
