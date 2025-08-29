import { test, expect } from '@playwright/test';
import { fillSignupCredentials, completeAccountInfo, submitAccountCreation } from '../utils/user_signup';

test.describe('Eliminar cuenta de usuario', () => {
    let userName = 'User Test';
    test('Eliminar cuenta de usuario', async ({ page }) => {
        await test.step('Registrar un nuevo usuario', async () => {
            const fsc = await fillSignupCredentials(page);
            const cai = await completeAccountInfo(page);
            const sac = await submitAccountCreation(page);
            await page.getByRole('link', { name: 'Continue' }).click();
        });
        await test.step('Eliminar la cuenta del usuario creado', async () => {
            await expect(page.getByText(`Logged in as ${userName}`), 'No fue posible verificar el usuario loggeado').toBeVisible();
            await page.getByRole('link', { name: ' Delete Account' }).click();
            await expect(page.getByText('Account Deleted!')).toBeVisible();
            console.log('El usuario ha sido eliminado exitosamente');
            await page.getByRole('link', { name: 'Continue' }).click();
        });
    });
});
