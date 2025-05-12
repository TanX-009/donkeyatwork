import { useMemo, useState } from "react";
import styles from "./styles.module.css";
import type { CalendarEvent } from "../../types/Event";

interface EventModalProps {
  allEvents: CalendarEvent[];
  date: string;
  onSave: (title: string) => void;
  onClose: () => void;
}

export default function EventModal({
  allEvents,
  date,
  onSave,
  onClose,
}: EventModalProps) {
  const [title, setTitle] = useState("");

  const events = useMemo(
    () => allEvents.filter((e) => e.date === date),
    [allEvents, date],
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSave(title.trim());
      setTitle("");
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {events.length > 0 ? (
          <ul className={styles.eventList}>
            {events.map((event) => (
              <li key={event.id}>{event.title}</li>
            ))}
          </ul>
        ) : (
          <p className={styles.noEvents}>No events yet.</p>
        )}

        <h3>Add Event - {date}</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Event title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
          <div className={styles.actions}>
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
