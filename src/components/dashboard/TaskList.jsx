import TaskItem from "./TaskItem";

function TaskList({
  tasks,
  onAddTask,
  onEditTask,
  onDeleteTask,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold">
          My Tasks
        </h2>

        <button
          onClick={onAddTask}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl transition"
        >
          + Add Task
        </button>

      </div>

      <div className="space-y-5">

        {tasks.length === 0 ? (
          <p className="text-gray-500">
            No Tasks Found
          </p>
        ) : (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onEdit={() => onEditTask(task)}
              onDelete={() => onDeleteTask(task)}
            />
          ))
        )}

      </div>

    </div>
  );
}

export default TaskList;