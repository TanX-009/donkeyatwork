import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  format,
} from "date-fns";

export const getCalendarGrid = (month: Date) => {
  const start = startOfWeek(startOfMonth(month), { weekStartsOn: 0 });
  const end = endOfWeek(endOfMonth(month), { weekStartsOn: 0 });

  return eachDayOfInterval({ start, end });
};

export const formatDate = (date: Date) => format(date, "yyyy-MM-dd");
