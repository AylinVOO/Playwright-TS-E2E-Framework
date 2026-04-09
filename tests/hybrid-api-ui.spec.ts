import { test, expect } from '@playwright/test';

test.describe('Hybrid API and UI Checks', () => {

    test('Verify Site is reachable via API before UI test', async ({ request, page }) => {
        // Verifies the site 
        const response = await request.get('https://www.saucedemo.com/');
        expect(response.status()).toBe(200);
        console.log('Site is reachable via API');

        // Loads the site 
        await page.goto('https://www.saucedemo.com/');
        await expect(page).toHaveTitle('Swag Labs');
        console.log('Site is reachable via UI');
    });
});