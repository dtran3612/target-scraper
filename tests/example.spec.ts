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
    
    await pm.navigateTo().submitSignInOrCreateAccount('dtran3612@gmail.com','@Dt145623!@#')
    await page.waitForTimeout(5000) //✅
    await pm.navigateTo().listAndFavorites()

    // await pm.navigateTo().submitSignout()
    await page.waitForTimeout(5000) //✅
})