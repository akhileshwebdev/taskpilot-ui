import AnimatedNumber from "../common/AnimatedNumber";

function StatsCard({ title, value, color }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

      <h3 className="text-gray-500 text-sm font-medium">
        {title}
      </h3>

      <p className={`text-4xl font-bold mt-4 ${color}`}>
        <AnimatedNumber value={value} />
      </p>

    </div>
  );
}

export default StatsCard;