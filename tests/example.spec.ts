import { test, expect } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager'

// [DONE] ✅
test.beforeEach(async({page})=>{
  await page.goto('https://target.com/');
})

test('navigate to page', async({page})=> {
    const pm = new PageManager(page)
    await pm.navigateTo().categoriesNewArrivals()
})

// test('update shipping location', async ({ page }) => {
//   await page.locator('[data-test="@web/ZipCodeButton/StyledZipCodeButton"]').click()
//   // await page.waitForTimeout(1000) //✅

//   const zipInput = page.locator('[data-test="@web/LocationFlyout/FormInput"]')
//   await zipInput.clear()
//   await zipInput.fill('90250')

//   // await page.waitForTimeout(1000) //✅
//   await page.locator('[data-test="@web/LocationFlyout/UpdateLocationButton"]').click()
// });

// //[TODO-Later]
// //Works
// test('sign in or create account', async ({ page }) => {
//   await page.getByRole('button', { name: 'Sign in or create account' }).click()
//   await page.waitForTimeout(5000)
// });