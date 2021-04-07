export interface ProfileData {
    isAdmin: boolean;
    isSnapper: boolean;
}

export async function signIn() {
    return;
}

export async function signOut() {
    return;
}

export function getCurrentUserName(): String {
    return "Henry";
}

export function getUserProfile(cb: (p: ProfileData) => void) {
    const mockProfile = { isAdmin: true, isSnapper: true };
    cb(mockProfile);
}
