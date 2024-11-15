import styled from "styled-components";
import { HiSquare2Stack } from "react-icons/hi2";
import { HiPencil } from "react-icons/hi2";
import { HiTrash } from "react-icons/hi2";

import Row from "../../ui/Row";
import Modal from "../../ui/Modal";
import CreateOrEditCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { formatCurrency } from "../../utils/helpers";
import { useCreateCabin } from "./useCreateCabin";
import DeleteConfirm from "../../ui/DeleteConfirm";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-family: "Sono";
  font-size: 1.6rem;
  font-weight: 600;
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

export default function CabinRow({ cabin }) {
  const { isDeleting, deleteMutate } = useDeleteCabin();
  const { isCreating, createMutate } = useCreateCabin();
  const {
    cabin_id: cabinId,
    name,
    max_capacity: maxCapacity,
    regular_price: regularPrice,
    discount,
    image_url: imageUrl,
    description,
  } = cabin;

  // const queryClient = useQueryClient();
  // const { isPending: isDeleting, mutate } = useMutation({
  //   mutationFn: deleteCabinById,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({
  //       queryKey: ["cabins"],
  //     });
  //     toast.success("Cabin deleted successfully");
  //   },
  //   onError: (err) => toast.error(err.message),
  // });

  function handleDuplicate() {
    createMutate({
      name: `Copy of ${name}`,
      max_capacity: maxCapacity,
      regular_price: regularPrice,
      discount,
      image_url: imageUrl,
      description,
    });
  }
  return (
    <Table.Row>
      <Img src={imageUrl} alt={name} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {parseInt(discount) > 0 ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      <Row type="horizantal" style={{ gap: "1.2rem" }}>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={cabinId} />
            <Menus.List id={cabinId}>
              <Menus.Button icon={<HiSquare2Stack />} onClick={handleDuplicate}>
                Duplicate
              </Menus.Button>

              <Modal.Open openFor="edit-cabin">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>
              <Modal.Open openFor="delete-cabin">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit-cabin">
              <CreateOrEditCabinForm editCabin={cabin} />
            </Modal.Window>

            {/* disabled={isDeleting} onClick={() => deleteMutate(cabinId)} */}
            <Modal.Window name="delete-cabin">
              <DeleteConfirm
                resourceName="cabins"
                onConfirm={() => deleteMutate(cabinId)}
                disabled={isDeleting}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </Row>
    </Table.Row>
  );
}
