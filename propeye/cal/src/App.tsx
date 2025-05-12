import { useState } from "react";
import styles from "./app.module.css";
import Calendar from "./components/Calendar";
import EventModal from "./components/EventAdder";
import type { CalendarEvent } from "./types/Event";

function App() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [currentDate, setCurrentDate] = useState<string | null>(null);

  console.log(events);

  const onDateClick = (date: string) => {
    setCurrentDate(date);
  };
  const onSave = (title: string) => {
    if (currentDate === null) {
      console.error("Current date required!");
    }

    const date = currentDate || "";

    const updatedEvents = events;
    updatedEvents.push({
      id: date,
      date: date,
      title: title,
    });

    setEvents(updatedEvents);
    setCurrentDate(null);
  };
  const onClose = () => {
    setCurrentDate(null);
  };

  return (
    <>
      <Calendar events={events} onDateClick={onDateClick} />
      {currentDate ? (
        <EventModal
          allEvents={events}
          date={currentDate}
          onSave={onSave}
          onClose={onClose}
        />
      ) : null}
    </>
  );
}

export default App;
