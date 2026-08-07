function LoadingSkeleton() {
  return (
    <div className="animate-pulse">

      {/* Welcome Banner */}

      <div className="bg-gray-300 rounded-2xl h-44 mb-10"></div>

      {/* Stats */}

      <div className="grid grid-cols-4 gap-6 mb-10">

        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="bg-gray-300 h-32 rounded-2xl"
          ></div>
        ))}

      </div>

      {/* Task List */}

      <div className="bg-gray-300 h-96 rounded-2xl"></div>

    </div>
  );
}

export default LoadingSkeleton;