import { test, expect } from '@playwright/test';

test.describe('Validar pagina https://automationexercise.com/', () => {
    
    test('El link redirige correctamente', async ({ page }) => {
        await test.step('Estando en la pagina https://automationexercise.com/', async () => {
            await page.goto('https://automationexercise.com/');
        });

        await test.step('Al seleccionar la pestaña de Productos', async () => {
            await page.getByRole('link', { name: /Products/ }).click();
            await expect(page).toHaveURL(/.*\/products/);
        });
    });
});