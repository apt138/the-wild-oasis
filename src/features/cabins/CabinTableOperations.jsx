import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

export default function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        field="discount"
        options={[
          { label: "All", value: "all" },
          { label: "No discount", value: "no-discount" },
          { label: "With discount", value: "with-discount" },
        ]}
      />
      <SortBy
        options={[
          { label: "Sort by name (asc)", value: "name-asc" },
          { label: "Sort by name (desc)", value: "name-desc" },
          { label: "Sort by price (asc)", value: "regular_price-asc" },
          { label: "Sort by price (desc)", value: "regular_price-desc" },
          { label: "Sort by capacity (asc)", value: "max_capacity-asc" },
          { label: "Sort by capacity (desc)", value: "max_capacity-desc" },
        ]}
        type="white"
      />
    </TableOperations>
  );
}
