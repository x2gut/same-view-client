import { RefObject } from "react";

const getBoundaryClientPercent = <T extends HTMLElement>(
  element: RefObject<T>,
  clientX: number
) => {
  const rect = element.current?.getBoundingClientRect();
  if (!rect) return;

  const clickX = clientX - rect.left;
  const percent = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
  return percent;
};

export default getBoundaryClientPercent;
