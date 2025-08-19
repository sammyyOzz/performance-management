export type LoginType = {
    email: string;
    password: string;
}

export type PasswordChangeType = {
    confirm_password: string;
    new_password: string;
    old_password: string;
}

export type SetUserPasswordType = {
    token: string;
    confirm_password: string;
    password: string;
}

export type RefreshTokenType = {
    token: string;
}