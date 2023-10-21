import { useEffect } from "react";

const useOutsideAlerter = (ref: any, btnRef: any, clicked: () => void) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if ((ref.current && !ref.current.contains(event.target)) && (btnRef.current && !btnRef.current.contains(event.target))) {
        clicked()
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref])
}

export default useOutsideAlerter