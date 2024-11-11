import { createContext, useContext, useState, cloneElement } from "react";
import styled from "styled-components";
import { HiXMark } from "react-icons/hi2";
import { createPortal } from "react-dom";
import useOutsideClick from "../hooks/useOutsideClick";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background-color: var(--color-grey-0);
  padding: 3.2rem 4rem;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 1000;
  transition: all 0.5s;

  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
`;

const Button = styled.button`
  border: none;
  background: none;
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  transform: all 0.2s;
  transform: translateX(0.8rem);

  position: absolute;
  top: 1.2rem;
  right: 1.5rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-500);
  }
`;
// Steps for React Compound Component pattern
// 1. Create Context
const ModelContext = createContext();

// 2. Create Parent componet - A Provider
function Modal({ children }) {
  const [openWindowName, setOpenWindowName] = useState("");
  const close = () => setOpenWindowName("");
  const open = setOpenWindowName;

  return (
    <ModelContext.Provider value={{ openWindowName, close, open }}>
      {children}
    </ModelContext.Provider>
  );
}

// 3. Create Child Compoents
// 3.a Child: Model Open component
function Open({ children, openFor: windowName }) {
  const { open } = useContext(ModelContext);

  return cloneElement(children, { onClick: () => open(windowName) });
}
// 3.b Child: Model Window component
function Window({ children, name }) {
  const { close, openWindowName: windowName } = useContext(ModelContext);
  const ref = useOutsideClick(close, true);
  if (name !== windowName) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

// 4.Bind properties
// Add child components as properties to Parent Component
Modal.Window = Window;
Modal.Open = Open;

export default Modal;
