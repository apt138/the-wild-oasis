import { useQuery } from "@tanstack/react-query";
import { getAllBookings } from "../../services/apiBookings";

export function useBooking() {
  const {
    data: bookings,
    isPending,
    error,
    status,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: getAllBookings,
  });

  return { bookings, isPending, error, status };
}
