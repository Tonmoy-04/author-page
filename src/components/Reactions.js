import React from "react";

const ReactionBar = ({ reaction, onReact }) => {
  const reactions = [
    { type: "like", label: "👍", color: "blue" },
    { type: "love", label: "❤️", color: "red" },
    { type: "wow", label: "😮", color: "goldenrod" },
  ];

  return (
    <div className="reactions">
      {reactions.map((r) => (
        <span
          key={r.type}
          style={{
            color: reaction === r.type ? r.color : "gray", // highlight only the selected
            cursor: "pointer",
            marginRight: "10px",
            fontSize: "20px",
            transition: "all 0.3s ease",
          }}
          onClick={() => onReact(r.type)} // pass type back to App.js
        >
          {r.label}
        </span>
      ))}
    </div>
  );
};

export default ReactionBar;
