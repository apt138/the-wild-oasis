import EditSettingsForm from "../features/settings/EditSettingsForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

export default function Settings() {
  return (
    <>
      <Row>
        <Heading as="h1">Update hotel settings</Heading>
      </Row>
      <EditSettingsForm />
    </>
  );
}
