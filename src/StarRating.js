import { useState } from "react";

const containerStyle = {
  display: "flex",
  //   justifyContent: "center",
  alignItems: "center",
  gap: "0.5rem",
};
const starContainerStyle = {
  display: "flex",
  gap: "0.5rem",
};
const textStyle = {
  fontSize: "1.3rem",
  lineHeight: "1.1",
  margin: "0",
};

export default function StarRating({ maxRating = 5 }) {
  //   const [hoveredRating, setHoveredRating] = useState(0);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  return (
    <div style={containerStyle}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }).map((_, index) => (
          <Star key={index} index={index} onHoverIn={() => setHoveredRating(index + 1)} onHoverOut={() => setHoveredRating(0)} onRate={() => setRating(index + 1)} full={hoveredRating ? hoveredRating >= index + 1 : rating >= index + 1} />
        ))}
      </div>

      {hoveredRating > 0 && <p style={textStyle}>{hoveredRating}</p>}
    </div>
  );
}
function Star({ onRate, full, onHoverIn, onHoverOut }) {
  return (
    <span role="button" onClick={onRate} onMouseEnter={onHoverIn} onMouseLeave={onHoverOut}>
      {full ? "⭐️" : "☆"}
    </span>
  );
}
