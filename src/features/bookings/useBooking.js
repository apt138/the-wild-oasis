import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllBookings } from "../../services/apiBookings";

export function useBooking() {
  const [searchParams] = useSearchParams();

  // Filter
  const filterValue = searchParams.get("status");
  const filter =
    filterValue && filterValue !== "all"
      ? { field: "status", value: filterValue, method: "eq" }
      : null;

  const {
    data: bookings,
    isPending,
    error,
    status,
  } = useQuery({
    queryKey: ["bookings", filter],
    queryFn: () => getAllBookings({ filter }),
  });

  return { bookings, isPending, error, status };
}
