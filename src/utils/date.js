export const createDate = (year, month, day = 1) => {
  const date = new Date(year, month, day);
  return {
    year: () => year,
    month: () => month,
    date: () => date.getDate(),
    day: () => date.getDay(),
    format: (format) => {
      if (format === "MMMM YYYY") return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      if (format === "YYYY-MM-DD") return date.toISOString().split('T')[0];
      return date.toLocaleDateString();
    },
    startOf: (unit) => unit === "month" ? createDate(year, month, 1) : createDate(year, month, day),
    subtract: (amount, unit) => {
      const newDate = new Date(year, month, day - (unit === 'day' ? amount : 0));
      return createDate(newDate.getFullYear(), newDate.getMonth(), newDate.getDate());
    },
    add: (amount, unit) => {
      const newDate = new Date(year, month, day);
      if (unit === "month") newDate.setMonth(newDate.getMonth() + amount);
      if (unit === "day") newDate.setDate(newDate.getDate() + amount);
      return createDate(newDate.getFullYear(), newDate.getMonth(), newDate.getDate());
    },
    daysInMonth: () => new Date(year, month + 1, 0).getDate(),
    isSame: (other, unit) => unit === "day" && year === other.year() && month === other.month() && day === other.date()
  };
};

export const today = (() => {
  const now = new Date();
  return createDate(now.getFullYear(), now.getMonth(), now.getDate());
})();

export const getDaysInMonth = (year, month) => {
  const start = createDate(year, month).startOf("month");
  const offset = start.day();
  const grid = [];
  let current = start.subtract(offset, "day");
  for (let i = 0; i < 42; i++) {
    grid.push(current);
    current = current.add(1, "day");
  }
  return grid;
};

export const groupEventsByDate = (events) => {
  const map = {};
  for (const event of events) {
    if (!map[event.date]) map[event.date] = [];
    map[event.date].push(event);
  }
  return map;
};
