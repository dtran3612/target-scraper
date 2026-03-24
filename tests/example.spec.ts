import { test, expect } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager'

// [DONE] ✅
test.beforeEach(async({page})=>{
  await page.goto('https://target.com/');
})

test('navigate to page', async({page})=> {
    const pm = new PageManager(page)
    await pm.navigateTo().categoriesGroceryFrozenFoods()
    await pm.onFrozenFoodsGroceryPage().clickFrozenFoodsGrocery()
    await page.waitForTimeout(3000) //✅
})

// test('update shipping location', async ({ page }) => {
//     const pm = new PageManager(page)
//     await pm.navigateTo().submitUpdateShippingZip('90210')
//     await page.waitForTimeout(3000) //✅
// });

// //[TODO-Later]
// //Works
// test('sign in or create account', async ({ page }) => {
//   await page.getByRole('button', { name: 'Sign in or create account' }).click()
//   await page.waitForTimeout(5000)
// });