import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

import { register } from "../services/authService";
import { useEffect } from "react";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
  const token = localStorage.getItem("token");

  if (token) {
    navigate("/dashboard", { replace: true });
  }
}, [navigate]);

  const handleRegister = async () => {
    if (!name.trim()) {
      toast.error("👤 Name is required.");
      return;
    }

    if (!email.trim()) {
      toast.error("📧 Email is required.");
      return;
    }

    if (!password.trim()) {
      toast.error("🔒 Password is required.");
      return;
    }

    if (password.length < 6) {
      toast.error("🔑 Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      await register({
        name,
        email,
        password,
      });

      toast.success("🎉 Account created successfully!");

      navigate("/login");

    } catch (error) {

    console.error(error);

    const errors = error.response?.data;

    if (errors) {

        Object.values(errors).forEach((message) => {
            toast.error(message);
        });

    } else {

        toast.error("Registration failed.");

    }

}finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">

      <div className="bg-white p-10 rounded-2xl shadow-xl w-[420px]">

        <h1 className="text-3xl font-bold text-center mb-8">
          Create Account
        </h1>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded-xl p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-xl p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleRegister();
            }
          }}
          className="w-full border rounded-xl p-3 mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          onClick={handleRegister}
          disabled={loading}
          className={`w-full py-3 rounded-xl text-white transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {loading ? "Creating Account..." : "Register"}
        </button>

        <p className="text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Register;