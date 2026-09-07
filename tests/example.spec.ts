import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('push button start', async ({ page }) => {
  await page.goto('https://www.mercadolibre.com.co/')
  await page.locator('#cb1-edit').fill('iphone')
  await page.keyboard.press('Enter')

  await page.waitForURL(/listado\.mercadolibre\.com\.co|account-verification/, {
    timeout: 30_000,
  })

  if (page.url().includes('/account-verification')) {
    test.skip(true, 'MercadoLibre solicito verificacion para este runner')
  }

  await expect(page.locator('ol.ui-search-layout')).toBeVisible()
  //await page.pause()
  const titles = await page.locator('ol.ui-search-layout li h3').allTextContents()
  for (let title of titles) {
    console.log('Title is:', title)
  }
});