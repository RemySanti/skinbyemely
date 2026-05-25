import { useEffect } from 'react';

export const SQUARE_BOOKING_URL =
  'https://book.squareup.com/appointments/f7dcst2ljp85dq/location/LMVSQK9C6PR4T/services?buttonTextColor=ffffff&color=000000&locale=en&referrer=so';

export default function BookingRedirect() {
  useEffect(() => {
    window.location.replace(SQUARE_BOOKING_URL);
  }, []);

  return (
    <div className="min-h-[40vh] flex items-center justify-center px-4">
      <p className="text-neutral-500 text-sm uppercase tracking-widest">Redirecting to booking…</p>
    </div>
  );
}
