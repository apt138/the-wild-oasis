import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { getAllCabins } from "../../services/apiCabins";
import CabinRow from "./CabinRow";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";

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
    <Table columns="0.6fr 1.8fr 2.2fr repeat(3, 1fr)">
      <Table.Header>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>
      {cabins.map((cabin) => (
        <CabinRow cabin={cabin} key={cabin.cabin_id} />
      ))}
    </Table>
  );
}
