import { test, expect } from '@playwright/test';
import { fillSignupCredentials, completeAccountInfo, submitAccountCreation } from '../utils/user_signup';

test.describe('Verificar flujo de registro de usuario', () => {
    let userName = 'User Test';
    // const userEmail = generateRandomEmail();
    test.beforeEach(async ({ page }) => {
        // await page.goto('https://automationexercise.com/');
        // await page.getByRole('link', { name: ' Signup / Login' }).click();
        
    });
    test('Registro de nuevo usuario', async ({ page }) => {
        await test.step('Verificar que el usuario se encuentre en el formulario de registro y su nombre de usuario sea el ingresado', async () => {
            const fsc = await fillSignupCredentials(page);
            await expect(page).toHaveURL('https://automationexercise.com/signup');
            await expect(page.getByText('Enter Account Information'), 'No fue posible ingresar a la sección de registro').toBeVisible();
            await expect(page.getByRole('textbox', { name: 'Name *', exact: true }), 'El nombre en el formulario no es el del user').toHaveValue(userName);
        });
        await test.step('Completar el formulario de registro', async () => {
            const cai = await completeAccountInfo(page);
            await expect(page.getByRole('checkbox', { name: 'Sign up for our newsletter!' })).toBeChecked();
            await expect(page.getByRole('checkbox', { name: 'Receive special offers from' })).not.toBeChecked();
        });
        await test.step('Enviar el formulario de registro y verificar que el usuario fue creado', async () => {
            const sac = await submitAccountCreation(page);
            await expect(page.getByText('Account Created!')).toBeVisible();
            await page.getByRole('link', { name: 'Continue' }).click();
            await expect(page.getByText(`Logged in as ${userName}`), 'No fue posible verificar el usuario loggeado').toBeVisible();
        });
    });
});