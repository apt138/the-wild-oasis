import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllCabins } from "../../services/apiCabins";
import CabinRow from "./CabinRow";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

export default function CabinTable() {
  const {
    isPending,
    data: cabins = [],
    error,
    status,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getAllCabins,
  });
  const [searchParams] = useSearchParams();
  // 1. Filter
  const filterField = searchParams.get("discount") || "all";
  let filterCabins;
  if (filterField === "all") filterCabins = cabins;
  if (filterField === "no-discount")
    filterCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (filterField === "with-discount")
    filterCabins = cabins.filter((cabin) => cabin.discount > 0);

  // 2. Sorting
  const sortBy = searchParams.get("sortBy") || "name-asc";
  const [field, direction] = sortBy.split("-");
  const sortModifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filterCabins.sort(
    (a, b) => (a[field] - b[field]) * sortModifier
  );

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
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.cabin_id} />}
        />
      </Table>
    </Menus>
  );
}
