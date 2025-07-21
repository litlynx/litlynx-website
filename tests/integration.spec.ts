import { test, expect } from "@playwright/test";
import { TestHelpers, VIEWPORT_SIZES, SELECTORS } from "./utils/test-helpers";

test.describe("Integration Tests", () => {
  let helpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new TestHelpers(page);
    await helpers.navigateToHomepage();
  });

  test("should pass complete homepage integration test", async ({ page }) => {
    // Test hero section
    await helpers.expectSectionToBeVisible("Front-End Development");
    await helpers.expectImageToLoad(SELECTORS.hero.image, "Hero Ilustration");

    // Test social media links
    await helpers.testSocialMediaLinks();

    // Test services section
    await helpers.expectSectionToBeVisible("Our Services");
    await helpers.testSectionCards(SELECTORS.services.cards, 1);

    // Test stats section
    await helpers.expectSectionToBeVisible("By the Numbers");
    await helpers.testSectionCards(SELECTORS.stats.cards, 1);
  });

  test("should work across all device sizes", async ({ page }) => {
    const viewports = [VIEWPORT_SIZES.mobile, VIEWPORT_SIZES.tablet, VIEWPORT_SIZES.desktop];

    await helpers.testResponsiveLayout(viewports);
  });

  test("should have good performance", async ({ page }) => {
    await helpers.checkPagePerformance(3000); // 3 second max load time
  });

  test("should support keyboard navigation", async ({ page }) => {
    const focusableElements = [
      SELECTORS.socialLinks.linkedin,
      SELECTORS.socialLinks.github,
      SELECTORS.socialLinks.xolo,
    ];

    await helpers.testKeyboardNavigation(focusableElements);
  });
});
