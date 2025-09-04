import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../api/authApi";
import { useAuthStore } from "../store/useUserStore";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

export const useLogin = () => {

    const { setAuth } = useAuthStore();
    const nav = useNavigate()

    return useMutation({
        mutationFn: loginApi,
        onSuccess: (data) => {
            setAuth(data.token, data.user); 
            nav("/dashboard/zones");
        }, 
        onError: (error) => {
            toast.error(" username or password is incorrect " + (error).message );
        }
    });
};