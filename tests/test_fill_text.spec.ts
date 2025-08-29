import { test, expect, selectors } from '@playwright/test';
import { generateRandomEmail } from '../utils/generate_random_email';

test.describe('Validar el formulario de registro en la pagina https://automationexercise.com/', () => {
    let userName = 'User Test';
    const userEmail = generateRandomEmail();
    let userPassword = 'Test1234';
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
                    await test.step('Al completar el formulario de registro', async () => {
                    await expect(page.getByRole('textbox', { name: 'Name *', exact: true }), 'El nombre en el formulario no es el del user')
                    .toHaveValue(userName);
                    await page.getByRole('radio', { name: 'Mr.' }).click();
                    await page.getByRole('textbox', { name: 'Password *' }).fill(userPassword);
                    await page.locator('#days').selectOption('1');
                    await page.locator('#months').selectOption('January');
                    await page.locator('#years').selectOption('1990');
                    await page.getByRole('checkbox', { name: 'Sign up for our newsletter!' }).check();
                    await expect(page.getByRole('checkbox', { name: 'Sign up for our newsletter!' })).toBeChecked();
                    await expect(page.getByRole('checkbox', { name: 'Receive special offers from' })).not.toBeChecked();
                    await page.getByLabel('Country *').selectOption('United States');
                    for (const field of fields) {
                        await page.locator(field.selector).fill(field.value);
                    }
                    await page.getByRole('button', { name: 'Create Account' }).click();
                    if (await page.getByText('Account Created!').isVisible()) {
                        console.log('El usuario ha sido creado exitosamente con el correo:', userEmail);
                        await page.getByRole('link', { name: 'Continue' }).click();
                    }else {
                        throw new Error('No se pudo crear el usuario.');
                    }
                });
                }else {
                    console.log('El correo electrónico ya está registrado o no es válido.');
                    return;
                }
            });  
        });
        await test.step('Verificar usuario loggeado', async () => {
            await expect(page.getByText(`Logged in as ${userName}`), 'No fue posible verificar el usuario loggeado').toBeVisible();
        });
        await test.step('Eliminar usuario creado', async () => {
            await page.getByRole('link', { name: ' Delete Account' }).click();
        });
        await test.step('Verificar que el usuario fue eliminado', async () => {
            if (await page.getByText('Account Deleted!').isVisible()) {
                        console.log('El usuario ha sido eliminado exitosamente');
                        await page.getByRole('link', { name: 'Continue' }).click();
                    }else {
                        throw new Error('Error eliminando el usuario.');
                    }
        });
    });
});