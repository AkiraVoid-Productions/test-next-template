import { defineConfig, devices } from '@playwright/test';

/**
 * A value indicates whether the test is running in CI environment or not.
 *
 * @note The `!` operator in JavaScript will turns the type of variables to
 *   boolean. For any variable who has a falsy semantic, it will be turned to
 *   `false` of boolean type, and since the meaning of `!` operator is getting
 *   the opposite of a boolean value, the expression `!variable` will returns
 *   `true` if it's a value with falsy semantic. In CI environment the value of
 *   CI environment variable will be set to 1, true, etc., of string type, so
 *   we need to turn it to `true` of boolean type. To achieve this, we use `!`
 *   twice, which means turning the string to boolean by its semantic (implicit
 *   behavior of first `!`, and in JavaScript, the only string which will be
 *   considered falsy is `""`), getting the opposite value (behavior of first
 *   `!`, at this point, the result is `true` if we are not in CI, otherwise
 *   `false`) and getting the opposite value again (behavior of second `!`, we
 *   finally get the CI environment variable of boolean type).
 */
const isCi = !!process.env.CI;

export default defineConfig({
  testDir: 'tests',
  fullyParallel: true,
  forbidOnly: isCi,
  retries: isCi ? 3 : 0,
  workers: isCi ? 1 : undefined,
  reporter: isCi ? 'dot' : 'html',
  use: {
    baseURL: 'http://127.0.0.1:3000',
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'Desktop(Chromium)',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Desktop(Firefox)',
      use: { ...devices['Desktop Firefox'] },
    },
    { name: 'Desktop(Safari)', use: { ...devices['Desktop Safari'] } },
    { name: 'Mobile', use: { ...devices['iPhone 13'] } },
    { name: 'Mobile Landscape', use: { ...devices['iPhone 13 landscape'] } },
    { name: 'Tablet', use: { ...devices['iPad (gen 7)'] } },
    { name: 'Tablet Landscape', use: { ...devices['iPad (gen 7) landscape'] } },
    { name: 'Mini Tablet', use: { ...devices['iPad Mini'] } },
    {
      name: 'Mini Tablet Landscape',
      use: { ...devices['iPad Mini landscape'] },
    },
  ],
  webServer: {
    command: 'yarn dev',
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: !isCi,
  },
});
