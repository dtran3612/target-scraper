import {Locator, Page} from "@playwright/test"
import { HelperBase } from "./helperBase"

export class NavigationPage extends HelperBase{
    constructor(page: Page){
        super(page)
    }

    async categoriesNewArrivals(){
        await this.page.getByRole('link', { name: 'Categories' }).click()
        await this.page.getByRole('link', { name: 'New Arrivals' }).click()
        await this.waitForNumberOfSeconds(1) // 🚧>1?
    }

    // private async selectGroupMenuItem(groupItemTitle: string){
    //     const groupMenuItem = this.page.getByTitle(groupItemTitle)
    //     const expandedState = await groupMenuItem.getAttribute('aria-expanded')
    //     if(expandedState == "false"){
    //         await groupMenuItem.click()
    //     }
    // }
}