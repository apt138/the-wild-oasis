import supabase from "./supabase";

export async function getAllBookings() {
  const { data: bookings, error } = await supabase
    .from("wo_bookings")
    .select("*,wo_cabins(name),wo_guests(full_name,email)");

  if (error) {
    console.error(error);
    throw new Error("Bookings couldn't be loaded.");
  }
  return bookings;
}
