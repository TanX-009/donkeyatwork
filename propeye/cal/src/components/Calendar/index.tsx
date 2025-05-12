import { useMemo, useState } from "react";
import styles from "./styles.module.css";
import { formatDate, getCalendarGrid } from "../../systems/dateUtils";
import type { CalendarEvent } from "../../types/Event";
import { isSameDay, isToday } from "date-fns";
import { parseISO } from "date-fns/fp";

interface TProps {
  events: CalendarEvent[];
  onDateClick: (date: string) => void;
}

export default function Calendar({ events, onDateClick }: TProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const days = useMemo(() => getCalendarGrid(currentMonth), [currentMonth]);

  const handlePrev = () =>
    setCurrentMonth(
      () => new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1),
    );
  const handleNext = () =>
    setCurrentMonth(
      () => new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1),
    );

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        <button onClick={handlePrev}>◀</button>
        <h2>
          {currentMonth.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <button onClick={handleNext}>▶</button>
      </div>
      <div className={styles.grid}>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className={styles.dayHeader}>
            {day}
          </div>
        ))}
        {days.map((day) => {
          const dayEvents = events.filter((e) =>
            isSameDay(parseISO(e.date), day),
          );
          return (
            <div
              key={day.toISOString()}
              className={`${styles.dayCell} ${isToday(day) ? styles.today : ""} ${dayEvents.length > 0 ? styles.hasEvent : ""}`}
              onClick={() => onDateClick(formatDate(day))}
            >
              {day.getDate()}
              {dayEvents.map((event, key) => (
                <div key={key}>{event.title}</div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
