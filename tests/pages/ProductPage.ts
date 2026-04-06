import { Page, Locator } from "@playwright/test";

export class ProductPage {
    readonly page: Page;
    readonly inventoryItems: Locator;
    readonly cartBadge: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inventoryItems = page.locator('.inventory_item');
        this.cartBadge = page.locator('.shopping_cart_badge');
    }

    async addFirstProductToCart() {
        await this.inventoryItems.first().locator('button').click();
    }

    async goToCart() {
        await this.cartBadge.click();
    }

}