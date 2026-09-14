// components/Accordion.js
import { useRef, useEffect, useState } from "react";
import { Editicon } from "./svgicon";
import { HTMLParser } from "@/utils/HTMLParser";

export default function Accordion({
  title,
  content,
  isOpen = false,
  onToggle,
  showicon,
}) {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div className="accordion_cntr">
      <button
        onClick={onToggle}
        className="accordion_head w-full flex justify-between items-center text-left"
      >
        <p className="title flex items-center gap-[10px]">
          {" "}
          {showicon && <Editicon />} {title}
        </p>
        <span className="acco_nav flex flex-col items-center justify-center cursor-pointer">
          {isOpen ? "-" : "+"}
        </span>
      </button>

      <div
        ref={contentRef}
        style={{
          maxHeight: `${height}px`,
          transition: "max-height 0.3s ease",
          overflow: "hidden",
        }}
        className="accordion_data"
      >
        {typeof content === "string" ? (
          <div className="mt-2">{HTMLParser(content)}</div>
        ) : (
          <div className="mt-2">{content}</div>
        )}
      </div>
    </div>
  );
}
