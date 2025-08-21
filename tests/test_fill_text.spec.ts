import { test, expect } from '@playwright/test';

test.describe('Validar el formulario de registro en la pagina https://automationexercise.com/', () => {
    function generateRandomEmail(): string {
        const randomString = Math.random().toString(36).substring(2, 10);
        return `user_${randomString}@testmail.com`;
}
    let userName = 'User Test';
    let userEmail = generateRandomEmail();
    test.beforeEach('Ingresar a la pagina', async ({ page }) => {
        await page.goto('https://automationexercise.com/');
        await expect(page).toHaveURL('https://automationexercise.com/');
        test.step('Al hacer clic en el botón de Signup / Login', async () => {
            await page.getByRole('link', { name: ' Signup / Login' }).click();
            await expect(page).toHaveURL('https://automationexercise.com/login');
        }); 
    });
    test('Ingresar datos del usuario', async ({ page }) => {
        await test.step('Al ingresar el nombre y correo electronico', async () => {
            await page.getByPlaceholder('Name').click();
            await page.getByPlaceholder('Name').fill(userName);
            await page.getByPlaceholder('Email Address').nth(1).click();
            await page.getByPlaceholder('Email Address').nth(1).fill(userEmail);
            await page.getByRole('button', { name: 'Signup' }).click();
            await test.step('Verificar que el correo es válido', async () => {
                if (await page.getByText('Enter Account Information').isVisible()) {
                    await page.getByRole('radio', { name: 'Mr.' }).click();
                }else {
                    console.log('El correo electrónico ya está registrado o no es válido.');
                    return;
                }
            });     
        });
    });
});