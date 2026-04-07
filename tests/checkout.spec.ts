import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { ProductPage } from './pages/ProductPage';
import { CheckoutPage } from './pages/CheckoutPage';
import users from '../data/users.json';

test.describe('Full Purchase Flow', () => {

    test('should complete a purchase from start to finish', async ({ page }) => {

        const standardUser = users.find(u => u.type === 'valid');

        if (!standardUser) throw new Error('Standar user not founf in JSON');

        const loginPage = new LoginPage(page);
        const productPage = new ProductPage(page);
        const checkoutPage = new CheckoutPage(page);

        await loginPage.navigate();
        await loginPage.login(standardUser.user, standardUser.pass);

        await productPage.addFirstProductToCart();
        await productPage.goToCart();
        await page.click('[data-test="checkout"]');

        await checkoutPage.fillInformation('Aylin', 'Valencia', '52920');
        await checkoutPage.finishBtn.click();

        await expect(checkoutPage.successMessage).toHaveText('Thank you for your order!');
    });
}); 