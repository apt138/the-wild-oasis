import { useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllBookings } from "../../services/apiBookings";
import { PAGE_SIZE } from "../../utils/constants";

export function useBooking() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

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

  // Pagination
  const pageString = searchParams.get("page");
  const page = pageString ? Number(pageString) : 1;

  // Query
  const {
    data: { data: bookings, count } = {},
    isPending,
    error,
    status,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getAllBookings({ filter, sortBy, page }),
  });

  // Pre-fetching for next page
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getAllBookings({ filter, sortBy, page: page + 1 }),
    });
  }

  // Pre-fetching for previous page
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getAllBookings({ filter, sortBy, page: page - 1 }),
    });
  }

  return { bookings, isPending, error, status, count };
}
