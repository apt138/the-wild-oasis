import Filter from "../../ui/Filter";
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
    </TableOperations>
  );
}
