import { useEffect, useState } from "react";
import { HTMLParser } from "@/utils/HTMLParser";

const Footercontent = ({ footerContentTitle, footerContentDiscription }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldShowToggle, setShouldShowToggle] = useState(false);
  const [truncatedHTML, setTruncatedHTML] = useState("");
  const [hasContent, setHasContent] = useState(false);

  const truncateHTML = (html, maxLength) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    let currentLength = 0;
    const stack = [];

    const truncateNode = (node) => {
      if (currentLength >= maxLength) return "";

      if (node.nodeType === Node.TEXT_NODE) {
        const remaining = maxLength - currentLength;
        const text = node.textContent.slice(0, remaining);
        currentLength += text.length;
        return text;
      }

      if (node.nodeType === Node.ELEMENT_NODE) {
        let html = `<${node.nodeName.toLowerCase()}`;
        for (let attr of node.attributes) {
          html += ` ${attr.name}="${attr.value}"`;
        }
        html += ">";
        stack.push(node.nodeName.toLowerCase());

        for (let child of node.childNodes) {
          html += truncateNode(child);
          if (currentLength >= maxLength) break;
        }

        const tag = stack.pop();
        html += `</${tag}>`;
        return html;
      }

      return "";
    };

    return truncateNode(tempDiv);
  };

  useEffect(() => {
    setIsExpanded(false);

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = footerContentDiscription || "";
    const text = tempDiv.textContent || tempDiv.innerText || "";

    const trimmed = text.trim();
    setHasContent(!!trimmed);

    if (trimmed.length > 500) {
      setShouldShowToggle(true);
      setTruncatedHTML(truncateHTML(footerContentDiscription, 500));
    } else {
      setShouldShowToggle(false);
      setTruncatedHTML(footerContentDiscription);
    }
  }, [footerContentDiscription]);

  if (!hasContent) return null;

  return (
    <section className="footer-content">
      <div className="container">
        {footerContentTitle && <h2>{footerContentTitle}</h2>}
        <div>{HTMLParser(isExpanded ? footerContentDiscription : truncatedHTML)}</div>
        {shouldShowToggle && (
          <div>
            <button
              type="button"
              className="readmore btn-reset"
              aria-expanded={isExpanded}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "Read less" : "Read more"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Footercontent;
