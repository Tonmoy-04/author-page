import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="pagination">
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={p === currentPage ? "active-page" : ""}
        >
          {p}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
