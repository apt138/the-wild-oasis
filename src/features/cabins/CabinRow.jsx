import { useState } from "react";
import styled from "styled-components";

import Row from "../../ui/Row";
import CreateOrEditCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { formatCurrency } from "../../utils/helpers";
import { HiSquare2Stack } from "react-icons/hi2";
import { HiPencil } from "react-icons/hi2";
import { HiTrash } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr repeat(3, 1fr);
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

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
  const [showForm, setShowForm] = useState(false);
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
    <>
      <TableRow role="row">
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
          <button onClick={handleDuplicate} disabled={isCreating}>
            <HiSquare2Stack />
          </button>
          <button onClick={() => setShowForm((show) => !show)}>
            <HiPencil />
          </button>
          <button disabled={isDeleting} onClick={() => deleteMutate(cabinId)}>
            <HiTrash />
          </button>
        </Row>
      </TableRow>
      {showForm && <CreateOrEditCabinForm editCabin={cabin} />}
    </>
  );
}