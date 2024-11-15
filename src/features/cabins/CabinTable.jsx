import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { getAllCabins } from "../../services/apiCabins";
import CabinRow from "./CabinRow";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

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
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 0.25fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={cabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.cabin_id} />}
        />
      </Table>
    </Menus>
  );
}
