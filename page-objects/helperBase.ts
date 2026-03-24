import {Page, expect} from "@playwright/test"

export class HelperBase{
    readonly page: Page
    constructor(page: Page){
        this.page = page
    }
    
    /**
     * Waits for the specified seconds
     * @param timeInSeconds Time in seconds
     */
    async waitForNumberOfSeconds(timeInSeconds:number){
        await this.page.waitForTimeout(timeInSeconds * 1000)
    }
}