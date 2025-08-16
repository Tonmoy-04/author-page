import React, { useState } from "react";
import { FaThumbsUp, FaHeart, FaLaugh } from "react-icons/fa";
import "../App.css";

const Reactions = () => {
  const [selected, setSelected] = useState(null);

  const icons = [
    { id: "like", icon: <FaThumbsUp /> },
    { id: "love", icon: <FaHeart /> },
    { id: "funny", icon: <FaLaugh /> },
  ];

  return (
    <div className="reactions">
      {icons.map((item) => (
        <button
          key={item.id}
          onClick={() => setSelected(item.id)}
          className={`reaction-btn ${
            selected === item.id ? "active-reaction" : ""
          }`}
        >
          {item.icon}
        </button>
      ))}
    </div>
  );
};

export default Reactions;
