import {
  Search,
  Bell,
  UserCircle,
} from "lucide-react";

import { useMemo, useState, useEffect, useRef } from "react";

function Header({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
  currentUser,
  tasks = [],
}) {
  const [showNotifications, setShowNotifications] = useState(false);

  const notificationRef = useRef(null);

  // Close notifications when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const notifications = useMemo(() => {
    const today = new Date();

    const todayString = today
      .toISOString()
      .split("T")[0];

    const tomorrow = new Date();

    tomorrow.setDate(today.getDate() + 1);

    const tomorrowString = tomorrow
      .toISOString()
      .split("T")[0];

    const list = [];

    tasks.forEach((task) => {
      if (!task.dueDate || task.status === "COMPLETED") {
        return;
      }

      const dueDate = task.dueDate.substring(0, 10);

      if (dueDate < todayString) {
        list.push({
          type: "overdue",
          message: `⚠️ "${task.title}" is overdue`,
        });
      } else if (dueDate === todayString) {
        list.push({
          type: "today",
          message: `📅 "${task.title}" is due today`,
        });
      } else if (dueDate === tomorrowString) {
        list.push({
          type: "tomorrow",
          message: `🟢 "${task.title}" is due tomorrow`,
        });
      }
    });

    return list;
  }, [tasks]);

  return (
    <header className="w-full mb-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        {/* Left Section */}
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">

          {/* Search */}
          <div className="flex items-center bg-gray-100 rounded-xl px-4 py-2 w-full sm:w-72 lg:w-72">
            <Search
              size={18}
              className="text-gray-500 flex-shrink-0"
            />

            <input
              type="text"
              placeholder="Search Tasks..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              className="bg-transparent outline-none ml-2 w-full min-w-0"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-2 w-full sm:w-auto">

            {/* Status */}
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="border rounded-lg px-2 sm:px-3 py-2 text-sm w-full sm:w-auto"
            >
              <option value="">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="COMPLETED">Completed</option>
            </select>

            {/* Priority */}
            <select
              value={priorityFilter}
              onChange={(e) =>
                setPriorityFilter(e.target.value)
              }
              className="border rounded-lg px-2 sm:px-3 py-2 text-sm w-full sm:w-auto"
            >
              <option value="">All Priority</option>
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
              <option value="LOW">Low</option>
            </select>

          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 w-full lg:w-auto">

          {/* Notification Bell */}
          <div
            ref={notificationRef}
            className="relative"
          >
            <button
              type="button"
              onClick={() =>
                setShowNotifications(
                  !showNotifications
                )
              }
              className="relative p-2 rounded-full hover:bg-gray-100 transition"
            >
              <Bell
                size={24}
                className="text-gray-700"
              />

              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </button>

            {/* Notification Popup */}
            {showNotifications && (
              <div className="absolute right-0 top-full mt-3 w-[calc(100vw-2rem)] max-w-80 bg-white rounded-2xl shadow-2xl border z-50">

                <div className="p-4 border-b font-semibold text-gray-700">
                  🔔 Notifications
                </div>

                <div className="max-h-80 overflow-y-auto">

                  {notifications.length === 0 ? (
                    <div className="p-5 text-center text-gray-500">
                      🎉 No notifications
                    </div>
                  ) : (
                    notifications.map(
                      (notification, index) => (
                        <div
                          key={index}
                          className="p-4 border-b hover:bg-gray-50 transition text-sm"
                        >
                          {notification.message}
                        </div>
                      )
                    )
                  )}

                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-2 min-w-0">

            <UserCircle
              size={40}
              className="text-indigo-600 flex-shrink-0"
            />

            <div className="min-w-0 hidden sm:block">
              <p className="font-semibold truncate max-w-[180px]">
                {currentUser?.name || "Loading..."}
              </p>

              <p className="text-sm text-gray-500 truncate max-w-[180px]">
                {currentUser?.email || ""}
              </p>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
}

export default Header;