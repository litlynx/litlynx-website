import { test, expect } from "@playwright/test";

test.describe("Smoke Tests", () => {
  test("basic page load test", async ({ page }) => {
    await page.goto("/");

    // Wait for the page to load
    await page.waitForLoadState("networkidle");

    // Check if we can find the main heading
    const heading = page.locator("h1");
    await expect(heading).toBeVisible({ timeout: 10000 });

    // Check if the page has a title
    await expect(page).toHaveTitle(/.+/);

    console.log("Page loaded successfully");
  });

  test("verify Astro development server is running", async ({ page }) => {
    const response = await page.goto("/");
    expect(response?.status()).toBe(200);
  });
});
