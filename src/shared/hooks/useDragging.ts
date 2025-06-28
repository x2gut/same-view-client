import { RefObject, useEffect, useRef, useState } from "react";

interface UseDragOptions<T extends HTMLElement> {
  onPointerDown?: (event: PointerEvent, target: T) => void;
  onPointerUp?: (event: PointerEvent, target: T) => void;
  onPointerMove?: (event: PointerEvent, target: T) => void;
  onDrag?: (event: PointerEvent, target: T) => void;
}

const useDrag = <T extends HTMLElement>(
  ref: RefObject<T>,
  options: UseDragOptions<T> = {}
) => {
  const isDragging = useRef(false);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleDown = (event: PointerEvent) => {
      isDragging.current = true;
      setDragging(true);
      options.onPointerDown?.(event, element);
    };

    const handleUp = (event: PointerEvent) => {
      if (isDragging.current) {
        isDragging.current = false;
        setDragging(false);
        options.onPointerUp?.(event, element);
      }
    };

    const handleMove = (event: PointerEvent) => {
      options.onPointerMove?.(event, element);
      if (isDragging.current) {
        options.onDrag?.(event, element);
      }
    };

    element.addEventListener("pointerdown", handleDown);
    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);

    return () => {
      element.removeEventListener("pointerdown", handleDown);
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
    };
  }, [ref, options]);

  return { isDragging: dragging };
};

export default useDrag;
