import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';

// Importing user data from a JSON file
import users from '../data/users.json';

// Define an interface for the user data structure
interface UserData {
    user: string;
    pass: string;
}

test.describe('Login Security Tests', () => {
    // Using the standard user from the JSON file
    test('should allow a valid user to login in', async ({ page }) => {

        // Find the specific user from Array structure
        const standardUser = users.find(u => u.type === 'valid');

        // Checks the user is valid
        if (!standardUser) throw new Error('Standar user not founf in JSON');

        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login(standardUser.user, standardUser.pass);

        // Validates that the user is redirected to the inventory page
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        await expect(page.locator('.title')).toHaveText('Products');
    });

    // Using the Locked Out User from the JSON file
    test('should show an error for locked out users', async ({ page }) => {

        const lockedUser = users.find(u => u.type === 'locked');

        if (!lockedUser) throw new Error('Locked user not founf in JSON');

        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login(lockedUser.user, lockedUser.pass);

        // Validates that an error message is shown for locked out users
        const error = page.locator('[data-test="error"]');
        await expect(error).toBeVisible();
        await expect(error).toContainText('this user has been locked out.');
    });
});
