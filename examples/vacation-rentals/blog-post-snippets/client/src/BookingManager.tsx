import { useMemo, useState } from "react";
import { sql } from "@databricks/appkit-ui/js";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Skeleton,
  useAnalyticsQuery,
} from "@databricks/appkit-ui/react";

export function BookingManager() {
  const [bookingId, setBookingId] = useState("");
  const [searchId, setSearchId] = useState<string | null>(null);
  const [flag, setFlag] = useState<any>(null);
  const [notes, setNotes] = useState<any[]>([]);
  const [newNote, setNewNote] = useState("");

  const params = useMemo(
    () => (searchId ? { bookingId: sql.number(Number(searchId)) } : undefined),
    [searchId],
  );
  const { data, loading, error } = useAnalyticsQuery("booking_detail", params, {
    autoStart: !!searchId,
  });

  const booking = data?.[0] ?? null;

  const handleLookup = async () => {
    setSearchId(bookingId);
    const [flagRes, notesRes] = await Promise.all([
      fetch(`/api/bookings/${bookingId}/flag`),
      fetch(`/api/bookings/${bookingId}/notes`),
    ]);
    setFlag(await flagRes.json());
    setNotes(await notesRes.json());
  };

  const handleFlag = async () => {
    if (flag) {
      await fetch(`/api/bookings/${bookingId}/flag`, { method: "DELETE" });
      setFlag(null);
    } else {
      const res = await fetch(`/api/bookings/${bookingId}/flag`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason: "flagged for review" }),
      });
      setFlag(await res.json());
    }
  };

  const handleAddNote = async () => {
    const res = await fetch(`/api/bookings/${bookingId}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ note: newNote }),
    });
    const created = await res.json();
    setNotes([created, ...notes]);
    setNewNote("");
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          className="rounded border px-3 py-1.5 text-sm"
          placeholder="Booking ID"
          value={bookingId}
          onChange={(e) => setBookingId(e.target.value)}
        />
        <button
          className="bg-primary text-primary-foreground rounded px-4 py-1.5 text-sm"
          onClick={handleLookup}
        >
          Look up
        </button>
      </div>

      {loading && <Skeleton className="h-48 w-full" />}
      {error && <p className="text-destructive">{error}</p>}

      {booking && (
        <Card>
          <CardHeader>
            <CardTitle>{booking.property_title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground space-y-1 text-sm">
              <p>
                {booking.guest_name} · {booking.guest_email}
              </p>
              <p>
                {booking.destination} · {booking.guests_count} guests
              </p>
              <p>
                {booking.check_in} → {booking.check_out} · {booking.status}
              </p>
              <p className="font-medium">${booking.total_amount}</p>
            </div>

            <button
              className={`mt-3 rounded px-3 py-1 text-sm ${
                flag
                  ? "bg-destructive text-destructive-foreground"
                  : "bg-secondary text-secondary-foreground"
              }`}
              onClick={handleFlag}
            >
              {flag ? "Unflag" : "Flag for review"}
            </button>

            <div className="mt-4 space-y-2">
              <h4 className="text-sm font-medium">Notes</h4>
              <div className="flex gap-2">
                <input
                  className="flex-1 rounded border px-3 py-1.5 text-sm"
                  placeholder="Add a note..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                />
                <button
                  className="bg-primary text-primary-foreground rounded px-4 py-1.5 text-sm"
                  onClick={handleAddNote}
                >
                  Add
                </button>
              </div>
              {notes.map((n) => (
                <div key={n.note_id} className="border-l-2 py-1 pl-3 text-sm">
                  <p>{n.note}</p>
                  <p className="text-muted-foreground text-xs">
                    {n.agent_email} · {new Date(n.created_at).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
