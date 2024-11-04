import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { getAllCabins } from "../../services/apiCabins";
import CabinRow from "./CabinRow";
import Spinner from "../../ui/Spinner";

const TableHeader = styled.header`
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.4px;

  background-color: var(--color-grey-50);
  color: var(--color-grey-600);

  padding: 1.6rem 2.4rem;
  border-bottom: 1px solid var(--color-grey-100);

  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr repeat(3, 1fr);
  column-gap: 2.4rem;
`;

const Table = styled.div`
  background-color: var(--color-grey-0);
  font-size: 1.4rem;
  border-radius: var(--border-radius-md);
  border: 1px solid var(--color-grey-200);
  overflow: hidden;
`;

export default function CabinTable() {
  const {
    isPending,
    data: cabins,
    error,
    status,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getAllCabins,
  });

  if (isPending) return <Spinner />;

  return (
    <Table role="table">
      <TableHeader role="row">
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </TableHeader>
      {cabins.map((cabin) => (
        <CabinRow cabin={cabin} key={cabin.cabin_id} />
      ))}
    </Table>
  );
}
