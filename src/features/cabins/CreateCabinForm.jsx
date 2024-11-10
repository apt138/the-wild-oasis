import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import TextArea from "../../ui/TextArea";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

export default function CreateOrEditCabinForm({
  editCabin = {},
  onCloseModal,
}) {
  const { isCreating, createMutate } = useCreateCabin();
  const { isEditing, editMutate } = useEditCabin();
  const { cabin_id: editId, ...editValues } = editCabin;
  const isEditSession = Boolean(editId);
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    const image =
      typeof data.image_url === "string" ? data.image_url : data.image_url[0];
    if (isEditSession)
      editMutate(
        {
          newCabin: { ...data, image_url: image },
          cabinId: editId,
        },
        {
          onSuccess: (data) => {
            onCloseModal?.();
          },
        }
      );
    else
      createMutate(
        { ...data, image_url: image },
        {
          onSuccess: (data) => {
            console.log(data); // new clearly data returned from api
            reset();
            onCloseModal?.();
          },
        }
      );
    // console.log({ ...data, image_url: data.image_url[0] });
  }

  function onError(errors) {
    console.log(getValues());
    console.log(errors);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "This field is required",
            minLength: {
              value: 3,
              message: "Name should atleast contain 3 or more characters.",
            },
          })}
        />
      </FormRow>

      <FormRow label="Maximum capcity" error={errors?.max_capacity?.message}>
        <Input
          type="number"
          id="max_capacity"
          disabled={isWorking}
          {...register("max_capacity", {
            required: "This field is required",
            min: { value: 1, message: "Capacity should be atleast 1." },
          })}
        />
      </FormRow>

      <FormRow error={errors?.regular_price?.message} label="Regular Price">
        <Input
          type="number"
          id="regular_price"
          disabled={isWorking}
          {...register("regular_price", {
            required: "This field is required.",
            validate: (value) =>
              Number.parseFloat(value) > 0 ||
              "Price must be greater than zero.",
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isWorking}
          {...register("discount", {
            required: "This field is required.",
            validate: {
              positive: (value) =>
                Number.parseFloat(value) >= 0 || "Discount must be positive.",
              lessThanRegularPrice: (value) =>
                Number(value) <= Number(getValues().regular_price) ||
                "Discount should less than regular price",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <TextArea
          id="description"
          disabled={isWorking}
          {...register("description", {
            required: "This field is required.",
            minLength: {
              value: 20,
              message:
                "description should atleast contain 20 or more characters.",
            },
          })}
        ></TextArea>
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image_url?.message}>
        <FileInput
          type="file"
          id="image_url"
          disabled={isWorking}
          accept="image/*"
          {...register("image_url", {
            required: isEditSession ? false : "This field is required.",
          })}
        />
      </FormRow>

      <FormRow>
        <Button
          variations="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit" : "Create"}
        </Button>
      </FormRow>
    </Form>
  );
}
