import { chromium, FullConfig } from '@playwright/test';
import { PageManager } from './page-objects/pageManager';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '.env') });

async function globalSetup(config: FullConfig) {
  console.log('🔧 Starting global setup...');

  // Validate environment variables are loaded
  if (!process.env.TEST_USER_EMAIL || !process.env.TEST_USER_PASSWORD) {
    throw new Error('❌ Missing credentials! Ensure .env file exists with TEST_USER_EMAIL and TEST_USER_PASSWORD');
  }
  console.log('✅ Loaded credentials for:', process.env.TEST_USER_EMAIL);

  // Create .auth directory if it doesn't exist
  const authDir = path.join(__dirname, '.auth');
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
    console.log('✅ Created .auth directory');
  }

  const browser = await chromium.launch({ headless: process.env.CI ? true : false });
  const context = await browser.newContext({
    ignoreHTTPSErrors: true  // Needed for WebKit on Windows
  });
  const page = await context.newPage();

  // Enable console logging from the page
  page.on('console', msg => console.log('🌐 Browser:', msg.text()));

  try {
    // Navigate to target.com
    console.log('📍 Navigating to target.com...');
    await page.goto('https://target.com/');
    await page.waitForTimeout(1000);

    // Use existing PageManager to log in
    console.log('🔑 Attempting login...');
    const pm = new PageManager(page);
    await pm.navigateTo().submitSignInOrCreateAccount(
      process.env.TEST_USER_EMAIL!,
      process.env.TEST_USER_PASSWORD!
    );

    // Wait for login to complete and verify
    await page.waitForTimeout(2000);
    console.log('⏳ Verifying login success...');

    // Check if we're logged in by looking for the account link
    const accountLink = page.locator('[data-test="@web/AccountLink"]');
    const accountText = await accountLink.textContent();
    console.log('👤 Account link text:', accountText);

    if (!accountText?.includes('Hi,')) {
      throw new Error('Login verification failed - account link does not show "Hi, [name]"');
    }

    // Verify cookies exist before saving
    const cookies = await context.cookies();
    console.log('🍪 Cookies found:', cookies.length);

    if (cookies.length === 0) {
      throw new Error('No cookies found after login. Check that the login flow sets cookies.');
    }

    // Save storage state
    const statePath = path.join(authDir, 'user.json');
    await context.storageState({ path: statePath });
    console.log('✅ Storage state saved to:', statePath);

  } catch (error) {
    console.error('❌ Global setup failed:', error);

    // Take screenshot on failure
    await page.screenshot({
      path: path.join(__dirname, 'test-results', 'global-setup-failure.png'),
      fullPage: true
    });
    console.log('📸 Screenshot saved to test-results/global-setup-failure.png');

    throw error;
  } finally {
    await browser.close();
    console.log('🏁 Global setup completed');
  }
}

export default globalSetup;
