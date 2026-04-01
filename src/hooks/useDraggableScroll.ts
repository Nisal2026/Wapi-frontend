import { useCallback, useRef, useState } from "react";

export const useDraggableScroll = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    setIsDown(true);
    ref.current.classList.add("active");
    setStartX(e.pageX - ref.current.offsetLeft);
    setScrollLeft(ref.current.scrollLeft);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsDown(false);
    ref.current?.classList.remove("active");
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDown(false);
    ref.current?.classList.remove("active");
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDown || !ref.current) return;
      e.preventDefault();
      const x = e.pageX - ref.current.offsetLeft;
      const walk = (x - startX) * 2; // scroll-fast
      ref.current.scrollLeft = scrollLeft - walk;
    },
    [isDown, startX, scrollLeft]
  );

  return {
    ref,
    onMouseDown: handleMouseDown,
    onMouseLeave: handleMouseLeave,
    onMouseUp: handleMouseUp,
    onMouseMove: handleMouseMove,
  };
};
