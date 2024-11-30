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

  // Sort
  const sortByRaw = searchParams.get("sortBy") || "start_date-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  const {
    data: bookings,
    isPending,
    error,
    status,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy],
    queryFn: () => getAllBookings({ filter, sortBy }),
  });

  return { bookings, isPending, error, status };
}
