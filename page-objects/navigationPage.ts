import {expect, Locator, Page} from "@playwright/test"
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

    /**
     * Login method
     * @param username [Input][String]username
     * @param password [Input][String]password
     */
    async submitSignInOrCreateAccount(username: string, password: string){
        await this.page.locator('[data-test="@web/AccountLink"]').click()
        await this.page.locator('[data-test="accountNav-signIn"]').click()
        await this.waitForNumberOfSeconds(1) // 🚧>1?
        await this.page.getByRole('textbox', { name: 'Email or mobile phone' }).fill(username)
        await this.page.getByRole('button', { name: 'Continue' }).click()
        await this.page.getByRole('button', { name: 'Enter your password' }).click()
        await this.page.locator('[data-test="login-password"]').fill(password)
        await this.page.getByRole('button', { name: 'Sign in with password' }).click()
        await this.waitForNumberOfSeconds(1) // 🚧>1?
        await expect(this.page.locator('[data-test="@web/AccountLink"]')).toHaveText('Hi, Duong')
    }


    async submitSignout(){
        await this.page.locator('[data-test="@web/AccountLink"]').click()
        await this.waitForNumberOfSeconds(1) // 🚧>1?
        await this.page.locator('[data-test="accountNav-guestSignOut"]').click()
        await expect(this.page.locator('[data-test="@web/AccountLink"]')).toHaveText('Account')
    }
}