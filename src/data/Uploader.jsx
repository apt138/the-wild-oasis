import { useState } from "react";
import styled from "styled-components";
import Button from "../ui/Button";
import { isFuture, isPast, isToday } from "date-fns";
import { subtractDates } from "../utils/helpers";
import supabase from "../services/supabase";

import { bookings } from "./data-bookings";
import { cabins } from "./data-cabins";
import { guests } from "./data-guests";

async function deleteGuests() {
  const { error } = await supabase.from("wo_guests").delete().gt("guest_id", 0);
  if (error) console.log(error.message);
}

async function deleteCabins() {
  const { error } = await supabase.from("wo_cabins").delete().gt("cabin_id", 0);
  if (error) console.log(error.message);
}

async function deleteBookings() {
  const { error } = await supabase
    .from("wo_bookings")
    .delete()
    .gt("booking_id", 0);
  if (error) console.log(error.message);
}

async function createGuests() {
  const { error } = await supabase.from("wo_guests").insert(guests);
  if (error) console.log(error.message);
}

async function createCabins() {
  const { error } = await supabase.from("wo_cabins").insert(cabins);
  if (error) console.log(error.message);
}

async function createBookings() {
  // Bookings need a guestId and a cabinId. We can't tell Supabase IDs for each object, it will calculate them on its own. So it might be different for different people, especially after multiple uploads. Therefore, we need to first get all guestIds and cabinIds, and then replace the original IDs in the booking data with the actual ones from the DB
  const { data: guestsIds } = await supabase
    .from("wo_guests")
    .select("guest_id")
    .order("guest_id");
  const allGuestIds = guestsIds.map((guest) => guest.guest_id);
  const { data: cabinsIds } = await supabase
    .from("wo_cabins")
    .select("cabin_id")
    .order("cabin_id");
  const allCabinIds = cabinsIds.map((cabin) => cabin.cabin_id);

  const finalBookings = bookings.map((booking) => {
    // Here relying on the order of cabins, as they don't have and ID yet
    const cabin = cabins.at(booking.cabin_id - 1);
    const numNights = subtractDates(booking.end_date, booking.start_date);
    const cabinPrice = numNights * (cabin.regular_price - cabin.discount);
    const extrasPrice = booking.has_breakfast
      ? numNights * 15 * booking.num_guests
      : 0; // hardcoded breakfast price
    const totalPrice = cabinPrice + extrasPrice;

    let status;
    if (
      isPast(new Date(booking.end_date)) &&
      !isToday(new Date(booking.end_date))
    )
      status = "checked-out";
    if (
      isFuture(new Date(booking.start_date)) ||
      isToday(new Date(booking.start_date))
    )
      status = "unconfirmed";
    if (
      (isFuture(new Date(booking.end_date)) ||
        isToday(new Date(booking.end_date))) &&
      isPast(new Date(booking.start_date)) &&
      !isToday(new Date(booking.start_date))
    )
      status = "checked-in";

    return {
      ...booking,
      num_nights: numNights,
      cabin_price: cabinPrice,
      extra_price: extrasPrice,
      total_price: totalPrice,
      guest_id: allGuestIds.at(booking.guest_id - 1),
      cabin_id: allCabinIds.at(booking.cabin_id - 1),
      status,
    };
  });

  console.log(finalBookings);

  const { error } = await supabase.from("wo_bookings").insert(finalBookings);
  if (error) console.log(error.message);
}

const StyledUploader = styled.div`
  text-align: center;
  background-color: var(--color-brand-50);
  padding: 0.8rem;
  margin-top: 16rem;
  border-radius: var(--border-radius-sm);

  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export default function Uploader() {
  const [isLoading, setIsLoading] = useState(false);

  async function uploadAll() {
    setIsLoading(true);
    // Bookings need to be deleted FIRST
    await deleteBookings();
    await deleteGuests();
    await deleteCabins();

    // Bookings need to be created LAST
    await createGuests();
    await createCabins();
    await createBookings();

    setIsLoading(false);
  }

  async function uploadBookings() {
    setIsLoading(true);
    await deleteBookings();
    await createBookings();
    setIsLoading(false);
  }

  return (
    <StyledUploader>
      <h3>SAMPLE DATA</h3>
      <Button onClick={uploadAll} disabled={isLoading}>
        Upload All
      </Button>
      <Button onClick={uploadBookings} disabled={isLoading}>
        Upload bookings only
      </Button>
    </StyledUploader>
  );
}
