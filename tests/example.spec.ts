import { test, expect } from '@playwright/test';

test.beforeEach(async({page})=>{
  await page.goto('https://target.com/');
})

test('update shipping location', async ({ page }) => {
  await page.locator('[data-test="@web/ZipCodeButton/StyledZipCodeButton"]').click()
  // await page.waitForTimeout(1000) //✅

  const zipInput = page.locator('[data-test="@web/LocationFlyout/FormInput"]')
  await zipInput.clear()
  await zipInput.fill('90250')

  // await page.waitForTimeout(1000) //✅
  await page.locator('[data-test="@web/LocationFlyout/UpdateLocationButton"]').click()
});

test('navigate categories > new_arrivals', async ({ page }) => {
  // await page.waitForTimeout(1000) //✅
  await page.getByRole('link', { name: 'Categories' }).click()
  // await page.waitForTimeout(1000) //✅
  await page.getByRole('link', { name: 'New Arrivals' }).click()
  await page.waitForTimeout(3000)    //🚧>3000
})

// //[TODO-Later]
// //Works
// test('sign in or create account', async ({ page }) => {
//   await page.getByRole('button', { name: 'Sign in or create account' }).click()
//   await page.waitForTimeout(5000)
// });