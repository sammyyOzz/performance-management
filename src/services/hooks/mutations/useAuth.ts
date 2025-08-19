import { setItem } from "@/utils/localStorage";
import { axiosInit } from "@/services/axiosInit";
import { useMutation } from "@tanstack/react-query";
import { login, passwordChange, refreshToken, setUserPassword, forgotPassword } from "@/services/apis/auth";
import { errorToast, successToast } from "@/utils/createToast";
import { APP_TOKEN_STORAGE_KEY, APP_USERDATA_STORAGE_KEY } from "@/constants/utils";


function onLoginSuccess(responseData: any) {
    const { token, user } = responseData;
    setItem(APP_TOKEN_STORAGE_KEY, token);
    setItem(APP_USERDATA_STORAGE_KEY, JSON.stringify(user));
    axiosInit(token)
}

export const useLogin = (fn?: () => void) => {
    return useMutation({
        mutationFn: login,
        onSuccess: (response: any) => {
            onLoginSuccess(response)
            successToast({ param: null, msg: "Logged in successfully" })
            fn?.()
        },
        onError: (err: Error) => {
          errorToast({ param: err, variant: "light" })
        },
    });
};

export const useChangePassword = (fn?: () => void) => {
    return useMutation({
        mutationFn: passwordChange,
        onSuccess: () => {
            successToast({ param: null, msg: "Password changed successfully" })
            fn?.()
        },
        onError: (err: Error) => {
          errorToast({ param: err, variant: "light" })
        },
    });
};

export const useRefreshToken = (fn?: () => void) => {
    return useMutation({
        mutationFn: refreshToken,
        onSuccess: (response) => {
            setItem(APP_TOKEN_STORAGE_KEY, response?.token);
            axiosInit(response?.token)
            fn?.()
        },
        onError: (err: Error) => {
          errorToast({ param: err, variant: "light" })
        },
    });
};

export const useSetUserPassword = (fn?: () => void) => {
    return useMutation({
        mutationFn: setUserPassword,
        onSuccess: () => {
            successToast({ param: null, msg: "Password set successfully" })
            fn?.()
        },
        onError: (err: Error) => {
          errorToast({ param: err, variant: "light" })
        },
    });
};

export const useForgotPassword = (fn?: () => void) => {
    return useMutation({
        mutationFn: forgotPassword,
        onSuccess: () => {
            successToast({ param: null, msg: "Password reset link sent to your email" })
            fn?.()
        },
        onError: (err: Error) => {
          errorToast({ param: err, variant: "light" })
        },
    });
};