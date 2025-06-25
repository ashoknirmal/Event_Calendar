import { Plus, MoreHorizontal } from "lucide-react";

export default function DayCell({ date, currentMonth, events = [], onClick }) {
  const colorMap = {
    blue: {
      bg: "bg-gradient-to-r from-blue-50 to-blue-100",
      text: "text-blue-700",
      border: "border-blue-200",
      dot: "bg-blue-500"
    },
    red: {
      bg: "bg-gradient-to-r from-red-50 to-red-100", 
      text: "text-red-700",
      border: "border-red-200",
      dot: "bg-red-500"
    },
    green: {
      bg: "bg-gradient-to-r from-green-50 to-green-100",
      text: "text-green-700", 
      border: "border-green-200",
      dot: "bg-green-500"
    },
    yellow: {
      bg: "bg-gradient-to-r from-yellow-50 to-yellow-100",
      text: "text-yellow-700",
      border: "border-yellow-200", 
      dot: "bg-yellow-500"
    },
    purple: {
      bg: "bg-gradient-to-r from-purple-50 to-purple-100",
      text: "text-purple-700",
      border: "border-purple-200",
      dot: "bg-purple-500"
    },
    pink: {
      bg: "bg-gradient-to-r from-pink-50 to-pink-100",
      text: "text-pink-700",
      border: "border-pink-200",
      dot: "bg-pink-500"
    },
    indigo: {
      bg: "bg-gradient-to-r from-indigo-50 to-indigo-100",
      text: "text-indigo-700",
      border: "border-indigo-200",
      dot: "bg-indigo-500"
    },
    teal: {
      bg: "bg-gradient-to-r from-teal-50 to-teal-100",
      text: "text-teal-700",
      border: "border-teal-200",
      dot: "bg-teal-500"
    }
  };

  // Helper function to check if it's today using native Date
  const isToday = () => {
    if (!date) return false;
    const today = new Date();
    const dateObj = typeof date === 'object' && date.date ? 
      new Date(date.year(), date.month(), date.date()) : 
      new Date(date);
    
    return dateObj.toDateString() === today.toDateString();
  };

  // Helper function to get month from date
  const getMonth = () => {
    if (!date) return 0;
    return typeof date === 'object' && date.month ? date.month() : new Date(date).getMonth();
  };

  // Helper function to get day of week
  const getDayOfWeek = () => {
    if (!date) return 0;
    const dateObj = typeof date === 'object' && date.day ? 
      date : 
      new Date(date);
    return typeof dateObj.day === 'function' ? dateObj.day() : dateObj.getDay();
  };

  // Helper function to get date number
  const getDateNumber = () => {
    if (!date) return 1;
    return typeof date === 'object' && date.date ? date.date() : new Date(date).getDate();
  };

  const isTodayCheck = isToday();
  const isOtherMonth = getMonth() !== currentMonth;
  const isWeekend = getDayOfWeek() === 0 || getDayOfWeek() === 6;
  const hasEvents = events.length > 0;
  const visibleEvents = events.slice(0, 3);
  const hiddenEventsCount = events.length - 3;

  return (
    <div 
      className={`group relative h-36 p-3 border cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 hover:z-10 overflow-hidden ${
  isTodayCheck 
    ? "bg-gradient-to-br from-blue-50/80 to-indigo-50/80 border-blue-300 shadow-md" 
    : isWeekend 
      ? "bg-gradient-to-br from-red-50 to-red-100 border-red-200" 
      : "bg-white/80 hover:bg-white"
} ${isOtherMonth ? "opacity-40" : ""}`}

      onClick={onClick}
    >
      {/* Decorative corner gradient */}
      {isTodayCheck && (
        <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-500 opacity-20 rounded-bl-full"></div>
      )}
      
      {/* Date Number */}
      <div className="flex items-center justify-between mb-2">
        <div className={`relative flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold transition-all duration-200 ${
          isTodayCheck 
            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-110" 
            : isOtherMonth 
              ? "text-gray-300" 
              : "text-gray-700 group-hover:bg-gray-100"
        }`}>
          {getDateNumber()}
          {isTodayCheck && (
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full opacity-20 animate-pulse"></div>
          )}
        </div>
        
        {/* Event indicator dots */}
        {hasEvents && (
          <div className="flex items-center space-x-1">
            {events.slice(0, 3).map((event, index) => (
              <div 
                key={event.id}
                className={`w-2 h-2 rounded-full ${colorMap[event.color]?.dot || "bg-gray-400"} shadow-sm`}
              ></div>
            ))}
            {events.length > 3 && (
              <div className="w-2 h-2 rounded-full bg-gray-300 shadow-sm"></div>
            )}
          </div>
        )}
      </div>

      {/* Events List */}
      <div className="space-y-1.5 overflow-hidden">
        {visibleEvents.map((event, index) => {
          const colors = colorMap[event.color] || {
            bg: "bg-gradient-to-r from-gray-50 to-gray-100",
            text: "text-gray-700",
            border: "border-gray-200",
            dot: "bg-gray-400"
          };
          
          return (
            <div 
              key={event.id}
              className={`group/event relative text-xs px-2 py-1.5 rounded-lg border transition-all duration-200 hover:shadow-md hover:scale-105 cursor-pointer overflow-hidden ${colors.bg} ${colors.text} ${colors.border}`}
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              <div className="flex items-center space-x-2">
                <div className={`w-1.5 h-1.5 rounded-full ${colors.dot} flex-shrink-0`}></div>
                <span className="truncate font-medium">{event.title}</span>
              </div>
              
              {/* Event time if available */}
              {event.time && (
                <div className="text-xs opacity-70 mt-0.5 ml-3.5 truncate">
                  {event.time}
                </div>
              )}
              
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/event:opacity-100 transition-opacity duration-200 rounded-lg"></div>
            </div>
          );
        })}
        
        {/* More events indicator */}
        {hiddenEventsCount > 0 && (
          <div className="flex items-center justify-center py-1 text-xs text-gray-500 font-medium">
            <MoreHorizontal className="w-3 h-3 mr-1" />
            <span>+{hiddenEventsCount} more</span>
          </div>
        )}
      </div>

      {/* Quick add button on hover */}
      <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
        <button className="w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 flex items-center justify-center">
          <Plus className="w-3 h-3" />
        </button>
      </div>

      {/* Weekend indicator */}
      {isWeekend && !isTodayCheck && (
        <div className="absolute top-1 left-1 w-1 h-1 bg-blue-300 rounded-full opacity-60"></div>
      )}

      {/* Focus ring for accessibility */}
      <div className="absolute inset-0 rounded-lg ring-2 ring-blue-500/50 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
    </div>
  );
}