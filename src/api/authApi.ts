import api from "./axiosInit";

interface LoginInfo {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    role: "admin" | "employee"; 
    username: string;
    }
};

export const loginApi = async (data: LoginInfo): Promise<LoginResponse> => {
  const res = await api.post("/auth/login", data);
  return res.data;
};