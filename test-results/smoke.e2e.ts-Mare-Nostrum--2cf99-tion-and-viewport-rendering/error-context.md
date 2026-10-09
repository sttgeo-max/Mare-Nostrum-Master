# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: smoke.e2e.ts >> Mare Nostrum II Smoke & Regression Tests >> map initialization and viewport rendering
- Location: qa/e2e/smoke.e2e.ts:10:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('#map-main-scroll-viewport').first()
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" locator('#map-main-scroll-viewport').first() with timeout 5000ms
  - waiting for locator('#map-main-scroll-viewport').first()

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Mare Nostrum II Smoke & Regression Tests', () => {
  4  |   test('application loads and mounts root container', async ({ page }) => {
  5  |     await page.goto('/');
  6  |     const root = page.locator('#root');
  7  |     await expect(root).toBeAttached();
  8  |   });
  9  | 
  10 |   test('map initialization and viewport rendering', async ({ page }) => {
  11 |     await page.goto('/');
  12 |     const mapViewport = page.locator('#map-main-scroll-viewport').first();
> 13 |     await expect(mapViewport).toBeVisible();
     |                               ^ Error: expect(locator).toBeVisible() failed
  14 |   });
  15 | });
  16 | 
```