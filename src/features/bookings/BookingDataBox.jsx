import styled from "styled-components";
import { format, isToday } from "date-fns";
import { formatCurrency, formatDistanceFromNow } from "../../utils/helpers";
import { Flag } from "../../ui/Flag";
import { HiOutlineHomeModern } from "react-icons/hi2";
import { HiOutlineChatBubbleBottomCenter } from "react-icons/hi2";
import { HiOutlineCheckCircle } from "react-icons/hi2";
import { HiOutlineCurrencyDollar } from "react-icons/hi2";
import DataItem from "../../ui/DataItem";

const StyledBookingDataBox = styled.section`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  overflow: hidden;
`;

const Header = styled.header`
  background-color: var(--color-brand-500);
  color: var(--color-brand-100);
  padding: 2rem 4rem;

  font-size: 1.8rem;
  font-weight: 500;

  display: flex;
  align-items: center;
  justify-content: space-between;

  & div:first-child {
    display: flex;
    align-items: center;
    gap: 1.6rem;

    font-weight: 600;
  }

  & svg {
    height: 3.2rem;
    width: 3.2rem;
  }

  & span {
    font-family: "Sono";
    font-size: 2rem;
    margin-left: 4px;
  }
`;

const Section = styled.section`
  padding: 3.2rem 4rem 1.2rem;
`;

const Guest = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;

  margin-bottom: 1.6rem;
  color: var(--color-grey-500);

  & p:first-of-type {
    font-weight: 500;
    color: var(--color-grey-700);
  }
`;

const Price = styled.div`
  padding: 1.6rem 3.2rem;
  margin-top: 2.4rem;
  border-radius: var(--border-radius-sm);

  background-color: ${(props) =>
    props.hasPaid ? "var(--color-green-100)" : "var(--color-yellow-100)"};

  color: ${(props) =>
    props.hasPaid ? "var(--color-green-700)" : "var(--color-yellow-700)"};
  display: flex;
  align-items: center;
  justify-content: space-between;

  & p:last-child {
    text-transform: uppercase;
    font-weight: 600;
    font-size: 1.4rem;
  }

  & svg {
    height: 2.4rem;
    width: 2.4rem;
    color: currentColor !important;
  }
`;

const Footer = styled.footer`
  text-align: right;
  color: var(--color-grey-500);
  font-size: 1.2rem;
  padding: 1.6rem 4rem;
`;

export default function BookingDataBox({ booking }) {
  const {
    num_nights: numNights,
    num_guests: numGuests,
    start_date: startDate,
    end_date: endDate,
    has_breakfast: hasBreakfast,
    total_price: totalPrice,
    cabin_price: cabinPrice,
    extra_price: extraPrice,
    has_paid: hasPaid,
    created_at: createdAt,
    observations,
    wo_cabins: { name: cabinName } = {},
    wo_guests: {
      country_flag: countryFlag,
      nationality: country,
      full_name: guestName,
      national_id: nationalId,
      email,
    } = {},
  } = booking;
  return (
    <StyledBookingDataBox>
      <Header>
        <div>
          <HiOutlineHomeModern />
          <p>
            {numNights} nights in Cabin <span>{cabinName}</span>
          </p>
        </div>
        <p>
          {format(new Date(startDate), "EEE, MMM dd yyyy")}(
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </p>
      </Header>

      <Section>
        <Guest>
          {countryFlag && <Flag src={countryFlag} alt={`Flag of ${country}`} />}
          <p>
            {guestName} {numGuests > 1 ? `+ ${numGuests - 1} guests` : ""}
          </p>
          <span>&bull;</span>
          <p>{email}</p>
          <span>&bull;</span>
          <p>National Id {nationalId}</p>
        </Guest>

        {observations && (
          <DataItem
            icon={<HiOutlineChatBubbleBottomCenter />}
            label="Observations"
          >
            {observations}
          </DataItem>
        )}

        <DataItem icon={<HiOutlineCheckCircle />} label="Breakfast included?">
          {hasBreakfast ? "Yes" : "No"}
        </DataItem>
        <Price hasPaid={hasPaid}>
          <DataItem icon={<HiOutlineCurrencyDollar />} label="Total price">
            {formatCurrency(totalPrice)}
            {hasBreakfast &&
              ` (${formatCurrency(cabinPrice)} cabin + ${formatCurrency(
                extraPrice
              )} breakfast)`}
          </DataItem>
          <p>{hasPaid ? "Paid" : "Will pay at property"}</p>
        </Price>
      </Section>

      <Footer>
        <p>Booked {format(new Date(createdAt), "EEE, MMM dd yyyy")}</p>
      </Footer>
    </StyledBookingDataBox>
  );
}
