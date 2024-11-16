import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";

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
    </TableOperations>
  );
}
