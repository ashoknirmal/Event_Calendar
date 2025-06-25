import React, { useState } from "react";
import { Calendar, Clock, Timer, Palette, Save, X, Sparkles } from "lucide-react";

export default function EventForm({ onSave, onCancel, date }) {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("");
  const [color, setColor] = useState("blue");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");

  const handleSubmit = () => {
    if (!title || !time || !duration) return;
    onSave({
      id: Date.now(),
      title,
      time,
      duration,
      color,
      description,
      priority,
      date: date?.format ? date.format("YYYY-MM-DD") : "2024-01-01",
    });
  };

  const colorOptions = [
    { value: "blue", label: "Ocean Blue", class: "bg-blue-500" },
    { value: "green", label: "Forest Green", class: "bg-green-500" },
    { value: "red", label: "Coral Red", class: "bg-red-500" },
    { value: "purple", label: "Royal Purple", class: "bg-purple-500" },
    { value: "yellow", label: "Sunshine Yellow", class: "bg-yellow-500" },
    { value: "pink", label: "Rose Pink", class: "bg-pink-500" },
    { value: "indigo", label: "Deep Indigo", class: "bg-indigo-500" },
    { value: "teal", label: "Ocean Teal", class: "bg-teal-500" },
  ];

  const priorityOptions = [
    { value: "low", label: "Low", color: "text-gray-600" },
    { value: "medium", label: "Medium", color: "text-blue-600" },
    { value: "high", label: "High", color: "text-red-600" },
  ];

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4 z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-lg border">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg font-bold">Create Event</h2>
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {date?.format ? date.format("MMM D, YYYY") : "January 1, 2024"}
            </p>
          </div>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Event Title</label>
            <input
              className="w-full border rounded-md px-3 py-2 text-sm"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Time</label>
              <input
                className="w-full border rounded-md px-3 py-2 text-sm"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="10:00 AM"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Duration</label>
              <input
                className="w-full border rounded-md px-3 py-2 text-sm"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="60 min"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              rows={3}
              className="w-full border rounded-md px-3 py-2 text-sm"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Event description (optional)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Priority</label>
            <div className="flex gap-2">
              {priorityOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setPriority(option.value)}
                  className={`px-3 py-1.5 rounded-md border text-sm ${
                    priority === option.value
                      ? "bg-gray-100 border-gray-400 font-semibold"
                      : "bg-white border-gray-200"
                  } ${option.color}`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Color</label>
            <div className="grid grid-cols-4 gap-2">
              {colorOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setColor(option.value)}
                  className={`h-8 rounded-md ${option.class} ${
                    color === option.value ? "ring-2 ring-gray-400" : ""
                  }`}
                  title={option.label}
                ></button>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!title || !time || !duration}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md disabled:opacity-50"
          >
            <Save className="w-4 h-4 inline mr-1" />
            Save
          </button>
        </div>
      </div>
    </div>
  );
}







// import React, { useState } from "react";
// import { Calendar, Clock, Timer, Palette, Save, X, Sparkles } from "lucide-react";

// export default function EventForm({ onSave, onCancel, date }) {
//   const [title, setTitle] = useState("");
//   const [time, setTime] = useState("");
//   const [duration, setDuration] = useState("");
//   const [color, setColor] = useState("blue");
//   const [description, setDescription] = useState("");
//   const [priority, setPriority] = useState("medium");

//   const handleSubmit = () => {
//     if (!title || !time || !duration) return;
//     onSave({
//       id: Date.now(),
//       title,
//       time,
//       duration,
//       color,
//       description,
//       priority,
//       date: date?.format ? date.format("YYYY-MM-DD") : "2024-01-01",
//     });
//   };

//   const colorOptions = [
//     { value: "blue", label: "Ocean Blue", class: "bg-blue-500" },
//     { value: "green", label: "Forest Green", class: "bg-green-500" },
//     { value: "red", label: "Coral Red", class: "bg-red-500" },
//     { value: "purple", label: "Royal Purple", class: "bg-purple-500" },
//     { value: "yellow", label: "Sunshine Yellow", class: "bg-yellow-500" },
//     { value: "pink", label: "Rose Pink", class: "bg-pink-500" },
//     { value: "indigo", label: "Deep Indigo", class: "bg-indigo-500" },
//     { value: "teal", label: "Ocean Teal", class: "bg-teal-500" },
//   ];

//   const priorityOptions = [
//     { value: "low", label: "Low Priority", color: "text-gray-600" },
//     { value: "medium", label: "Medium Priority", color: "text-blue-600" },
//     { value: "high", label: "High Priority", color: "text-red-600" },
//   ];

//   return (
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//       <div className="bg-white/95 backdrop-blur-md p-8 rounded-3xl shadow-2xl w-full max-w-lg border border-white/20 relative overflow-hidden">
//         {/* Decorative background elements */}
//         <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-2xl -translate-y-16 translate-x-16"></div>
//         <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-400/20 to-yellow-500/20 rounded-full blur-xl translate-y-12 -translate-x-12"></div>
        
//         <div className="relative z-10">
//           {/* Header */}
//           <div className="flex items-center justify-between mb-6">
//             <div className="flex items-center space-x-3">
//               <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
//                 <Sparkles className="w-5 h-5 text-white" />
//               </div>
//               <div>
//                 <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
//                   Create Event
//                 </h2>
//                 <p className="text-sm text-gray-500 flex items-center space-x-1">
//                   <Calendar className="w-4 h-4" />
//                   <span>{date?.format ? date.format("MMM D, YYYY") : "January 1, 2024"}</span>
//                 </p>
//               </div>
//             </div>
//             <button 
//               onClick={onCancel}
//               className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200 hover:scale-110"
//             >
//               <X className="w-5 h-5" />
//             </button>
//           </div>

//           {/* Form Fields */}
//           <div className="space-y-5">
//             {/* Title Input */}
//             <div className="space-y-2">
//               <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
//                 <Sparkles className="w-4 h-4 text-blue-500" />
//                 <span>Event Title</span>
//               </label>
//               <input 
//                 className="w-full bg-white/70 backdrop-blur-sm border border-gray-300/50 p-4 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 hover:bg-white/90 transition-all duration-200 shadow-sm"
//                 placeholder="Enter your event title..."
//                 value={title} 
//                 onChange={(e) => setTitle(e.target.value)} 
//               />
//             </div>

//             {/* Time and Duration Row */}
//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
//                   <Clock className="w-4 h-4 text-green-500" />
//                   <span>Time</span>
//                 </label>
//                 <input 
//                   className="w-full bg-white/70 backdrop-blur-sm border border-gray-300/50 p-4 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 hover:bg-white/90 transition-all duration-200 shadow-sm"
//                   placeholder="10:00 AM"
//                   value={time} 
//                   onChange={(e) => setTime(e.target.value)} 
//                 />
//               </div>
//               <div className="space-y-2">
//                 <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
//                   <Timer className="w-4 h-4 text-purple-500" />
//                   <span>Duration</span>
//                 </label>
//                 <input 
//                   className="w-full bg-white/70 backdrop-blur-sm border border-gray-300/50 p-4 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 hover:bg-white/90 transition-all duration-200 shadow-sm"
//                   placeholder="60 min"
//                   value={duration} 
//                   onChange={(e) => setDuration(e.target.value)} 
//                 />
//               </div>
//             </div>

//             {/* Description */}
//             <div className="space-y-2">
//               <label className="text-sm font-semibold text-gray-700">
//                 Description (Optional)
//               </label>
//               <textarea 
//                 className="w-full bg-white/70 backdrop-blur-sm border border-gray-300/50 p-4 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 hover:bg-white/90 transition-all duration-200 shadow-sm resize-none"
//                 placeholder="Add event details..."
//                 rows={3}
//                 value={description} 
//                 onChange={(e) => setDescription(e.target.value)} 
//               />
//             </div>

//             {/* Priority */}
//             <div className="space-y-2">
//               <label className="text-sm font-semibold text-gray-700">Priority</label>
//               <div className="grid grid-cols-3 gap-2">
//                 {priorityOptions.map((option) => (
//                   <button
//                     key={option.value}
//                     onClick={() => setPriority(option.value)}
//                     className={`p-3 rounded-xl text-sm font-medium transition-all duration-200 border ${
//                       priority === option.value
//                         ? 'bg-white shadow-md border-gray-300 scale-105'
//                         : 'bg-white/50 border-gray-200 hover:bg-white/80'
//                     } ${option.color}`}
//                   >
//                     {option.label}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Color Selection */}
//             <div className="space-y-2">
//               <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
//                 <Palette className="w-4 h-4 text-pink-500" />
//                 <span>Event Color</span>
//               </label>
//               <div className="grid grid-cols-4 gap-3">
//                 {colorOptions.map((option) => (
//                   <button
//                     key={option.value}
//                     onClick={() => setColor(option.value)}
//                     className={`group relative p-3 rounded-xl transition-all duration-200 hover:scale-105 ${
//                       color === option.value ? 'ring-2 ring-gray-400 shadow-lg' : ''
//                     }`}
//                   >
//                     <div className={`w-full h-8 ${option.class} rounded-lg shadow-sm group-hover:shadow-md transition-shadow duration-200`}></div>
//                     <span className="text-xs text-gray-600 mt-1 block truncate">{option.label}</span>
//                     {color === option.value && (
//                       <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full border-2 border-gray-400"></div>
//                     )}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex space-x-3 mt-8">
//             <button 
//               onClick={onCancel} 
//               className="flex-1 bg-gray-100/80 backdrop-blur-sm text-gray-700 py-3 px-4 rounded-xl font-semibold hover:bg-gray-200/80 transition-all duration-200 hover:scale-105 shadow-sm"
//             >
//               Cancel
//             </button>
//             <button 
//               onClick={handleSubmit} 
//               disabled={!title || !time || !duration}
//               className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2"
//             >
//               <Save className="w-4 h-4" />
//               <span>Save Event</span>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }