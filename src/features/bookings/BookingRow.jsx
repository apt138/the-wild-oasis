import styled from "styled-components";
import Table from "../../ui/Table";
import { formatCurrency, formatDistanceFromNow } from "../../utils/helpers";
import { format, isToday } from "date-fns";
import Tag from "../../ui/Tag";

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    font-size: 1.2rem;
    color: var(--color-grey-500);
  }
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-family: "Sono";
  font-weight: 600;
  color: var(--color-grey-600);
`;

const Amount = styled.div`
  font-weight: 500;
  font-family: "Sono";
`;

export default function BookingRow({ booking }) {
  const {
    booking_id: bookingId,
    start_date: startDate,
    end_date: endDate,
    status,
    num_nights: numNights,
    total_price: totalPrice,
    wo_cabins: { name: cabinName },
    wo_guests: { full_name: guestName, email },
  } = booking;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>
      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>
      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(startDate, "MMM dd yyyy")} &mdash;{" "}
          {format(endDate, "MMM dd yyyy")}
        </span>
      </Stacked>
      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
      <Amount>{formatCurrency(totalPrice)}</Amount>
    </Table.Row>
  );
}
