export function generateRandomEmail(): string {
        const randomString = Math.random().toString(36).substring(2, 10);
        return `user_${randomString}@testmail.com`;
}