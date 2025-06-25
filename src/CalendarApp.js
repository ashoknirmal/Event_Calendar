import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import CalendarHeader from "./components/CalendarHeader";
import DayCell from "./components/DayCell";
import EventModal from "./components/EventModal";
import EventForm from "./components/EventForm";
import {
  Calendar,
  Clock,
  Check,
  Trash2,
  RotateCcw,
} from "lucide-react";
import {
  getCategoryBorder,
  getCategoryColor,
  formatDate,
} from "./utils/helpers";

export default function CalendarApp() {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [viewMode, setViewMode] = useState("month");
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);

  const colorMap = {
    red: "bg-red-500",
    green: "bg-green-500",
    blue: "bg-blue-500",
    purple: "bg-purple-500",
    orange: "bg-orange-500",
    teal: "bg-teal-500",
  };

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("calendarEvents")) || [];
    fetch("/events.json")
      .then((res) => res.json())
      .then((jsonEvents) => {
        const merged = [...jsonEvents, ...stored];
        setEvents(merged);
      })
      .catch(() => {
        setEvents(stored);
      });
  }, []);

  useEffect(() => {
    const userEvents = events.filter((e) => !e.fromStatic);
    localStorage.setItem("calendarEvents", JSON.stringify(userEvents));
  }, [events]);

  const goToToday = () => setCurrentDate(dayjs());
  const changeMonth = (offset) => setCurrentDate(currentDate.add(offset, "month"));

  const todayEvents = events.filter(
    (e) => e.date === dayjs().format("YYYY-MM-DD")
  );

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
    const newEvent = { ...event, id: Date.now(), fromStatic: false };
    setEvents([...events, newEvent]);
    setShowForm(false);
  };

  const handleMarkDone = (id) => {
    setEvents(events.map((e) => (e.id === id ? { ...e, done: !e.done } : e)));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      setEvents(events.filter((e) => e.id !== id));
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

      {/* Today’s Events - Fancy UI */}
      {todayEvents.length > 0 && (
        <div className="mx-4 sm:mx-6 mt-6">
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <h3 className="text-lg font-bold text-white">
                  Today's Events
                </h3>
                <div className="ml-auto bg-white/20 px-3 py-1 rounded-full">
                  <span className="text-sm font-medium text-white">
                    {dayjs().format("MMM D, YYYY")}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                {todayEvents.map((event) => (
                  <div
                    key={event.id}
                    className="group relative flex items-start space-x-4 p-4 rounded-xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
                  >
                    <div className="relative flex-shrink-0 mt-1">
                      <div
                        className={`w-4 h-4 rounded-full ${
                          colorMap[event.color] || "bg-gray-400"
                        } shadow-sm`}
                      />
                      <div
                        className={`absolute inset-0 w-4 h-4 rounded-full ${
                          colorMap[event.color] || "bg-gray-400"
                        } opacity-30 animate-ping group-hover:animate-pulse`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <h4 className="font-semibold text-gray-900 text-base leading-tight group-hover:text-blue-600 transition-colors">
                          {event.title}
                        </h4>
                        <div className="ml-2 flex-shrink-0">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                            {event.duration} min
                          </span>
                        </div>
                      </div>
                      <div className="mt-1 flex items-center text-sm text-gray-500">
                        <svg
                          className="w-4 h-4 mr-1.5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {event.time}
                      </div>
                    </div>
                    <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-blue-100 transition-all duration-200 pointer-events-none" />
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 text-center text-sm text-gray-500">
                <svg
                  className="w-4 h-4 mr-1.5 inline"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {todayEvents.length}{" "}
                {todayEvents.length === 1 ? "event" : "events"} scheduled for
                today
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Month View Calendar Grid */}
      {viewMode === "month" && (
        <>
          <div className="grid grid-cols-7 gap-px bg-gray-200 mx-6 mt-4 text-center text-sm font-medium text-gray-500">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="py-2 bg-white">
                {day}
              </div>
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

      {/* List View */}
      {viewMode === "list" && (
        <div className="max-w-4xl mx-auto px-6 py-8">
          {events.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No events yet
              </h3>
              <p className="text-gray-500 mb-6">
                Start by adding your first event to get organized!
              </p>
              <button
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
                onClick={() => {
                  setSelectedDate(dayjs());
                  setShowForm(true);
                }}
              >
                Create Your First Event
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {events
                .sort((a, b) => new Date(a.date) - new Date(b.date))
                .map((event, index) => (
                  <div
                    key={event.id}
                    className={`group relative bg-white/70 backdrop-blur-sm border-l-4 ${getCategoryBorder(
                      event.category
                    )} rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden`}
                  >
                    {event.done && (
                      <div className="absolute inset-0 bg-gradient-to-r from-green-50/80 to-emerald-50/80 backdrop-blur-sm"></div>
                    )}
                    <div className="relative p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-3 mb-3">
                            <div
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white ${getCategoryColor(
                                event.category
                              )}`}
                            >
                              {formatDate(event.date)}
                            </div>
                            <div className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                              {event.category}
                            </div>
                          </div>
                          <h3
                            className={`text-lg font-semibold mb-2 transition-all duration-200 ${
                              event.done
                                ? "line-through text-gray-400"
                                : "text-gray-800 group-hover:text-gray-900"
                            }`}
                          >
                            {event.title}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                              <span>{event.duration} min</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <button
                            onClick={() => handleMarkDone(event.id)}
                            className={`p-2 rounded-xl transition-all duration-200 transform hover:scale-110 ${
                              event.done
                                ? "bg-amber-100 hover:bg-amber-200 text-amber-600"
                                : "bg-green-100 hover:bg-green-200 text-green-600"
                            }`}
                            title={
                              event.done ? "Mark as undone" : "Mark as done"
                            }
                          >
                            {event.done ? (
                              <RotateCcw className="w-4 h-4" />
                            ) : (
                              <Check className="w-4 h-4" />
                            )}
                          </button>
                          <button
                            onClick={() => handleDelete(event.id)}
                            className="p-2 rounded-xl bg-red-100 hover:bg-red-200 text-red-600 transition-all duration-200 transform hover:scale-110"
                            title="Delete event"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}

      {/* Modal for Creating Event */}
      {showForm && selectedDate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <EventForm
            date={selectedDate}
            onSave={handleEventCreate}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      {/* Event Detail Modal */}
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
