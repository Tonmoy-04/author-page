import React, { useState } from "react";
import Reactions from "./components/Reactions";
import Pagination from "./components/Pagination";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState(1);

  // Dummy comments
  const dummyComments = [
    "Great article!",
    "Very helpful, thanks!",
    "I disagree with some points.",
    "Nice explanation.",
  ];

  return (
    <div>
      {/* Your Info */}
      <header className="profile-header">
        <img
          src="https://i.ibb.co/Zm0RrXh/profile.jpg" // replace with your actual photo link
          alt="Noman Ahmed Tonmoy"
          className="profile-photo"
        />
        <div>
          <h1 className="profile-name">Noman Ahmed Tonmoy</h1>
          <p className="profile-role">Software Engineer (Aspiring)</p>
        </div>
      </header>

      {/* Article Section */}
      <main className="container">
        <h1 className="article-title">The Mystery of React</h1>
        <p className="article-body">
          React is a powerful JavaScript library for building user interfaces.
          It allows developers to create fast and scalable web applications with
          reusable components and a virtual DOM...
        </p>

        {/* Author Info (inline, not separate page) */}
        <div className="author-box">
          <img
            src="https://ui-avatars.com/api/?name=John+Doe&size=100"
            alt="John Doe"
            className="author-img"
          />
          <div>
            <h3 className="author-name">John Doe</h3>
            <p className="author-desc">
              John is a passionate writer who loves to share knowledge about
              React and software development.
            </p>
          </div>
        </div>

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
      </main>
    </div>
  );
}

export default App;
