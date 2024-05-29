import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import CardCategory from './CardCategory';

const itemsPerPage = 10;

const CategoryPagination = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentItems = data?.slice(offset, offset + itemsPerPage) || [];


  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {currentItems.map((product, index) => (
          <CardCategory
            key={index}
            name={product.name}
            imageUrl={product.imageUrl}
            price={product.price}
            currency={product.currency}
          />
        ))}
      </div>

      <ReactPaginate
        pageCount={Math.ceil(data.length / itemsPerPage)}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        onPageChange={handlePageClick}
        containerClassName="pagination"
        activeClassName="active"
      />
    </div>
  );
};

export default CategoryPagination;
