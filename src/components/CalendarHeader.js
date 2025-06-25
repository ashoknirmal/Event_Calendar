import { ChevronLeft, ChevronRight, Plus, Search, Grid3X3, List, Settings, Menu } from "lucide-react";
import { useState } from "react";

export default function CalendarHeader({ currentDate, goToToday, changeMonth, viewMode, setViewMode, onCreateClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/60 px-4 sm:px-6 py-3 sm:py-4 sticky top-0 z-10">
      {/* Mobile Layout */}
      <div className="block sm:hidden">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Calendar
            </h1>
            <button 
              onClick={goToToday} 
              className="px-2 py-1 text-xs font-semibold text-gray-700 bg-white/70 backdrop-blur-sm border border-gray-300/50 rounded-lg hover:bg-white transition-all duration-200"
            >
              Today
            </button>
          </div>
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-white/80 rounded-lg transition-all duration-200"
            >
              <Search className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-white/80 rounded-lg transition-all duration-200"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="mb-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search events..." 
                className="pl-9 pr-4 py-2 w-full text-sm bg-white/70 backdrop-blur-sm border border-gray-300/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 placeholder-gray-400"
              />
            </div>
          </div>
        )}

        {/* Mobile Navigation */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex items-center bg-white/60 backdrop-blur-sm rounded-lg border border-gray-200/60 p-0.5">
              <button 
                onClick={() => changeMonth(-1)} 
                className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-white/80 rounded transition-all duration-200"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={() => changeMonth(1)} 
                className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-white/80 rounded transition-all duration-200"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <h2 className="text-sm font-semibold text-gray-800">
              {currentDate?.format ? currentDate.format("MMM YYYY") : "Jan 2024"}
            </h2>
          </div>

          <button 
            onClick={onCreateClick} 
            className="flex items-center space-x-1 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-xs font-semibold rounded-lg shadow-md transition-all duration-200"
          >
            <Plus className="w-3 h-3" />
            <span>Create</span>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="mt-3 p-3 bg-white/90 backdrop-blur-sm border border-gray-200/60 rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-700">View Mode</span>
              <div className="flex items-center space-x-1 bg-gray-100/80 backdrop-blur-sm rounded-lg p-0.5">
                <button 
                  onClick={() => setViewMode('month')} 
                  className={`p-1.5 rounded transition-all duration-200 ${
                    viewMode === 'month' 
                      ? 'bg-white shadow-sm text-gray-900' 
                      : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
                  }`}
                >
                  <Grid3X3 className="w-3 h-3" />
                </button>
                <button 
                  onClick={() => setViewMode('list')} 
                  className={`p-1.5 rounded transition-all duration-200 ${
                    viewMode === 'list' 
                      ? 'bg-white shadow-sm text-gray-900' 
                      : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
                  }`}
                >
                  <List className="w-3 h-3" />
                </button>
              </div>
            </div>
            <button className="flex items-center space-x-2 w-full p-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-all duration-200">
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </button>
          </div>
        )}
      </div>

      {/* Desktop Layout */}
      <div className="hidden sm:flex items-center justify-between">
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex items-center space-x-3 lg:space-x-4">
            <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Calendar
            </h1>
            <button 
              onClick={goToToday} 
              className="px-3 lg:px-4 py-2 lg:py-2.5 text-sm font-semibold text-gray-700 bg-white/70 backdrop-blur-sm border border-gray-300/50 rounded-xl hover:bg-white hover:shadow-md hover:border-gray-400/50 transition-all duration-200 hover:scale-105"
            >
              Today
            </button>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/60 p-0.5 shadow-sm">
              <button 
                onClick={() => changeMonth(-1)} 
                className="p-2 lg:p-2.5 text-gray-500 hover:text-gray-700 hover:bg-white/80 rounded-lg transition-all duration-200 hover:scale-110"
              >
                <ChevronLeft className="w-4 lg:w-5 h-4 lg:h-5" />
              </button>
              <button 
                onClick={() => changeMonth(1)} 
                className="p-2 lg:p-2.5 text-gray-500 hover:text-gray-700 hover:bg-white/80 rounded-lg transition-all duration-200 hover:scale-110"
              >
                <ChevronRight className="w-4 lg:w-5 h-4 lg:h-5" />
              </button>
            </div>
            <h2 className="text-lg lg:text-xl font-bold text-gray-800 min-w-[140px] lg:min-w-[200px] tracking-tight">
              {currentDate?.format ? currentDate.format("MMMM YYYY") : "January 2024"}
            </h2>
          </div>
        </div>

        <div className="flex items-center space-x-3 lg:space-x-4">
          <div className="relative group hidden md:block">
            <Search className="w-4 lg:w-5 h-4 lg:h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
            <input 
              type="text" 
              placeholder="Search events..." 
              className="pl-8 lg:pl-10 pr-4 py-2 lg:py-2.5 w-48 lg:w-72 text-sm bg-white/70 backdrop-blur-sm border border-gray-300/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 hover:bg-white/90 transition-all duration-200 placeholder-gray-400"
            />
          </div>

          <div className="flex items-center space-x-1 bg-gray-100/80 backdrop-blur-sm rounded-xl p-1 shadow-sm border border-gray-200/40">
            <button 
              onClick={() => setViewMode('month')} 
              className={`p-2 lg:p-2.5 rounded-lg transition-all duration-200 ${
                viewMode === 'month' 
                  ? 'bg-white shadow-md text-gray-900 scale-105' 
                  : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
              }`}
            >
              <Grid3X3 className="w-3 lg:w-4 h-3 lg:h-4" />
            </button>
            <button 
              onClick={() => setViewMode('list')} 
              className={`p-2 lg:p-2.5 rounded-lg transition-all duration-200 ${
                viewMode === 'list' 
                  ? 'bg-white shadow-md text-gray-900 scale-105' 
                  : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
              }`}
            >
              <List className="w-3 lg:w-4 h-3 lg:h-4" />
            </button>
          </div>

          <button className="p-2 lg:p-2.5 text-gray-500 hover:text-gray-700 hover:bg-white/80 rounded-xl transition-all duration-200 hover:scale-110 backdrop-blur-sm">
            <Settings className="w-4 lg:w-5 h-4 lg:h-5" />
          </button>

          <button 
            onClick={onCreateClick} 
            className="flex items-center space-x-2 px-4 lg:px-5 py-2 lg:py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 backdrop-blur-sm"
          >
            <Plus className="w-3 lg:w-4 h-3 lg:h-4" />
            <span className="hidden sm:inline">Create</span>
          </button>
        </div>
      </div>
    </div>
  );
}