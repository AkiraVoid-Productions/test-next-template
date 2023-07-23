import { expect, test } from '@playwright/test';

test.describe('Fluent UI', () => {
  test.use({ javaScriptEnabled: false });
  test('loaded', async ({ page }) => {
    await page.goto('/');
    const fluentProvider = page.locator('.fui-FluentProvider');
    await fluentProvider.focus();
    expect(fluentProvider).toHaveCSS(
      '--colorNeutralBackground1',
      /^#[0-9a-fA-F]{6}$/
    );
  });
});
