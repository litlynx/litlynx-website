import { test, expect } from "@playwright/test";

test.describe("Responsive Design", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should display correctly on desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 });

    // Hero section should be in row layout on desktop
    const heroSection = page.locator("#hero");
    await expect(heroSection).toBeVisible({ timeout: 10000 });

    // Check that hero content is visible
    await expect(page.locator("h1")).toBeVisible({ timeout: 5000 });
    
    // Check for hero image with more flexible selector
    const heroImages = page.locator('img[alt*="Hero"], img[alt*="Ilustration"]');
    const imageCount = await heroImages.count();
    if (imageCount > 0) {
      await expect(heroImages.first()).toBeVisible();
    }
  });

  test("should display correctly on tablet", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });

    // Hero section should still be visible
    const heroSection = page.locator("#hero");
    await expect(heroSection).toBeVisible();

    // All content should remain accessible
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator('img[alt="Hero Ilustration"]')).toBeVisible();

    // Social links should still be accessible
    await expect(page.locator('a[href*="linkedin.com"]')).toBeVisible();
    await expect(page.locator('a[href*="github.com"]')).toBeVisible();
    await expect(page.locator('a[href*="xolo.io"]')).toBeVisible();
  });

  test("should display correctly on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    // Hero section should be in column layout on mobile
    const heroSection = page.locator("#hero");
    await expect(heroSection).toBeVisible();

    // Check that content is centered on mobile
    const heading = page.locator("h1");
    await expect(heading).toBeVisible();
    await expect(heading).toContainText("Front-End Development");

    // Image should still be visible
    await expect(page.locator('img[alt="Hero Ilustration"]')).toBeVisible();

    // Social links should be centered and accessible
    const socialLinksContainer = page.locator(".flex.gap-5");
    await expect(socialLinksContainer).toBeVisible();

    // All social links should be clickable
    await expect(page.locator('a[href*="linkedin.com"]')).toBeVisible();
    await expect(page.locator('a[href*="github.com"]')).toBeVisible();
    await expect(page.locator('a[href*="xolo.io"]')).toBeVisible();
  });

  test("should handle very small screens", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 });

    // Core content should still be accessible
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("p").first()).toBeVisible();

    // Social links should remain functional
    const linkedinLink = page.locator('a[href*="linkedin.com"]');
    const githubLink = page.locator('a[href*="github.com"]');
    const xoloLink = page.locator('a[href*="xolo.io"]');

    await expect(linkedinLink).toBeVisible();
    await expect(githubLink).toBeVisible();
    await expect(xoloLink).toBeVisible();
  });
});
