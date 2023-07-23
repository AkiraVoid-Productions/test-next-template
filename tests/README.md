# Project Tests

This project uses [Playwright](https://playwright.dev) as a testing framework.

## Structure

In this directory:

- `components` is used to store component-related tests, which may be Component Tests or unit tests of React Hooks.
- `e2e` is used to store End-to-End tests, which simulate as a browser or a user to browse a page and run defined tests.
- `unit-tests` is used to store Unit Tests which do not need browser environment or do not need to assuming the UI/UX experiences.

## Configure Playwright

You can configure the global configuration of Playwright by editing `/playwright.config.ts`. [Read more](https://playwright.dev/docs/test-configuration).

## Notes

- The Component Test (CT) support of Playwright is currently experimental, enable it by using `@playwright/experimental-ct-react`. [Read more](https://playwright.dev/docs/test-components).
