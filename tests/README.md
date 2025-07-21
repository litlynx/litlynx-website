# E2E Tests for Litlynx Website

This directory contains end-to-end tests for the Litlynx website using Playwright.

## Test Structure

### Test Files

- **`homepage.spec.ts`** - Tests for the homepage basic functionality
- **`responsive.spec.ts`** - Tests for responsive design across different devices
- **`services.spec.ts`** - Tests for the services section
- **`stats.spec.ts`** - Tests for the statistics section
- **`accessibility.spec.ts`** - Tests for accessibility and SEO compliance
- **`performance.spec.ts`** - Tests for page performance and loading times
- **`integration.spec.ts`** - Complete integration tests using test helpers

### Utilities

- **`utils/test-helpers.ts`** - Reusable test utilities and common selectors

## Running Tests

### Prerequisites

1. Install dependencies:

```bash
npm install
```

2. Install Playwright browsers:

```bash
npx playwright install
```

### Running Tests Locally

```bash
# Run all tests
npm run test:e2e

# Run tests in UI mode (interactive)
npm run test:e2e:ui

# Run tests in headed mode (see browser)
npm run test:e2e:headed

# Debug tests
npm run test:e2e:debug

# Run specific test file
npx playwright test homepage.spec.ts

# Run tests on specific browser
npx playwright test --project=chromium
```

### Running Tests in CI

Tests automatically run in GitHub Actions on:

- Push to `main` or `develop` branches
- Pull requests to `main` branch

## Test Coverage

The tests cover:

### Functionality

- ✅ Homepage loading and content display
- ✅ Social media links functionality
- ✅ Hero section content and images
- ✅ Services section display and interactions
- ✅ Statistics section display and interactions

### Responsive Design

- ✅ Mobile viewport (375px)
- ✅ Tablet viewport (768px)
- ✅ Desktop viewport (1200px)
- ✅ Large screens (1920px)
- ✅ Small screens (320px)

### Accessibility

- ✅ Proper heading hierarchy (H1, H2, etc.)
- ✅ Alt text for images
- ✅ Keyboard navigation support
- ✅ External link attributes
- ✅ Semantic HTML structure

### SEO

- ✅ Page title and meta description
- ✅ Proper meta tags
- ✅ Heading structure

### Performance

- ✅ Page load times
- ✅ Resource loading
- ✅ Network condition handling
- ✅ Image optimization

## Test Configuration

### Browser Support

Tests run on:

- Chromium (Desktop Chrome)
- Firefox
- WebKit (Safari)
- Mobile Chrome (Pixel 5)
- Mobile Safari (iPhone 12)

### Test Settings

- **Base URL**: `http://localhost:4321`
- **Timeout**: 30 seconds per test
- **Retries**: 2 retries on CI, 0 locally
- **Parallel**: Tests run in parallel for speed
- **Reports**: HTML report locally, GitHub Actions reporter on CI

## Writing New Tests

### Basic Test Structure

```typescript
import { test, expect } from "@playwright/test";

test.describe("Feature Name", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should do something", async ({ page }) => {
    // Your test code here
    await expect(page.locator("selector")).toBeVisible();
  });
});
```

### Using Test Helpers

```typescript
import { TestHelpers, SELECTORS } from "./utils/test-helpers";

test("should use helpers", async ({ page }) => {
  const helpers = new TestHelpers(page);
  await helpers.navigateToHomepage();
  await helpers.expectSectionToBeVisible("Section Name");
});
```

### Best Practices

1. **Use descriptive test names** that explain what is being tested
2. **Group related tests** using `test.describe()`
3. **Use page object patterns** for complex interactions
4. **Test user journeys** rather than implementation details
5. **Use proper assertions** with meaningful error messages
6. **Keep tests independent** - each test should be able to run in isolation
7. **Use helpers** for common operations to reduce duplication

## Debugging Tests

### Visual Debugging

```bash
# Run with headed browser
npm run test:e2e:headed

# Run in debug mode
npm run test:e2e:debug

# Generate trace for failed tests
npx playwright test --trace on
```

### Test Reports

After running tests, view the HTML report:

```bash
npx playwright show-report
```

## Continuous Integration

### GitHub Actions Workflow

The CI pipeline includes:

1. **Build Stage**

   - Install dependencies
   - Run Astro check
   - Build the project

2. **Test Stage**

   - Run tests on multiple browsers
   - Generate test reports
   - Upload artifacts on failure

3. **Deploy Stage**
   - Deploy preview for pull requests
   - Deploy to production on main branch

### Viewing Test Results

- Test reports are uploaded as artifacts on test failures
- Check the Actions tab in GitHub for detailed results
- Screenshots and videos are captured for failed tests

## Troubleshooting

### Common Issues

1. **Tests timing out**

   - Increase timeout in `playwright.config.ts`
   - Check if the dev server is running properly

2. **Element not found**

   - Verify selectors are correct
   - Check if content loads asynchronously

3. **Browser installation issues**

   - Run `npx playwright install --with-deps`
   - Check system requirements

4. **Port conflicts**
   - Ensure port 4321 is available
   - Update base URL in config if needed

### Getting Help

- Check [Playwright Documentation](https://playwright.dev/)
- Review test output and error messages
- Use debug mode to step through tests
- Check browser console for JavaScript errors
