import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visible && wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect();
      const scrollY = window.scrollY || window.pageYOffset;
      const scrollX = window.scrollX || window.pageXOffset;

      setCoords({
        top: rect.top + scrollY - 25,
        left: rect.left + scrollX + rect.width / 2,
      });
    }
  }, [visible]);

  const tooltipElement = visible
    ? ReactDOM.createPortal(
        <div
          className="copy_tooltip"
          style={{
            position: "absolute",
            top: coords.top,
            left: coords.left,
            transform: "translateX(-50%)",
          }}
        >
          {text}
        </div>,
        document.body
      )
    : null;

  return (
    <>
      <div
        ref={wrapperRef}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        style={{ display: "inline-block" }}
      >
        {children}
      </div>
      {tooltipElement}
    </>
  );
};

export default Tooltip;
