// utils/helpers.js
import dayjs from "dayjs";

export const getCategoryBorder = (category) => {
  switch (category) {
    case "Work": return "border-blue-500";
    case "Personal": return "border-green-500";
    case "Health": return "border-red-500";
    default: return "border-gray-300";
  }
};

export const getCategoryColor = (category) => {
  switch (category) {
    case "Work": return "bg-blue-600";
    case "Personal": return "bg-green-600";
    case "Health": return "bg-red-600";
    default: return "bg-gray-500";
  }
};

export const formatDate = (dateStr) => {
  return dayjs(dateStr).format("MMM D, YYYY");
};
