import { ChevronLeft, ChevronRight, Plus, Search, Grid3X3, List, Settings } from "lucide-react";

export default function CalendarHeader({ currentDate, goToToday, changeMonth, viewMode, setViewMode, onCreateClick }) {
  return (
    <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/60 px-6 py-4 sticky top-0 z-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Calendar
            </h1>
            <button 
              onClick={goToToday} 
              className="px-4 py-2.5 text-sm font-semibold text-gray-700 bg-white/70 backdrop-blur-sm border border-gray-300/50 rounded-xl hover:bg-white hover:shadow-md hover:border-gray-400/50 transition-all duration-200 hover:scale-105"
            >
              Today
            </button>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/60 p-0.5 shadow-sm">
              <button 
                onClick={() => changeMonth(-1)} 
                className="p-2.5 text-gray-500 hover:text-gray-700 hover:bg-white/80 rounded-lg transition-all duration-200 hover:scale-110"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => changeMonth(1)} 
                className="p-2.5 text-gray-500 hover:text-gray-700 hover:bg-white/80 rounded-lg transition-all duration-200 hover:scale-110"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <h2 className="text-xl font-bold text-gray-800 min-w-[200px] tracking-tight">
              {currentDate?.format ? currentDate.format("MMMM YYYY") : "January 2024"}
            </h2>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative group">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
            <input 
              type="text" 
              placeholder="Search events..." 
              className="pl-10 pr-4 py-2.5 w-72 text-sm bg-white/70 backdrop-blur-sm border border-gray-300/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 hover:bg-white/90 transition-all duration-200 placeholder-gray-400"
            />
          </div>

          <div className="flex items-center space-x-1 bg-gray-100/80 backdrop-blur-sm rounded-xl p-1 shadow-sm border border-gray-200/40">
            <button 
              onClick={() => setViewMode('month')} 
              className={`p-2.5 rounded-lg transition-all duration-200 ${
                viewMode === 'month' 
                  ? 'bg-white shadow-md text-gray-900 scale-105' 
                  : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode('list')} 
              className={`p-2.5 rounded-lg transition-all duration-200 ${
                viewMode === 'list' 
                  ? 'bg-white shadow-md text-gray-900 scale-105' 
                  : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <button className="p-2.5 text-gray-500 hover:text-gray-700 hover:bg-white/80 rounded-xl transition-all duration-200 hover:scale-110 backdrop-blur-sm">
            <Settings className="w-5 h-5" />
          </button>

          <button 
            onClick={onCreateClick} 
            className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 backdrop-blur-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Create</span>
          </button>
        </div>
      </div>
    </div>
  );
}