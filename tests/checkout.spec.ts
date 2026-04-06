import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { ProductPage } from './pages/ProductPage';
import { CheckoutPage } from './pages/CheckoutPage';
import users from '../data/users.json';

// The group (The "Folder")
test.describe('Full Purchase Flow', () => {

    // The actual test (The "File" inside the folder)
    test('should complete a purchase from start to finish', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productPage = new ProductPage(page);
        const checkoutPage = new CheckoutPage(page);

        await loginPage.navigate();
        await loginPage.login(users.standard.user, users.standard.pass);

        await productPage.addFirstProductToCart();
        await productPage.goToCart();
        await page.click('[data-test="checkout"]');

        await checkoutPage.fillInformation('Aylin', 'Valencia', '52920');
        await checkoutPage.finishBtn.click();

        await expect(checkoutPage.successMessage).toHaveText('Thank you for your order!');
    }); // End of test
}); // End of describe