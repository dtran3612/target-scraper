import {Page} from "@playwright/test"
import { supabase } from "../utils/supabaseClient"

export interface ScrapedProduct {
    product_tin: string | null
    title: string | null
    price: string | null
    unit_price: string | null
    scraped_at: string
}

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

    /**
     * Store data to Supabase table
     * @param tableName The Supabase table name
     * @param data The data object to insert
     */
    async storeToSupabase(tableName: string, data: Record<string, any>): Promise<void> {
        try {
            const { error } = await supabase
                .from(tableName)
                .insert([data])

            if (error) {
                console.error(`[ERROR] Failed to store data in Supabase table '${tableName}':`, error)
                throw error
            }
            console.log(`[SUCCESS] Stored data in Supabase table '${tableName}'`)
        } catch (err) {
            console.error(`[ERROR] Supabase insert error in '${tableName}':`, err)
        }
    }
}