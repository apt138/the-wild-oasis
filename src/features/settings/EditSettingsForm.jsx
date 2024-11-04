import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useEditSetting } from "./useEditSetting";
import { useSettings } from "./useSettings";

export default function EditSettingsForm() {
  const {
    isLoading,
    settings: {
      min_booking_length,
      max_booking_length,
      max_guests_per_booking,
      breakfast_price,
    } = {},
  } = useSettings();
  const { isEditing, editMutate } = useEditSetting();

  function handleUpdate(e, field) {
    const { value } = e.target;
    if (!value) return;
    editMutate({ [field]: value });
  }

  if (isLoading) <Spinner />;
  return (
    <Form>
      <FormRow label="Mininum nights/booking">
        <Input
          type="number"
          id="min_booking_length"
          defaultValue={min_booking_length}
          onBlur={(e) => handleUpdate(e, "min_booking_length")}
          disabled={isEditing}
        />
      </FormRow>

      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max_booking_length"
          defaultValue={max_booking_length}
          onBlur={(e) => handleUpdate(e, "max_booking_length")}
          disabled={isEditing}
        />
      </FormRow>

      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max_guests_per_booking"
          defaultValue={max_guests_per_booking}
          onBlur={(e) => handleUpdate(e, "max_guests_per_booking")}
          disabled={isEditing}
        />
      </FormRow>

      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast_price"
          defaultValue={breakfast_price}
          onBlur={(e) => handleUpdate(e, "breakfast_price")}
          disabled={isEditing}
        />
      </FormRow>
    </Form>
  );
}
