import {Page, expect} from "@playwright/test"
import { NavigationPage } from "./navigationPage"
import { FrozenFoodsGrocery } from "./frozenFoodsGrocery"
import { MyShoppingList} from "./myShoppingList"


export class PageManager{
    private readonly page: Page
    private readonly navigationPage: NavigationPage
    private readonly frozenFoodsGrocery: FrozenFoodsGrocery
    private readonly myShoppingList: MyShoppingList

    constructor(page: Page){
        this.page = page
        this.navigationPage = new NavigationPage(this.page)
        this.frozenFoodsGrocery = new FrozenFoodsGrocery(this.page)
        this.myShoppingList = new MyShoppingList(this.page)
    }

    navigateTo(){
        return this.navigationPage
    }

    onFrozenFoodsGroceryPage(){
        return this.frozenFoodsGrocery
    }

    onMyShoppingListPage(){
        return this.myShoppingList
    }
}