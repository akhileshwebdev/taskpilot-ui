import axios from "axios";
import Swal from "sweetalert2";

const api = axios.create({
  baseURL: "https://taskpilot-backend-production-4dbb.up.railway.app",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token && !config.url.startsWith("/auth")) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {

    const isLoginRequest = error.config?.url?.startsWith("/auth");

if (
    !isLoginRequest &&
    (error.response?.status === 401 || error.response?.status === 403)
) {

      localStorage.removeItem("token");

      await Swal.fire({
        icon: "warning",
        title: "Session Expired",
        text: "Your session has expired. Please login again.",
        confirmButtonText: "Login",
        confirmButtonColor: "#4f46e5",
        allowOutsideClick: false,
      });

      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

export default api;