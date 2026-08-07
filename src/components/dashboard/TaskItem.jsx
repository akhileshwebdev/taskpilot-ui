function TaskItem({ task, onEdit, onDelete }) {
  const priorityColor = {
    HIGH: "bg-red-100 text-red-600",
    MEDIUM: "bg-yellow-100 text-yellow-600",
    LOW: "bg-green-100 text-green-600",
  };

  const statusColor =
    task.status === "COMPLETED"
      ? "bg-green-100 text-green-700"
      : "bg-orange-100 text-orange-700";

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">

      <div className="flex justify-between items-start">

        <div>

          <h3 className="text-lg font-bold text-gray-800">
            📘 {task.title}
          </h3>

          <p className="text-gray-500 mt-2">
            {task.description}
          </p>

        </div>

        <div className="flex gap-3">

          <button
            onClick={onEdit}
            className="text-xl hover:scale-110 transition"
            title="Edit"
          >
            ✏️
          </button>

          <button
            onClick={onDelete}
            className="text-xl hover:scale-110 transition"
            title="Delete"
          >
            🗑️
          </button>

        </div>

      </div>

      <div className="flex justify-between items-center mt-6">

        <div className="flex gap-3">

          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              priorityColor[task.priority]
            }`}
          >
            {task.priority}
          </span>

          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor}`}
          >
            {task.status}
          </span>

        </div>

        <div className="text-gray-500 text-sm">
          📅{" "}
          {task.dueDate
            ? new Date(task.dueDate).toLocaleDateString()
            : "No Due Date"}
        </div>

      </div>

    </div>
  );
}

export default TaskItem;