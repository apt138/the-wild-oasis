import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

export default function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter
        field="status"
        options={[
          { label: "All", value: "all" },
          { label: "Unconfirmed", value: "unconfirmed" },
          { label: "Checked in", value: "checked-in" },
          { label: "Checked out", value: "checked-out" },
        ]}
      />
      <SortBy
        type="white"
        options={[
          { label: "Sort by start date (asc)", value: "start_date-asc" },
          { label: "Sort by start date (desc)", value: "start_date-desc" },
          { label: "Sort by amount (asc)", value: "total_price-asc" },
          { label: "Sort by amount (desc)", value: "total_price-desc" },
        ]}
      />
    </TableOperations>
  );
}
