function RecentActivity({ tasks }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      <h2 className="text-2xl font-bold mb-6">
        Recent Activity
      </h2>

      <div className="space-y-4">

        {tasks.slice(0, 5).map((task) => (

          <div
            key={task.id}
            className="flex justify-between items-center border-b pb-3"
          >

            <div>

              <h3 className="font-semibold">
                {task.title}
              </h3>

              <p className="text-gray-500 text-sm">
                {task.priority}
              </p>

            </div>

            <span
              className={`px-3 py-1 rounded-full text-sm ${
                task.status === "COMPLETED"
                  ? "bg-green-100 text-green-700"
                  : "bg-orange-100 text-orange-700"
              }`}
            >
              {task.status}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}

export default RecentActivity;