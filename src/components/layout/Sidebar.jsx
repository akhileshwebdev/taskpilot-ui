import { useState } from "react";

import {
  LayoutDashboard,
  CheckSquare,
  Bot,
  Calendar,
  BarChart3,
  Settings,
  LogOut,
  LogIn,
  Menu,
  X,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

function Sidebar() {
  const navigate = useNavigate();

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const scrollToSection = (id) => {
    const container = document.getElementById("dashboard-container");
    const element = document.getElementById(id);

    if (!container) return;

    if (id === "dashboard-container") {
      container.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else if (element) {
      container.scrollTo({
        top: element.offsetTop - 20,
        behavior: "smooth",
      });
    }

    setIsMobileOpen(false);
  };

  const handleLogin = () => {
    localStorage.removeItem("token");

    setIsMobileOpen(false);

    navigate("/", {
      replace: true,
    });
  };

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Logout?",
      text: "Are you sure you want to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Logout",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#4f46e5",
      cancelButtonColor: "#ef4444",
      reverseButtons: true,
      focusCancel: true,
    });

    if (!result.isConfirmed) return;

    localStorage.removeItem("token");

    toast.success("👋 Logged out successfully!");

    setIsMobileOpen(false);

    navigate("/", {
      replace: true,
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-white rounded-xl shadow-md border border-gray-200"
        aria-label="Open menu"
      >
        <Menu
          size={24}
          className="text-indigo-600"
        />
      </button>

      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside
        className={`
          fixed lg:static
          top-0 left-0
          z-50
          h-screen
          w-72
          bg-white
          border-r
          border-gray-200
          p-6
          flex
          flex-col
          transition-transform
          duration-300
          ease-in-out
          ${
            isMobileOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-indigo-600">
            TaskPilot AI
          </h1>

          <button
            type="button"
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition"
            aria-label="Close menu"
          >
            <X
              size={22}
              className="text-gray-700"
            />
          </button>
        </div>

        <nav className="space-y-3">
          <button
            type="button"
            onClick={() =>
              scrollToSection("dashboard-container")
            }
            className="flex items-center gap-3 w-full p-3 rounded-lg bg-indigo-100 text-indigo-700 font-semibold hover:bg-indigo-200 transition"
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </button>

          <button
            type="button"
            onClick={() => scrollToSection("tasks")}
            className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-100 transition"
          >
            <CheckSquare size={20} />
            <span>My Tasks</span>
          </button>

          <button
            type="button"
            onClick={() => scrollToSection("assistant")}
            className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-100 transition"
          >
            <Bot size={20} />
            <span>AI Assistant</span>
          </button>

          <button
            type="button"
            onClick={() => scrollToSection("calendar")}
            className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-100 transition"
          >
            <Calendar size={20} />
            <span>Calendar</span>
          </button>

          <button
            type="button"
            onClick={() => scrollToSection("analytics")}
            className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-100 transition"
          >
            <BarChart3 size={20} />
            <span>Analytics</span>
          </button>

          <button
            type="button"
            onClick={() => {
              toast("🚧 Settings page coming soon!");
              setIsMobileOpen(false);
            }}
            className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-100 transition"
          >
            <Settings size={20} />
            <span>Settings</span>
          </button>

          <button
            type="button"
            onClick={handleLogin}
            className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-100 transition"
          >
            <LogIn size={20} />
            <span>Login</span>
          </button>
        </nav>

        <div className="mt-auto pt-8">
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-3 w-full p-3 rounded-lg text-red-600 hover:bg-red-50 hover:text-red-700 font-semibold transition"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;