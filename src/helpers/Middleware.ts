import { NextRequest, NextResponse } from 'next/server';

import MiddlewareHandler from '@/types/MiddlewareHandler';

/**
 * Help manage middleware and invoke them in order.
 *
 * @class Middleware
 */
class Middleware {
  private readonly _handlers: {
    handler: MiddlewareHandler<any, any>;
    options: any;
  }[] = [];
  private readonly _request: NextRequest;
  private _invokedMiddleware = -1;

  /**
   * Initializes a new instance of the `Middleware` class.
   *
   * @param request The request sended by user.
   */
  constructor(request: NextRequest) {
    this._request = request;
  }

  /**
   * Use a new middleware to process the request.
   *
   * @param handler The middleware to be used.
   * @param options The options of this middleware.
   * @returns This instance.
   */
  use<T extends MiddlewareHandler<any, any>>(
    handler: T,
    options?: T extends MiddlewareHandler<any, infer TOptions>
      ? TOptions
      : undefined
  ) {
    this._handlers.push({ handler, options });
    return this;
  }

  /**
   * Invoke middleware in pool in order to process request.
   *
   * @returns The result of processing.
   */
  async invokeAsync(): Promise<NextResponse<any> | undefined> {
    const nextHandlerIndex = this._invokedMiddleware + 1;
    if (nextHandlerIndex >= this._handlers.length) {
      return;
    }

    const nextHandler = this._handlers[nextHandlerIndex];

    const invokeNext = async () => {
      return await this.invokeAsync();
    };

    this._invokedMiddleware++;
    return await nextHandler.handler(
      this._request,
      invokeNext,
      nextHandler.options
    );
  }
}

export default Middleware;
