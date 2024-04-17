import React, { useState } from "react";

export default function TextExpander({ children, limit = 5 }) {
  const wordCount = children.split(/\s+/).length;
  const [stringToShow, setStringToShow] = useState(children.split(/\s+/).slice(0, limit).join(" ") + "...");
  const [isExpanded, setIsExpanded] = useState(false);
  function handleExpand() {
    // Toggle the isExpanded state
    setIsExpanded(!isExpanded);
    if (isExpanded) {
      setStringToShow(children.split(/\s+/).slice(0, limit).join(" ") + "...");
    } else {
      setStringToShow(children);
    }
  }
  return (
    <p>
      {stringToShow}
      <button onClick={handleExpand}>{isExpanded ? "Collapse" : "Expand"}</button>
    </p>
  );
}
