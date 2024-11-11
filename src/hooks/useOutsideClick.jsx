import { useRef, useEffect } from "react";
export default function useOutsideClick(handler, listenCapturePhase) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          handler();
        }
      }
      document.addEventListener("click", handleClick, listenCapturePhase);

      return () =>
        document.removeEventListener("click", handleClick, listenCapturePhase);
    },
    [handler, listenCapturePhase]
  );
  return ref;
}
