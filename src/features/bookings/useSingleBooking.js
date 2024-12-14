import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";

export function useSingleBooking() {
  const { bookingId } = useParams();

  const {
    data: booking = {},
    isPending,
    error,
    status,
  } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(bookingId),
    retry: false,
  });

  return { booking, isPending, error, status };
}
