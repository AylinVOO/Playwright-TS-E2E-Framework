import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import users from '../data/users.json';

test('Login page visual snapshot', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const standardUser = users.find(u => u.type === 'valid');
    await loginPage.navigate();

    //Takes a screenshot and compares it to a baseline
    // Ignore tiny pixel differences caused by different Operating Systems so the test stays stable in GitHub
    await expect(page).toHaveScreenshot({
        maxDiffPixelRatio: 0.05
    });
});