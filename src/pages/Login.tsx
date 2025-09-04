import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Car } from "lucide-react";

export default function Login() {
  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
  const { mutate: login, isPending } = useLogin();
  
  
  
  let handleLogin = (e: any) => {
    e.preventDefault()
    setLoginInfo(prev => ({
      ...prev,
        [e.target.name] : e.target.value
      }))
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
   
    // validation
    const newErrors: { username?: string; password?: string } = {};
    // Username validation
    if (!loginInfo.username.trim()) {
      newErrors.username = "Username is required";
    } else if (loginInfo.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    } else if (loginInfo.username.length > 16) {
      newErrors.username = "Username must not exceed 16 characters";
    }

    // Password validation
    if (!loginInfo.password.trim()) {
      newErrors.password = "Password is required";
    } else if (loginInfo.password.length < 3) {
      newErrors.password = "Password must be at least 3 characters";
    } else if (loginInfo.password.length > 16) {
      newErrors.password = "Password must not exceed 16 characters";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;
    login(loginInfo);
  };


    const handleTestLogin = () => {
    setLoginInfo({
    username: "admin",
    password: "adminpass",
  });
  };

  const handleEmployeeTestLogin = () => {
    setLoginInfo({
    username: "emp1",
    password: "pass1",
  });
  };

  return <>
  
  <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
    
     <form onSubmit={handleSubmit} className="min-w-3/12 min-h-80 mx-auto p-7  bg-white shadow-md rounded-lg">

     <div className="text-center">
      <div className="mx-auto h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
        <Car className="h-8 w-8 text-white" />
      </div>
      <h2 className="text-3xl font-bold ">WeLink Cargo</h2>
      <p className="mt-2 text-sm text-gray-500">Parking Reservation System</p>
    </div>


      <div className="mb-4">
        <label className="block mb-1 font-medium">Username</label>
        <input
          type="text"
          value={loginInfo.username}
          onChange={handleLogin}
          name="username"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg "
        />
        {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Password</label>
        <input
          type="password"
          name="password"
          value={loginInfo.password}
          onChange={handleLogin}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg "
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
      >
        {isPending ? "Logging in..." : "Login"}
      </button>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          className="w-full mt-5 px-10 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
          onClick={handleTestLogin}
          disabled={isPending}
        >
          Admin Test
        </button>
        <button
          type="button"
          className="w-full mt-5 px-10 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
          onClick={handleEmployeeTestLogin}
          disabled={isPending}
        >
          Employee Test
        </button>
      </div>


    </form>


  </div>
  
  </>
}
