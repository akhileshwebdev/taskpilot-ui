import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  createTask,
  updateTask,
} from "../../services/taskService";

function AddTaskModal({
  isOpen,
  onClose,
  onTaskCreated,
  selectedTask,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [status, setStatus] = useState("PENDING");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (selectedTask) {
      setTitle(selectedTask.title || "");
      setDescription(selectedTask.description || "");
      setPriority(selectedTask.priority || "MEDIUM");
      setStatus(selectedTask.status || "PENDING");

      if (selectedTask.dueDate) {
        setDueDate(selectedTask.dueDate.slice(0, 16));
      } else {
        setDueDate("");
      }
    } else {
      setTitle("");
      setDescription("");
      setPriority("MEDIUM");
      setStatus("PENDING");
      setDueDate("");
    }
  }, [selectedTask, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    // Validation
    if (!title.trim()) {
      toast.error("Task title is required.");
      return;
    }

    const task = {
      title,
      description,
      priority,
      status,
      dueDate: dueDate || null,
    };

    try {
      if (selectedTask) {
        await updateTask(selectedTask.id, task);
        toast.success("Task updated successfully!");
      } else {
        await createTask(task);
        toast.success("Task created successfully!");
      }

      onTaskCreated();

      onClose();

    } catch (error) {
      console.error(error);

      toast.error("Operation failed. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white rounded-2xl shadow-2xl w-[500px] p-8">

        <h2 className="text-3xl font-bold mb-6">
          {selectedTask ? "Edit Task" : "Create New Task"}
        </h2>

        <div className="space-y-4">

          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <textarea
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-xl p-3 h-28 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="LOW">LOW</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HIGH">HIGH</option>
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="PENDING">PENDING</option>
            <option value="COMPLETED">COMPLETED</option>
          </select>

          <input
            type="datetime-local"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

        </div>

        <div className="flex justify-end gap-4 mt-8">

          <button
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 px-5 py-2 rounded-xl transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl transition"
          >
            {selectedTask ? "Update Task" : "Create Task"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default AddTaskModal;