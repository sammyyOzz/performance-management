export const isAuthenticated = (): boolean => {
    const token = localStorage.getItem("token");
    if (!token) {
        return false;
    }

    const decryptedToken = JSON.parse(atob(token.split(".")[1]));
    const expirationDate = new Date(decryptedToken?.exp * 1000);
    const isExpired = expirationDate < new Date();

    return !isExpired;
};