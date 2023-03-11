import React, { useRef, useEffect, RefObject } from "react";

export function useClickOutside(
  elRef: RefObject<HTMLDivElement>,
  callback: () => void
) {
  const callbackRef = useRef<() => void>(() => {});
  callbackRef.current = callback;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const eventTarget = e.target as HTMLElement;
      if (!elRef?.current?.contains(eventTarget) && callbackRef.current) {
        callbackRef.current();
      }
    };

    document.addEventListener("click", handleClickOutside, true);

    return function useClickOutsideEffectCleanUp() {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [callbackRef, elRef]);
}
