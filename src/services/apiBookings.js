import supabase from "./supabase";

export async function getAllBookings({ filter }) {
  let query = supabase
    .from("wo_bookings")
    .select("*,wo_cabins(name),wo_guests(full_name,email)");

  // Filter
  if (filter !== null) query = query[filter.method](filter.field, filter.value);

  const { data: bookings, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Bookings couldn't be loaded.");
  }
  return bookings;
}
