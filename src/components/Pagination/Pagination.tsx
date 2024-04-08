import React from 'react';

interface Props {
  lastPageNumber: number;
  pageNumber: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({lastPageNumber, pageNumber, onPageChange}) => {
  const isLoadMore = lastPageNumber - 1 > pageNumber;

  return (
    <>
      {isLoadMore && <button className='mt-3 header__button fw-bold' onClick={() => onPageChange(pageNumber + 1)}>Load more ↓</button>}
    </>

  );
};