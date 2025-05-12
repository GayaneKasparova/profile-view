import { getAccountInfo } from './api.js';

export async function getUserId() {
    const account = await getAccountInfo();
    return account?.UID || null;
}