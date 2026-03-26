import {Locator, Page} from "@playwright/test"
import { HelperBase } from "./helperBase"
import { ScrapedProduct } from "./helperBase"


export class MyShoppingList extends HelperBase{
    constructor(page: Page){
        super(page)
    }

    async getShoppingList(): Promise<ScrapedProduct> {
        const shoppingList = this.page.locator('.list-view_list-detail__KZJJf')
        const firstProductCard = shoppingList.locator('div.product-card_product-card__Z_hn_').first()
        const product_tin = await firstProductCard.getAttribute('data-test')

        const title = await firstProductCard.locator('[data-test="item-title"]').textContent()
        const price = await firstProductCard.locator('[data-test="product-price"]').textContent()
        const unit_price = await firstProductCard.locator('.styles_styledUnitPrice__JoVMy  ').textContent()
        unit_price?.trim()

        const scrapedProduct: ScrapedProduct = {
            product_tin: product_tin?.trim() || null,
            title: title?.trim() || null,
            price: price?.trim() || null,
            unit_price: unit_price?.trim() || null,
            scraped_at: new Date().toISOString()
        }

        await this.storeToSupabase('products', scrapedProduct)
        return scrapedProduct
    }
}