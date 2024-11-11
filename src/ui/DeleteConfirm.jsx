import styled from "styled-components";
import Heading from "./Heading";
import Button from "./Button";

const StyledConfirmDelete = styled.div`
  width: 40rem;

  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    margin-bottom: 1.2rem;
    color: var(--color-grey-500);
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

export default function DeleteConfirm({
  resourceName,
  onCloseModal,
  onConfirm,
  disabled,
}) {
  return (
    <StyledConfirmDelete>
      <Heading as="h3">Delete {resourceName}</Heading>
      <p>
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </p>
      <div>
        <Button variations="secondary" onClick={onCloseModal}>
          Cancel
        </Button>
        <Button variations="danger" onClick={onConfirm}>
          Delete
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}
