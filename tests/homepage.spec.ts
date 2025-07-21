import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should load the homepage successfully", async ({ page }) => {
    // Wait for the page to load
    await page.waitForLoadState("domcontentloaded");

    // Check if the page title is correct
    await expect(page).toHaveTitle(/Litlynx/, { timeout: 10000 });

    // Check if main heading is visible
    const heading = page.locator("h1");
    await expect(heading).toBeVisible({ timeout: 10000 });
    await expect(heading).toContainText("Front-End Development");
    await expect(heading).toContainText("for your company");
  });

  test("should have correct meta description", async ({ page }) => {
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute(
      "content",
      /Litlynx is your trusted partner for modern frontend web development/
    );
  });

  test("should display hero section with proper content", async ({ page }) => {
    const heroSection = page.locator("#hero");
    await expect(heroSection).toBeVisible();

    // Check hero heading
    await expect(page.locator("h1")).toContainText("Front-End Development");

    // Check hero description
    const description = page.locator("p").first();
    await expect(description).toContainText(
      "Litlynx is your trusted partner for modern frontend web development"
    );

    // Check hero image is loaded
    const heroImage = page.locator('img[alt="Hero Ilustration"]');
    await expect(heroImage).toBeVisible();
    await expect(heroImage).toHaveAttribute("src", /unsplash/);
  });

  test("should have working social media links", async ({ page }) => {
    // LinkedIn link
    const linkedinLink = page.locator(
      'a[href*="linkedin.com/in/jorge-miranda-dev"]'
    );
    await expect(linkedinLink).toBeVisible();
    await expect(linkedinLink).toHaveAttribute("target", "_blank");

    // GitHub link
    const githubLink = page.locator('a[href*="github.com/litlynx"]');
    await expect(githubLink).toBeVisible();
    await expect(githubLink).toHaveAttribute("target", "_blank");

    // Xolo link
    const xoloLink = page.locator(
      'a[href*="app.xolo.io/profile/jorgemiranda"]'
    );
    await expect(xoloLink).toBeVisible();
    await expect(xoloLink).toHaveAttribute("target", "_blank");
  });

  test("should have working social media link interactions", async ({
    page,
  }) => {
    // Test hover effects on social links
    const linkedinLink = page.locator(
      'a[href*="linkedin.com/in/jorge-miranda-dev"]'
    );
    await linkedinLink.hover();

    const githubLink = page.locator('a[href*="github.com/litlynx"]');
    await githubLink.hover();

    const xoloLink = page.locator(
      'a[href*="app.xolo.io/profile/jorgemiranda"]'
    );
    await xoloLink.hover();

    // All links should still be visible after hover
    await expect(linkedinLink).toBeVisible();
    await expect(githubLink).toBeVisible();
    await expect(xoloLink).toBeVisible();
  });
});
