import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import users from '../data/users.json';

test.describe('Login Failure Tests', () => {

    for (const user of users) {
        // Only run this for users that ARE NOT the standard valid user
        if (user.type !== 'valid') {
            test(`Should handle login for ${user.user}`, async ({ page }) => {
                const loginPage = new LoginPage(page);
                await loginPage.navigate();
                await loginPage.login(user.user, user.pass);

                if (user.type === 'locked') {
                    // Locked users MUST see an error
                    const error = page.locator('[data-test="error"]');
                    await expect(error).toBeVisible();
                    await expect(error).toContainText('Sorry, this user has been locked out');
                } else if (user.type === 'problem') {
                    // Problem users log in, but check if they reached the inventory
                    await expect(page).toHaveURL(/inventory.html/);
                }
            });
        }
    }

});
