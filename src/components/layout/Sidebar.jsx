import {
  LayoutDashboard,
  CheckSquare,
  Bot,
  Calendar,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Swal from "sweetalert2";


function Sidebar() {

  const navigate = useNavigate();
  const scrollToSection = (id) => {
  const container = document.getElementById("dashboard-container");
  const element = document.getElementById(id);

  if (!container || !element) return;

  container.scrollTo({
    top: element.offsetTop - 20,
    behavior: "smooth",
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
    });

    if (!result.isConfirmed) return;

    localStorage.removeItem("token");

    toast.success("👋 Logged out successfully!");

    navigate("/", { replace: true });
  };

  return (
    <aside className="w-64 bg-white shadow-xl min-h-screen p-6">

      <h1 className="text-3xl font-bold text-indigo-600 mb-10">
        TaskPilot AI
      </h1>

      <nav className="space-y-3">

       <button
        onClick={() => alert("Dashboard clicked")}
        className="flex items-center gap-3 w-full p-3 rounded-lg bg-indigo-100 text-indigo-700 font-semibold hover:bg-indigo-200 transition"
      >
        <LayoutDashboard size={20} />
        Dashboard
      </button>

        <button
  onClick={() => scrollToSection("tasks")}
  className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-100 transition"
>
          <CheckSquare size={20} />
          My Tasks
        </button>

        <button
  onClick={() => scrollToSection("assistant")}
  className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-100 transition"
>
          <Bot size={20} />
          AI Assistant
        </button>

        <button
  onClick={() => scrollToSection("calendar")}
  className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-100 transition"
>
          <Calendar size={20} />
          Calendar
        </button>

        <button
  onClick={() => scrollToSection("analytics")}
  className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-100 transition"
>
          <BarChart3 size={20} />
          Analytics
        </button>

        <button
  onClick={() => toast("🚧 Settings page coming soon!")}
  className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-100 transition"
>
          <Settings size={20} />
          Settings
        </button>

      </nav>

      <div className="mt-16">

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-red-600 hover:text-red-700 font-semibold"
        >
          <LogOut size={20} />
          Logout
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;