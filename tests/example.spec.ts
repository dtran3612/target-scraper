import { test, expect } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager'

// [DONE] ✅
test.beforeEach(async({page})=>{
  await page.goto('https://target.com/');
  await page.waitForTimeout(1000) //✅
})

test('navigate to page', async({page})=> {
    // Opening
    // Login handled by global setup - storage state is already authenticated
    const pm = new PageManager(page)
    await page.waitForTimeout(2000) //✅

    // Main
    await pm.navigateTo().listAndFavorites()
    await pm.onMyShoppingListPage().getShoppingList()
    
    // Closing
    await page.waitForTimeout(5000) //✅
    // await page.pause();
    // await pm.navigateTo().submitSignout()
})