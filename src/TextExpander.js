import React, { useState } from "react";

export default function TextExpander({ children, limit = 5 }) {
  const wordCount = children.split(/\s+/).length;
  const [wordDislayLimit, setWordDislayLimit] = useState(limit);
  const [stringToShow, setStringToShow] = useState(children.split(/\s+/).slice(0, limit).join(" "));

  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <p>
      {stringToShow}
      {wordCount}
    </p>
  );
}
