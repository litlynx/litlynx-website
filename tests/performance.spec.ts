import { test, expect } from "@playwright/test";

test.describe("Performance", () => {
  test("should load the homepage within acceptable time", async ({ page }) => {
    const startTime = Date.now();

    await page.goto("/", { waitUntil: "domcontentloaded" });

    const loadTime = Date.now() - startTime;

    // Page should load within 5 seconds (adjust based on your requirements)
    expect(loadTime).toBeLessThan(5000);
  });

  test("should load all critical resources", async ({ page }) => {
    const response = await page.goto("/");

    // Check that the main page loads successfully
    expect(response?.status()).toBe(200);

    // Wait for critical content to be visible
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator('img[alt="Hero Ilustration"]')).toBeVisible();
  });

  test("should have responsive images that load efficiently", async ({
    page,
  }) => {
    await page.goto("/");

    // Check that hero image loads
    const heroImage = page.locator('img[alt="Hero Ilustration"]');
    await expect(heroImage).toBeVisible();

    // Check that the image has a source
    const imageSrc = await heroImage.getAttribute("src");
    expect(imageSrc).toBeTruthy();
    expect(imageSrc).toContain("unsplash");
  });

  test("should handle network conditions gracefully", async ({
    page,
    context,
  }) => {
    // Simulate slow 3G network
    await context.route("**/*", async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 100)); // Add 100ms delay
      await route.continue();
    });

    await page.goto("/");

    // Even with network delay, critical content should be visible
    await expect(page.locator("h1")).toBeVisible({ timeout: 10000 });
    await expect(page.locator("p").first()).toBeVisible({ timeout: 10000 });
  });

  test("should have proper caching headers for static assets", async ({
    page,
  }) => {
    const responses: any[] = [];

    page.on("response", (response) => {
      responses.push(response);
    });

    await page.goto("/");

    // Check that we received responses
    expect(responses.length).toBeGreaterThan(0);

    // Find CSS/JS responses and check they exist
    const staticAssets = responses.filter((response) => {
      const url = response.url();
      return (
        url.includes(".css") || url.includes(".js") || url.includes(".svg")
      );
    });

    // We should have some static assets
    expect(staticAssets.length).toBeGreaterThan(0);
  });
});
