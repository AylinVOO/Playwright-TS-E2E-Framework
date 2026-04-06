import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { ProductPage } from './pages/ProductPage';
import users from '../data/users.json';

test.describe('Inventory and Cart Flow', () => {

    test('should add a product and verify it in the cart', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productPage = new ProductPage(page);

        // 1.Setup

        await loginPage.navigate();
        await loginPage.login(users.standard.user, users.standard.pass);

        // 2. Interaction
        await productPage.addFirstProductToCart();

        // 3. Validation ("The Check")
        await expect(productPage.cartBadge).toHaveText('1');

        await productPage.goToCart();
        await expect(page).toHaveURL(/.*cart.html/);

    });
});
