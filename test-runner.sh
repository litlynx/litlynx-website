#!/bin/bash

echo "🚀 Starting Playwright Test Validation..."

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "❌ node_modules not found. Running npm install..."
    npm install
fi

# Check if @playwright/test is installed
if [ ! -d "node_modules/@playwright/test" ]; then
    echo "❌ @playwright/test not found. Installing..."
    npm install @playwright/test
fi

# Check if browsers are installed
echo "🔍 Checking browser installation..."
npx playwright --version

# Install browsers if needed
echo "📦 Installing Playwright browsers..."
npx playwright install chromium

# Validate TypeScript compilation
echo "🔍 Validating TypeScript compilation..."
npx tsc --noEmit --project . || echo "⚠️ TypeScript validation had issues, continuing..."

# List available tests
echo "📋 Available tests:"
npx playwright test --list

# Run smoke test first
echo "🔥 Running smoke tests..."
npx playwright test smoke.spec.ts --reporter=line --project=chromium

# Run a basic homepage test
echo "🏠 Running homepage test..."
npx playwright test homepage.spec.ts --reporter=line --project=chromium --timeout=60000

# Check test configuration
echo "⚙️ Validating test configuration..."
node -e "
const config = require('./playwright.config.ts');
console.log('✅ Playwright config loaded successfully');
console.log('Base URL:', config.default?.use?.baseURL || 'not set');
console.log('Test dir:', config.default?.testDir || 'not set');
" || echo "⚠️ Config validation had issues"

echo "✅ Test validation complete!"
echo ""
echo "🎯 To run all tests:"
echo "npm run test:e2e"
echo ""
echo "🎯 To run tests with UI:"
echo "npm run test:e2e:ui"
echo ""
echo "🎯 To run tests in headed mode:"
echo "npm run test:e2e:headed"
