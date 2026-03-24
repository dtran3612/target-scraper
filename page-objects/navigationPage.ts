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

    async categoriesGroceryFrozenFoods(){
        await this.page.getByRole('link', { name: 'Categories' }).click()
        await this.page.getByRole('link', { name: 'Grocery' }).click()
        await this.page.getByRole('link', { name: 'Frozen Foods' }).click()
        await this.waitForNumberOfSeconds(1) // 🚧>1?
    }

    /**
     * This method will fill out the zipcode form
     * @param zipcode input zip
     */
    async submitUpdateShippingZip(zipcode: string){
        const formUpdateShippingZip = this.page.locator('[data-test="@web/ZipCodeButton/StyledZipCodeButton"]')
        await formUpdateShippingZip.click()
        const zipInput = this.page.locator('[data-test="@web/LocationFlyout/FormInput"]')
        await zipInput.clear()
        await zipInput.fill(zipcode)
        await this.waitForNumberOfSeconds(1) // 🚧>1?
        await this.page.locator('[data-test="@web/LocationFlyout/UpdateLocationButton"]').click()
    }

    // private async selectGroupMenuItem(groupItemTitle: string){
    //     const groupMenuItem = this.page.getByTitle(groupItemTitle)
    //     const expandedState = await groupMenuItem.getAttribute('aria-expanded')
    //     if(expandedState == "false"){
    //         await groupMenuItem.click()
    //     }
    // }
}