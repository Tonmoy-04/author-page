import React, { useState } from "react";
import { Link } from "react-router-dom";
import Reactions from "../components/Reactions";
import Pagination from "../components/Pagination";
import "../App.css";

const ArticlePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dummyComments = [
    "Great article!",
    "Very helpful, thanks!",
    "I disagree with some points.",
    "Nice explanation.",
  ];

  return (
    <div className="container">
      <h1 className="article-title">The Mystery of React</h1>
      <p className="article-body">
        React is a powerful JavaScript library for building user interfaces.
        It allows developers to create fast and scalable web applications with
        reusable components and a virtual DOM...
      </p>

      {/* Author */}
      <p className="author-line">
        Written by:{" "}
        <Link to="/author/JohnDoe" className="author-link">
          John Doe
        </Link>
      </p>

      {/* Post Reactions */}
      <h2 className="section-title">Reactions</h2>
      <Reactions />

      {/* Comments */}
      <h2 className="section-title">Comments</h2>
      <ul className="comment-list">
        {dummyComments.slice((currentPage - 1) * 2, currentPage * 2).map(
          (comment, idx) => (
            <li key={idx} className="comment-item">
              <span>{comment}</span>
              <Reactions />
            </li>
          )
        )}
      </ul>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={Math.ceil(dummyComments.length / 2)}
      />
    </div>
  );
};

export default ArticlePage;
