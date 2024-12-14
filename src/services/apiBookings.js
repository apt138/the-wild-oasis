import { PAGE_SIZE } from "../utils/constants";
import supabase from "./supabase";

export async function getAllBookings({ filter, sortBy, page }) {
  let query = supabase
    .from("wo_bookings")
    .select("*,wo_cabins(name),wo_guests(full_name,email)", { count: "exact" });

  // Filter
  if (filter) query = query[filter.method](filter.field, filter.value);

  // Sort
  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Bookings couldn't be loaded.");
  }
  return { data, count };
}

export async function getBooking(bookingId) {
  const { data, error } = await supabase
    .from("wo_bookings")
    .select("*, wo_cabins(*), wo_guests(*)")
    .eq("booking_id", bookingId)
    .single();

  if (error) {
    console.log(error);
    throw new Error("Booking not found!");
  }

  return data;
}
