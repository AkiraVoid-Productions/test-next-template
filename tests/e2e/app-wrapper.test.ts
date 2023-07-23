import UserConfiguration from '@/types/UserConfiguration';
import { defaultUserConfiguration } from '@/utilities/configuration';
import { Browser, expect, test } from '@playwright/test';

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

test.describe('User configuration', () => {
  test('initialized', async ({ page, context }) => {
    await page.goto('/');
    const origins = (await context.storageState()).origins;
    let userConfigurationStorage: string | null = null;
    for (const origin of origins) {
      for (const storage of origin.localStorage) {
        if (storage.name === 'userConfiguration') {
          userConfigurationStorage = storage.value;
          break;
        }
      }

      if (userConfigurationStorage !== null) {
        break;
      }
    }

    expect(userConfigurationStorage).not.toBeNull();
    const userConfiguration = JSON.parse(
      userConfigurationStorage as string
    ) as UserConfiguration;
    expect(userConfiguration).toEqual(defaultUserConfiguration);
  });
});
