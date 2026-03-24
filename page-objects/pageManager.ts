import {Page, expect} from "@playwright/test"
import { NavigationPage } from "./navigationPage"
import { FrozenFoodsGrocery } from "./frozenFoodsGrocery"

export class PageManager{
    private readonly page: Page
    private readonly navigationPage: NavigationPage
    private readonly frozenFoodsGrocery: FrozenFoodsGrocery

    constructor(page: Page){
        this.page = page
        this.navigationPage = new NavigationPage(this.page)
        this.frozenFoodsGrocery = new FrozenFoodsGrocery(this.page)
    }

    navigateTo(){
        return this.navigationPage
    }

    onFrozenFoodsGroceryPage(){
        return this.frozenFoodsGrocery
    }
}