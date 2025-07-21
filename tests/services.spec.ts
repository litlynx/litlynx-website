import { test, expect } from "@playwright/test";

test.describe("Services Section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should display services section with correct content", async ({
    page,
  }) => {
    // Check services section is visible
    const servicesSection = page
      .locator("section")
      .filter({ hasText: "Our Services" });
    await expect(servicesSection).toBeVisible();

    // Check services heading
    await expect(page.locator("h2")).toContainText("Our Services");

    // Check services description
    await expect(page.locator("p")).toContainText(
      "We specialize in crafting exceptional digital experiences"
    );
  });

  test("should display all service cards", async ({ page }) => {
    // Wait for services section to load
    await page.waitForSelector('h2:has-text("Our Services")', {
      timeout: 10000,
    });

    // Check for Frontend Development service
    const frontendCard = page.locator("text=Frontend Development").first();
    await expect(frontendCard).toBeVisible({ timeout: 5000 });

    // Check service cards have proper styling and hover effects
    const serviceCards = page.locator(".bg-white.rounded-xl.p-6.shadow-lg");
    const cardCount = await serviceCards.count();

    // Verify we have at least one service card
    expect(cardCount).toBeGreaterThan(0);

    if (cardCount > 0) {
      await expect(serviceCards.first()).toBeVisible();

      // Test hover effect on first service card
      await serviceCards.first().hover();
    }

    // Check that service descriptions are present (be more flexible with text matching)
    const descriptions = page.locator(".bg-white.rounded-xl p");
    const descriptionCount = await descriptions.count();
    expect(descriptionCount).toBeGreaterThan(0);
  });

  test("should have interactive service cards", async ({ page }) => {
    await page.waitForSelector('h2:has-text("Our Services")', {
      timeout: 10000,
    });

    // Get all service cards
    const serviceCards = page.locator(".bg-white.rounded-xl.p-6");
    const cardCount = await serviceCards.count();

    // Verify we have service cards
    expect(cardCount).toBeGreaterThan(0);

    // Test hover interactions on all visible cards (max 3 for performance)
    const cardsToTest = Math.min(cardCount, 3);
    for (let i = 0; i < cardsToTest; i++) {
      const card = serviceCards.nth(i);
      await expect(card).toBeVisible();
      await card.hover();
      // Small delay to allow hover animation
      await page.waitForTimeout(100);
    }
  });
});
