import { useState } from "react";
import PropTypes from "prop-types";

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
StarRating.propTypes = {
  maxRating: PropTypes.number,
  color: PropTypes.string,
  size: PropTypes.number,
  messages: PropTypes.array,
  defualtRating: PropTypes.number,
};

export default function StarRating({ maxRating = 5, color = "#fcc419", size = 30, messages = [], defualtRating = 0 }) {
  const textStyle = {
    lineHeight: "1.1",
    margin: "0",
    fontSize: `${size / 1.5}px`,
  };
  //   const [hoveredRating, setHoveredRating] = useState(0);
  const [rating, setRating] = useState(defualtRating);
  const [hoveredRating, setHoveredRating] = useState(0);
  return (
    <div style={containerStyle}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }).map((_, index) => (
          <Star color={color} size={size} key={index} index={index} onHoverIn={() => setHoveredRating(index + 1)} onHoverOut={() => setHoveredRating(0)} onRate={() => setRating(index + 1)} full={hoveredRating ? hoveredRating >= index + 1 : rating >= index + 1} />
        ))}
      </div>

      {hoveredRating > 0 && <p style={textStyle}>{messages.length === maxRating ? messages[hoveredRating - 1] : hoveredRating}</p>}
    </div>
  );
}

function Star({ onRate, full, onHoverIn, onHoverOut, color, size }) {
  const starStyle = {
    width: `${size}px`,
    height: `${size}px`,
    display: "blocl",
    cursor: "pointer",
    color,
  };
  return (
    <span role="button" onClick={onRate} onMouseEnter={onHoverIn} onMouseLeave={onHoverOut} style={starStyle}>
      {full ? (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill={color} stroke={color}>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="" stroke="#000">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )}
    </span>
  );
}
