import Button from "../../ui/Button";
import CreateOrEditCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

export default function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open openFor="add-cabin">
          <Button>Add new</Button>
        </Modal.Open>
        <Modal.Window name="add-cabin">
          <CreateOrEditCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

// export default function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState(false);
//   return (
//     <div>
//       <Button
//         style={{ width: "100px", marginLeft: "auto" }}
//         onClick={() => setIsOpenModal((show) => !show)}
//       >
//         Add new
//       </Button>
//       {isOpenModal && (
//         <Modal onClose={() => setIsOpenModal(false)}>
//           <CreateOrEditCabinForm onCloseModal={() => setIsOpenModal(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// }
