import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function CalendarCard() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      <h2 className="text-2xl font-bold mb-6">
        Calendar
      </h2>

      <Calendar />

    </div>
  );
}

export default CalendarCard;