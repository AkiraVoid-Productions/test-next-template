import Middleware from '@/helpers/Middleware';
import MiddlewareHandler from '@/types/MiddlewareHandler';
import { expect, test } from '@playwright/test';
import { NextRequest } from 'next/server';

const invokedMiddleware: string[] = [];
let middlewareOptions: Record<string, string> | undefined = undefined;
const invokedMiddlewareWithInterruption: string[] = [];

const testMiddleware1: MiddlewareHandler = async (_, invokeNext) => {
  invokedMiddleware.push('testMiddleware1');
  return await invokeNext();
};

const testMiddleware2: MiddlewareHandler = async (_, invokeNext) => {
  invokedMiddleware.push('testMiddleware2');
  return await invokeNext();
};

const testInterruptionMiddleware: MiddlewareHandler = async (_r, _i) => {
  invokedMiddlewareWithInterruption.push('testInterruptionMiddleware');
};

const testMiddlewareWithOptions: MiddlewareHandler<
  unknown,
  Record<string, string>
> = async (_r, invokeNext, options) => {
  middlewareOptions = options;
  return await invokeNext();
};

test.describe('Middleware helper', () => {
  const request = new NextRequest(new URL('http://example.com/'));

  test('calls middleware in the order of they were used', async () => {
    await new Middleware(request)
      .use(testMiddleware1)
      .use(testMiddleware2)
      .invokeAsync();
    expect(invokedMiddleware).toHaveLength(2);
    expect(invokedMiddleware[0]).toBe('testMiddleware1');
    expect(invokedMiddleware[1]).toBe('testMiddleware2');
  });

  test('calls middleware with options', async () => {
    const testOptions = {
      test: 'test',
    };
    await new Middleware(request)
      .use(testMiddlewareWithOptions, testOptions)
      .invokeAsync();
    expect(middlewareOptions).toBe(testOptions);
  });

  test('can be interrupted in middleware', async () => {
    await new Middleware(request)
      .use(testInterruptionMiddleware)
      .use(testMiddleware1)
      .invokeAsync();
    expect(invokedMiddlewareWithInterruption).toHaveLength(1);
    expect(invokedMiddlewareWithInterruption[0]).toBe(
      'testInterruptionMiddleware'
    );
  });
});
