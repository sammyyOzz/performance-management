import { useMutation } from "@tanstack/react-query";
import { setItem } from "@/utils/localStorage";
import { axiosInit } from "@/services/axiosInit";
import { errorToast, successToast } from "@/utils/createToast";
import { APP_TOKEN_STORAGE_KEY, APP_USERDATA_STORAGE_KEY } from "@/constants/utils";
import { login } from "@/services/apis/auth";
// import type { TwoFaLogin, User } from "@/types/auth";


function onLoginSuccess(responseData: any) {
    const { token, user } = responseData;
    setItem(APP_TOKEN_STORAGE_KEY, token);
    setItem(APP_USERDATA_STORAGE_KEY, JSON.stringify(user));
    axiosInit(token)
}

// eslint-disable-next-line no-unused-vars
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