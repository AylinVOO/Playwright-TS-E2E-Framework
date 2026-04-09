import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import users from '../data/users.json';

test('Login page visual snapshot', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const standardUser = users.find(u => u.type === 'valid');
    await loginPage.navigate();

    //Takes a screenshot and compares it to a baseline
    await expect(page).toHaveScreenshot('login-page-baseline.png');

});