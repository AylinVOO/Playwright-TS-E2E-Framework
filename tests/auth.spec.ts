import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';

test.describe('Login Security Tests', () => 
    {
        test('should allow a valid user to login in' , async ({ page }) => 
        {
            const loginPage = new LoginPage(page);
            
            await loginPage.navigate();
            await loginPage.login('standard_user', 'secret_sauce');

            // Validates that the user is redirected to the inventory page
            await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
            await expect(page.locator('.title')).toHaveText('Products');
        });

        test('should show an error for locked out users' , async ({ page }) =>
        {
            const loginPage = new LoginPage(page);

            await loginPage.navigate();
            await loginPage.login('locked_out_user', 'secret_sauce');

            // Validates that an error message is shown for locked out users
            const error = page.locator('[data-test="error"]');
            await expect(error).toBeVisible();
            await expect(error).toContainText('this user has been locked out.');
        });





    });
