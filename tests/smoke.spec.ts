import { expect, test } from '@playwright/test';

test.describe('public smoke flows', () => {
  test('loads primary public pages', async ({ page }) => {
    for (const path of ['/', '/contact', '/gallery', '/blog', '/services']) {
      await page.goto(path, { waitUntil: 'domcontentloaded', timeout: 15_000 });
      await expect(page.locator('body')).toBeVisible();
      await expect(page.locator('main').first()).toBeVisible();
    }
  });

  test('contact page exposes inquiry and direct contact flows', async ({ page }) => {
    await page.goto('/contact');

    await expect(page.getByRole('button', { name: /inquiry/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /continue/i })).toBeDisabled();

    await page.getByRole('button', { name: /direct/i }).click();
    await expect(page.getByRole('link', { name: /email|communication|@/i }).first()).toBeVisible();
  });

  test('services page keeps a primary CTA reachable', async ({ page }) => {
    await page.goto('/services');
    await expect(page.getByRole('link', { name: /contact|book|start|work/i }).first()).toBeVisible();
  });
});
