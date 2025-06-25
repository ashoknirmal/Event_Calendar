export default function EventModal({
  selectedDate,
  events = [],
  onClose,
  onAddEvent,
  onMarkDone,
  onDelete,
}) {
  // Handle case where selectedDate might be undefined
  if (!selectedDate) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 transform transition-all duration-300 scale-100">
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-2xl p-6 text-white">
          <h3 className="text-xl font-bold tracking-tight">
            {selectedDate.format ? 
              `${selectedDate.format("MMMM")} ${selectedDate.date()}, ${selectedDate.year()}` :
              selectedDate.toLocaleDateString ? 
                selectedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) :
                'Selected Date'
            }
          </h3>
          <p className="text-blue-100 text-sm mt-1 opacity-90">
            {events.length} {events.length === 1 ? 'event' : 'events'} scheduled
          </p>
        </div>

        {/* Events list */}
        <div className="p-6">
          <div className="space-y-3 mb-6 max-h-80 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {events.length > 0 ? (
              events.map((event, index) => (
                <div
                  key={event.id}
                  className={`group flex items-start space-x-4 p-4 rounded-xl border transition-all duration-200 hover:shadow-md hover:scale-[1.02] ${
                    event.done 
                      ? 'bg-gray-50 border-gray-200' 
                      : 'bg-white border-gray-200 hover:border-gray-300 shadow-sm'
                  }`}
                >
                  {/* Color indicator with glow effect */}
                  <div className={`w-4 h-4 rounded-full bg-${event.color}-500 mt-1 shadow-lg ring-2 ring-${event.color}-200 flex-shrink-0`} />
                  
                  <div className="flex-1 min-w-0">
                    <div
                      className={`font-semibold text-gray-900 transition-all duration-200 ${
                        event.done ? "line-through text-gray-400" : ""
                      }`}
                    >
                      {event.title}
                    </div>
                    <div
                      className={`text-sm flex items-center space-x-2 mt-1 ${
                        event.done ? "line-through text-gray-400" : "text-gray-600"
                      }`}
                    >
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {event.time}
                      </span>
                      <span className="text-gray-400">•</span>
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        {event.duration} min
                      </span>
                    </div>
                  </div>

                  {/* Action buttons with improved styling */}
                  <div className="flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                      onClick={() => onMarkDone(event.id)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                        event.done
                          ? 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                          : 'bg-green-100 text-green-700 hover:bg-green-200'
                      }`}
                    >
                      {event.done ? "Undo" : "Done"}
                    </button>
                    <button
                      onClick={() => onDelete(event.id)}
                      className="px-3 py-1.5 text-xs font-medium rounded-full bg-red-100 text-red-700 hover:bg-red-200 transition-all duration-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-gray-500 font-medium">No events scheduled</p>
                <p className="text-gray-400 text-sm mt-1">Add your first event to get started</p>
              </div>
            )}
          </div>

          {/* Action buttons with improved styling */}
          <div className="flex space-x-3 pt-4 border-t border-gray-100">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
            >
              Close
            </button>
            <button
              onClick={onAddEvent}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Add Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}