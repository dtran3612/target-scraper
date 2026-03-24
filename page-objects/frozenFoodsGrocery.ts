import {Locator, Page} from "@playwright/test"
import { HelperBase } from "./helperBase"

//https://www.target.com/c/frozen-foods-grocery/-/N-5xszd
export class FrozenFoodsGrocery extends HelperBase{
    constructor(page: Page){
        super(page)
    }

    async clickFrozenFoodsGrocery(){
        await this.page.getByRole('link', { name: 'Ice Cream & Novelties' }).click()
    }
}