import React from "react";
import "../App.css";

const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="pagination">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`page-btn ${currentPage === page ? "active-page" : ""}`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
