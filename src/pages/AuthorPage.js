import React from "react";
import { useParams, Link } from "react-router-dom";
import "../App.css";

const AuthorPage = () => {
  const { name } = useParams();

  return (
    <div className="author-container">
      <img
        src={`https://ui-avatars.com/api/?name=${name}&size=150`}
        alt={name}
        className="author-img"
      />
      <h1 className="author-name">{name}</h1>
      <p className="author-desc">
        {name} is a passionate writer who loves to share knowledge about React
        and software development.
      </p>
      <Link to="/" className="back-link">
        ← Back to Article
      </Link>
    </div>
  );
};

export default AuthorPage;
