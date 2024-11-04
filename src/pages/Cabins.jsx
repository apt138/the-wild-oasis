import CabinTable from "../features/cabins/CabinTable";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
// temp
import { useState } from "react";
import Button from "../ui/Button";

export default function Cabins() {
  // temp
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Cabins</Heading>
        <p>filter / sort</p>
      </Row>
      <Row>
        <CabinTable />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2.4rem",
            paddingBottom: "2.4rem",
          }}
        >
          <Button
            style={{ width: "100px", marginLeft: "auto" }}
            onClick={() => setShowForm((show) => !show)}
          >
            Add new
          </Button>
          {showForm && <CreateCabinForm />}
        </div>
      </Row>
    </>
  );
}
