import { test, expect, selectors, Page } from '@playwright/test';
import { generateRandomEmail } from '../utils/generate_random_email';

let userName = 'User Test';
const userEmail = generateRandomEmail();
let userPassword = 'Test1234';

export async function fillSignupCredentials(page: Page) {
    await page.goto('https://automationexercise.com/');
    await page.getByRole('link', { name: ' Signup / Login' }).click();
    await page.getByPlaceholder('Name').fill(userName);
    await page.getByPlaceholder('Email Address').nth(1).fill(userEmail);
    await page.getByRole('button', { name: 'Signup' }).click();
}

export async function completeAccountInfo(page: Page) {
    const fields = [
        { selector: '#first_name', value: 'Usuario' },
        { selector: '#last_name', value: 'Test' },
        { selector: '#company', value: 'Company QA' },
        { selector: '#address1', value: '6 street' },
        { selector: '#address2', value: '5 Avenue' },
        { selector : '#state', value: 'State Test' },
        { selector: '#city', value: 'City Test' },
        { selector: '#zipcode', value: '110110' },  
        { selector: '#mobile_number', value: '1234567890' }
    ]

        await page.getByRole('radio', { name: 'Mr.' }).click();
        await page.getByRole('textbox', { name: 'Password *' }).fill(userPassword);
        await page.locator('#days').selectOption('1');
        await page.locator('#months').selectOption('January');
        await page.locator('#years').selectOption('1990');
        await page.getByRole('checkbox', { name: 'Sign up for our newsletter!' }).check();
        await page.getByLabel('Country *').selectOption('United States');
        for (const field of fields) {
            await page.locator(field.selector).fill(field.value);
            }
}
export async function submitAccountCreation(page: Page) {
    await page.getByRole('button', { name: 'Create Account' }).click();
}
        
    