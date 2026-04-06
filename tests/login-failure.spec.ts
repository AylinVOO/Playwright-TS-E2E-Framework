import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import * as users from '../data/users.json';

test.describe('Login Failure Tests', () => {

    // Declarw the variable so it can be used in all tests
    let loginPage: LoginPage;

    // The code runs twice (once before the locked user test and once before the invalid user test)
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigate();
    });

    test('should not allow a locked user to login', async ({ page }) => {
        // Skip the "const loginPage = ..." and "await loginPage.navigate()"
        await loginPage.login(users.locked.user, users.locked.pass);
        await expect(page).toHaveURL('https://www.saucedemo.com/');
        await expect(page.locator('[data-test="error"]')).toBeVisible();
    });

    test('should show error for invalid user', async ({ page }) => {
        await loginPage.login('locked_out_user', 'secret_sauce');
        await expect(page.locator('[data-test="error"]')).toBeVisible();
    })

});
