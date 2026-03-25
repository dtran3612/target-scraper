import { test, expect } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager'

// [DONE] ✅
test.beforeEach(async({page})=>{
  await page.goto('https://target.com/');
  await page.waitForTimeout(1000) //✅
})

test('navigate to page', async({page})=> {
    const pm = new PageManager(page)
    // await pm.navigateTo().categoriesGroceryFrozenFoods()

    // pm.navigateTo().submitUpdateShippingZip('90210')

    // await pm.onFrozenFoodsGroceryPage().clickFrozenFoodsGrocery()

    // Login handled by global setup - storage state is already authenticated
    await page.waitForTimeout(2000) //✅
    await pm.navigateTo().listAndFavorites()

    // await pm.navigateTo().submitSignout()
    await page.waitForTimeout(5000) //✅
})