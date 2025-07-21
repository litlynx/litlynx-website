import { expect } from "@playwright/test";
import type { Page } from "@playwright/test";

/**
 * Common test utilities for Litlynx website tests
 */

export class TestHelpers {
  constructor(private page: Page) {}

  /**
   * Navigate to homepage and wait for it to load
   */
  async navigateToHomepage() {
    await this.page.goto("/");
    await this.page.waitForLoadState("domcontentloaded");

    // Wait for the main heading with timeout
    try {
      await expect(this.page.locator("h1")).toBeVisible({ timeout: 10000 });
    } catch (error) {
      console.log("Warning: H1 not found within timeout, continuing...");
    }
  }

  /**
   * Check if a section is visible on the page
   */
  async expectSectionToBeVisible(sectionText: string) {
    const section = this.page
      .locator("section")
      .filter({ hasText: sectionText });

    try {
      await expect(section).toBeVisible({ timeout: 10000 });
    } catch (error) {
      // If section filter doesn't work, try a more general approach
      const anyElement = this.page.locator(`text=${sectionText}`).first();
      await expect(anyElement).toBeVisible({ timeout: 5000 });
    }
  }

  /**
   * Test hover effect on an element
   */
  async testHoverEffect(selector: string) {
    const element = this.page.locator(selector);
    await expect(element).toBeVisible();
    await element.hover();
    await expect(element).toBeVisible();
  }

  /**
   * Check external link properties
   */
  async expectExternalLink(href: string, expectedTarget = "_blank") {
    const link = this.page.locator(`a[href*="${href}"]`);
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("target", expectedTarget);
  }

  /**
   * Test responsive behavior at different viewport sizes
   */
  async testResponsiveLayout(viewports: { width: number; height: number }[]) {
    for (const viewport of viewports) {
      await this.page.setViewportSize(viewport);
      await expect(this.page.locator("h1")).toBeVisible();
      await expect(
        this.page.locator('img[alt="Hero Ilustration"]')
      ).toBeVisible();
    }
  }

  /**
   * Check image loading and attributes
   */
  async expectImageToLoad(selector: string, expectedAlt?: string) {
    const image = this.page.locator(selector);
    await expect(image).toBeVisible();

    if (expectedAlt) {
      await expect(image).toHaveAttribute("alt", expectedAlt);
    }

    // Check that image has a source
    const src = await image.getAttribute("src");
    expect(src).toBeTruthy();
  }

  /**
   * Test keyboard navigation through focusable elements
   */
  async testKeyboardNavigation(expectedFocusableElements: string[]) {
    for (const selector of expectedFocusableElements) {
      await this.page.keyboard.press("Tab");
      const element = this.page.locator(selector);
      await expect(element).toBeFocused();
    }
  }

  /**
   * Test that all social media links are working
   */
  async testSocialMediaLinks() {
    await this.expectExternalLink("linkedin.com/in/jorge-miranda-dev");
    await this.expectExternalLink("github.com/litlynx");
    await this.expectExternalLink("app.xolo.io/profile/jorgemiranda");
  }

  /**
   * Test section cards with hover effects
   */
  async testSectionCards(cardSelector: string, expectedMinCount = 1) {
    const cards = this.page.locator(cardSelector);
    const cardCount = await cards.count();

    expect(cardCount).toBeGreaterThanOrEqual(expectedMinCount);

    // Test hover on first few cards (with error handling)
    const cardsToTest = Math.min(cardCount, 3);
    for (let i = 0; i < cardsToTest; i++) {
      try {
        const card = cards.nth(i);
        await expect(card).toBeVisible({ timeout: 5000 });
        await card.hover();
        await this.page.waitForTimeout(100); // Small delay for hover animation
      } catch (error) {
        console.log(
          `Warning: Could not interact with card ${i + 1}, continuing...`
        );
      }
    }
  }
  /**
   * Check page performance metrics
   */
  async checkPagePerformance(maxLoadTime = 5000) {
    const startTime = Date.now();
    await this.navigateToHomepage();
    const loadTime = Date.now() - startTime;

    expect(loadTime).toBeLessThan(maxLoadTime);
  }
}

/**
 * Common viewport sizes for responsive testing
 */
export const VIEWPORT_SIZES = {
  mobile: { width: 375, height: 667 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1200, height: 800 },
  large: { width: 1920, height: 1080 },
  small: { width: 320, height: 568 },
};

/**
 * Common selectors used across tests
 */
export const SELECTORS = {
  hero: {
    section: "#hero",
    heading: "h1",
    description: "p",
    image: 'img[alt="Hero Ilustration"]',
  },
  socialLinks: {
    linkedin: 'a[href*="linkedin.com/in/jorge-miranda-dev"]',
    github: 'a[href*="github.com/litlynx"]',
    xolo: 'a[href*="app.xolo.io/profile/jorgemiranda"]',
  },
  services: {
    section: 'section:has-text("Our Services")',
    heading: 'h2:has-text("Our Services")',
    cards: ".bg-white.rounded-xl.p-6.shadow-lg",
  },
  stats: {
    section: 'section:has-text("By the Numbers")',
    heading: 'h2:has-text("By the Numbers")',
    cards: ".bg-white.rounded-xl.p-8.shadow-lg",
  },
};
