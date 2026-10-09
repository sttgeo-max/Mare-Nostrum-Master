import { test, expect } from '@playwright/test';

test.describe('Mare Nostrum II Smoke & Regression Tests', () => {
  test('application loads and mounts root container', async ({ page }) => {
    await page.goto('/');
    const root = page.locator('#root');
    await expect(root).toBeAttached();
  });

  test('map initialization and viewport rendering', async ({ page }) => {
    await page.goto('/');
    const mapViewport = page.locator('#map-main-scroll-viewport').first();
    await expect(mapViewport).toBeVisible();
  });
});
