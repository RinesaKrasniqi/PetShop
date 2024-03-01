// import React from 'react';
// import './pagination.css';

// const Pagination = ({ totalPages, currentPage, onPageChange }) => {
//   const pageNumbers = [];

//   for (let i = 1; i <= totalPages; i++) {
//     pageNumbers.push(i);
//   }

//   return (
//     <div>
//       {pageNumbers.map((i) => (
//         <button key={i} onClick={() => onPageChange(i)} className='pagination-btn'>
//           {i}
//         </button>
//       ))}
//     </div>
//   );
// };

// export default Pagination;

import React from 'react';
import './pagination.css'; // Import the external CSS file

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination-container">
      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          className={`pagination-button ${pageNumber === currentPage ? 'active' : ''}`}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
    </div>
  );
};

export default Pagination;

