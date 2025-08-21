import { test, expect } from '@playwright/test';

test.describe('Validar demás secciones de la pagina https://automationexercise.com/', () => {
    const elements = [
        {nombre: /Products/, url: '/products'},
        {nombre: /Cart/, url: '/view_cart'},
        {nombre: /Test Cases/, url: '/test_cases'},
    ];
    test('Validar secciones de la pagina', async ({ page }) => {
        await test.step('Estando en la pagina https://automationexercise.com/', async () => {
            await page.goto('https://automationexercise.com/');
            await expect(page).toHaveURL('https://automationexercise.com/');
            });
        for (const element of elements) {
            await test.step(`Al hacer clic sobre la pestaña de ${element.nombre}`, async () => {
                    page.getByRole('link', {name: element.nombre}).first().click();
                    await page.waitForURL(`**${element.url}`);
                });
                await test.step(`Verificar que la URL es correcta`, async () => {
                    await expect(page).toHaveURL(new RegExp(`.*${element.url}`));
                });
        }
    });
});