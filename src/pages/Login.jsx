import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { useEffect } from "react";

import { login } from "../services/authService";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
  const token = localStorage.getItem("token");

  if (token) {
    navigate("/dashboard", { replace: true });
  }
}, [navigate]);

  const handleLogin = async () => {
    if (!email.trim()) {
      toast.error("📧 Email is required.");
      return;
    }

    if (!password.trim()) {
      toast.error("🔒 Password is required.");
      return;
    }

    setLoading(true);

    try {
      const response = await login({
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);

      toast.success("🎉 Welcome back!");

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("❌ Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-blue-500 to-cyan-500 flex items-center justify-center p-6">

      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2">

        {/* Left Panel */}

        <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-indigo-700 to-blue-700 text-white p-14">

          <h1 className="text-5xl font-extrabold">
            🤖 TaskPilot AI
          </h1>

          <p className="mt-6 text-lg text-indigo-100 leading-8">
            AI Powered Task Management System
          </p>

          <div className="mt-12 space-y-6">

            <div className="flex items-center gap-3">
              <span className="text-2xl">✅</span>
              <p>AI Assistant powered by Groq</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-2xl">📊</span>
              <p>Analytics Dashboard</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-2xl">📅</span>
              <p>Smart Task Scheduling</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-2xl">🔐</span>
              <p>Secure JWT Authentication</p>
            </div>

          </div>

        </div>

        {/* Right Panel */}

        <div className="flex flex-col justify-center p-10 lg:p-14">

          <h2 className="text-4xl font-bold text-gray-800">
            Welcome Back 👋
          </h2>

          <p className="text-gray-500 mt-2 mb-8">
            Sign in to continue to TaskPilot AI
          </p>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-xl p-4 mb-5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <div className="relative mb-6">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleLogin();
                }
              }}
              className="w-full border rounded-xl p-4 pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>

          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className={`w-full py-4 rounded-xl text-white font-semibold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center mt-8 text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Register
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;