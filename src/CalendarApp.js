import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import CalendarHeader from "./components/CalendarHeader";
import DayCell from "./components/DayCell";
import EventModal from "./components/EventModal";
import EventForm from "./components/EventForm";

export default function CalendarApp() {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [viewMode, setViewMode] = useState("month");
  const [events, setEvents] = useState(() => {
    const stored = localStorage.getItem("calendarEvents");
    return stored ? JSON.parse(stored) : [];
  });

  const [selectedDate, setSelectedDate] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  
  const todayEvents = events.filter(
    (e) => e.date === dayjs().format("YYYY-MM-DD")
  );

  useEffect(() => {
    localStorage.setItem("calendarEvents", JSON.stringify(events));
  }, [events]);

  const goToToday = () => setCurrentDate(dayjs());
  const changeMonth = (offset) => setCurrentDate(currentDate.add(offset, "month"));

  const startOfMonth = currentDate.startOf("month");
  const endOfMonth = currentDate.endOf("month");
  const startDate = startOfMonth.startOf("week");
  const endDate = endOfMonth.endOf("week");

  const dateRange = [];
  let tempDate = startDate;
  while (tempDate.isBefore(endDate) || tempDate.isSame(endDate, "day")) {
    dateRange.push(tempDate);
    tempDate = tempDate.add(1, "day");
  }

  const handleEventCreate = (event) => {
    setEvents([...events, event]);
    setShowForm(false);
  };

  const handleMarkDone = (id) => {
  setEvents(events.map(e => e.id === id ? { ...e, done: !e.done } : e));
};

const handleDelete = (id) => {
  if (window.confirm("Are you sure you want to delete this event?")) {
    setEvents(events.filter(e => e.id !== id));
  }
};

  return (
    <div className="min-h-screen bg-gray-50">
      <CalendarHeader
        currentDate={currentDate}
        goToToday={goToToday}
        changeMonth={changeMonth}
        viewMode={viewMode}
        setViewMode={setViewMode}
        onCreateClick={() => {
          setSelectedDate(dayjs());
          setShowForm(true);
        }}
      />

      {todayEvents.length > 0 && (
        <div className="mx-6 mt-4 p-4 bg-white rounded shadow">
          <h3 className="text-lg font-semibold text-blue-600 mb-2">
            Events Today ({dayjs().format("MMM D, YYYY")}):
          </h3>
          <ul className="space-y-2">
            {todayEvents.map((event) => (
              <li key={event.id} className="flex items-start space-x-3">
                <div className={`w-3 h-3 mt-1 rounded-full bg-${event.color}-500`} />
                <div>
                  <div className="font-medium text-gray-800">{event.title}</div>
                  <div className="text-sm text-gray-500">
                    {event.time} • {event.duration} min
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {viewMode === "month" && (
        <>
          <div className="grid grid-cols-7 gap-px bg-gray-200 mx-6 mt-4 text-center text-sm font-medium text-gray-500">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="py-2 bg-white">{day}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-px bg-gray-200 mx-6">
            {dateRange.map((date, idx) => (
              <DayCell
                key={idx}
                date={date}
                currentMonth={currentDate.month()}
                events={events.filter(
                  (e) => e.date === date.format("YYYY-MM-DD")
                )}
                onClick={() => {
                  setSelectedDate(date);
                  setShowEventModal(true);
                }}
              />
            ))}
          </div>
        </>
      )}

      {viewMode === "list" && (
  <div className="mt-6 mx-6">
    {events.length === 0 ? (
      <p className="text-gray-500 text-center">No events available.</p>
    ) : (
      <div className="space-y-4">
        {events
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .map((event) => (
            <div
              key={event.id}
              className="border p-4 rounded-md bg-white shadow-sm"
            >
              <div className="text-sm text-gray-500 mb-1">
                {dayjs(event.date).format("MMM D, YYYY")}
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h3
                    className={`font-semibold ${
                      event.done ? "line-through text-gray-400" : "text-gray-800"
                    }`}
                  >
                    {event.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {event.time} • {event.duration} min
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      setEvents((prev) =>
                        prev.map((e) =>
                          e.id === event.id ? { ...e, done: !e.done } : e
                        )
                      )
                    }
                    className="text-green-600 text-xs hover:underline"
                  >
                    {event.done ? "Undo" : "Done"}
                  </button>
                  <button
                    onClick={() =>
                      setEvents((prev) => prev.filter((e) => e.id !== event.id))
                    }
                    className="text-red-500 text-xs hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    )}
  </div>
)}


      {showForm && selectedDate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <EventForm
            date={selectedDate}
            onSave={handleEventCreate}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      {showEventModal && selectedDate && (
        <EventModal
  selectedDate={selectedDate}
  events={events.filter(
    (e) => e.date === selectedDate.format("YYYY-MM-DD")
  )}
  onClose={() => setShowEventModal(false)}
  onAddEvent={() => {
    setShowEventModal(false);
    setShowForm(true);
  }}
  onMarkDone={handleMarkDone}
  onDelete={handleDelete}
/>

      )}
    </div>
  );
}
