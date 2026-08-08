import { useEffect, useState } from "react";

import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import MainLayout from "../components/layout/MainLayout";

import StatsCard from "../components/dashboard/StatsCard";
import TaskList from "../components/dashboard/TaskList";
import AIAssistant from "../components/dashboard/AIAssistant";
import RecentActivity from "../components/dashboard/RecentActivity";
import CalendarCard from "../components/dashboard/CalendarCard";
import TaskChart from "../components/dashboard/TaskChart";
import LoadingSkeleton from "../components/dashboard/LoadingSkeleton";

import AddTaskModal from "../components/modals/AddTaskModal";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { getCurrentUser } from "../services/userService";

import {
  getAllTasks,
  deleteTask,
  filterTasks,
} from "../services/taskService";

function Dashboard() {
  const [tasks, setTasks] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const showDueTodayNotification = () => {

  const today = new Date().toISOString().split("T")[0];

  const dueToday = tasks.filter(task => {

    if (!task.dueDate) return false;

    return task.dueDate.substring(0,10) === today
        && task.status !== "COMPLETED";
  });

  if (dueToday.length > 0) {
    toast.success(
      `📅 ${dueToday.length} task${dueToday.length > 1 ? "s are" : " is"} due today!`,
      {
        duration: 4000,
      }
    );
  }

};
const showOverdueNotification = () => {

  const today = new Date();

  const overdue = tasks.filter(task => {

    if (!task.dueDate) return false;

    return new Date(task.dueDate) < today
      && task.status !== "COMPLETED";
  });

  if (overdue.length > 0) {

    toast.error(
      `⚠️ ${overdue.length} overdue task${overdue.length > 1 ? "s" : ""}!`,
      {
        duration: 5000,
      }
    );

  }

};
useEffect(() => {

    if(tasks.length){

        showOverdueNotification();

    }

},[tasks]);
useEffect(() => {

    if(tasks.length > 0){

        showDueTodayNotification();

    }

}, [tasks]);

  useEffect(() => {
  loadTasks();
  loadCurrentUser();
}, []);


  useEffect(() => {
    const timer = setTimeout(() => {
      loadFilteredTasks();
    }, 400);

    return () => clearTimeout(timer);
  }, [searchTerm, statusFilter, priorityFilter]);

  const loadTasks = async () => {
  try {
    setLoading(true);

    const response = await getAllTasks();

    setTasks(response.content);

  } catch (error) {
    console.error(error);

    toast.error("❌ Failed to load tasks.");

  } finally {
    setLoading(false);
  }
};
  const loadCurrentUser = async () => {
  try {
    const user = await getCurrentUser();
    setCurrentUser(user);
  } catch (error) {
    console.error(error);
    toast.error("Failed to load user.");
  }
};

  const loadFilteredTasks = async () => {
  try {
    setLoading(true);
    

    if (
      searchTerm === "" &&
      statusFilter === "" &&
      priorityFilter === ""
    ) {
      await loadTasks();
      return;
    }

    const data = await filterTasks({
      title: searchTerm,
      status: statusFilter,
      priority: priorityFilter,
    });

    setTasks(data);

  } catch (error) {
    console.error(error);
    toast.error("❌ Failed to filter tasks.");

  } finally {
    setLoading(false);
  }
};
  const handleEditTask = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleDeleteTask = async (task) => {

  const result = await Swal.fire({
    title: "Delete Task?",
    text: `Are you sure you want to delete "${task.title}"?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#4f46e5",
    cancelButtonColor: "#ef4444",
    confirmButtonText: "Yes, Delete",
    cancelButtonText: "Cancel",
    reverseButtons: true,
    focusCancel: true,
  });

  if (!result.isConfirmed) return;

  try {
    await deleteTask(task.id);

    toast.success("🗑️ Task deleted successfully!");

    loadTasks();

  } catch (error) {

    console.error(error);

    toast.error("❌ Failed to delete task.");

  }
};

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "COMPLETED"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "PENDING"
  ).length;

  const overdueTasks = tasks.filter(
    (task) => task.status === "OVERDUE"
  ).length;
  
    return (
    <MainLayout>
      <Sidebar />

      <div
  id="dashboard-container"
  className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto h-screen min-w-0"
>

        <Header
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
          currentUser={currentUser}
        />

        {/* Welcome Banner */}

        {/* Welcome Banner */}

<div
  id="dashboard"
  className="mt-8 bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-500 rounded-2xl p-10 text-white shadow-xl"
>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
            Welcome Back, {currentUser?.name || "User"} 👋
          </h1>

          <p className="mt-2 sm:mt-3 text-base sm:text-lg text-indigo-100">
            Stay productive with AI-powered task management.
          </p>

          <p className="mt-3 sm:mt-5 text-sm sm:text-base text-indigo-200">
            Here's your productivity overview.
          </p>

        </div>

        {/* Statistics */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mt-6 lg:mt-10">

          <StatsCard
            title="Total Tasks"
            value={totalTasks}
            color="text-indigo-600"
          />

          <StatsCard
            title="Completed"
            value={completedTasks}
            color="text-green-600"
          />

          <StatsCard
            title="Pending"
            value={pendingTasks}
            color="text-orange-500"
          />

          <StatsCard
            title="Overdue"
            value={overdueTasks}
            color="text-red-600"
          />

        </div>

        {/* Tasks + AI */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6 lg:mt-10 items-start">

          <div id="tasks" className="lg:col-span-2 min-w-0">

  {loading ? (
    <LoadingSkeleton />
  ) : (
    <TaskList
      tasks={tasks}
      onAddTask={() => {
        setSelectedTask(null);
        setIsModalOpen(true);
      }}
      onEditTask={handleEditTask}
      onDeleteTask={handleDeleteTask}
    />
  )}

</div>

          <div
  id="assistant"
  className="h-[600px] lg:h-[700px] min-w-0"
>
            <AIAssistant
              onTaskChanged={loadTasks}
              currentUser={currentUser}
          />
        </div>

        </div>

        {/* Analytics */}

        <div
  id="analytics"
  className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6 lg:mt-10"
>

          <div>

            <TaskChart tasks={tasks} />

          </div>

          <div className="lg:col-span-2 min-w-0">

            <RecentActivity tasks={tasks} />

          </div>

        </div>

        {/* Calendar */}

        <div id="calendar" className="mt-6 lg:mt-10">

          <CalendarCard />

        </div>

      </div>

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTask(null);
        }}
        onTaskCreated={loadTasks}
        selectedTask={selectedTask}
      />

    </MainLayout>
  );
}

export default Dashboard;