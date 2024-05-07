import PropTypes from 'prop-types';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { usePagination, DOTS } from '../../hooks/usePagination';

const Pagination = (props) => {
  const { className, onPageChange, totalCount, siblingCount = 1, currentPage, pageSize } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  let start = pageSize * (currentPage - 1) + 1;
  let end = pageSize * currentPage > totalCount ? totalCount : pageSize * currentPage;

  return (
    <div
      className={`flex items-center justify-between border-t text-white border-gray-200 bg-[#0D1117] opacity-70 px-4 py-3 sm:px-6 ${className}`}
    >
      <div className="flex flex-1 justify-between sm:hidden"></div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm">
            Showing <span className="font-medium">{start}</span> to <span className="font-medium">{end}</span> of{' '}
            <span className="font-medium">{totalCount}</span> results
          </p>
        </div>
        <div>
          <ul className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <li
              className={`relative inline-flex items-center rounded-l-md px-2 py-2 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer ${
                currentPage === 1 && 'pointer-events-none'
              }`}
              onClick={onPrevious}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </li>
            {paginationRange.map((pageNumber, index) => {
              if (pageNumber === DOTS) {
                return (
                  <li
                    key={pageNumber + index}
                    className="relative hidden items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex cursor-pointer"
                  >
                    &#8230;
                  </li>
                );
              }
              return (
                <li
                  key={pageNumber}
                  className="relative hidden items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex cursor-pointer"
                  onClick={() => onPageChange(pageNumber)}
                >
                  {pageNumber}
                </li>
              );
            })}

            <li
              className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer ${
                currentPage === lastPage && 'pointer-events-none'
              }`}
              onClick={onNext}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  className: PropTypes.string,
  onPageChange: PropTypes.func,
  totalCount: PropTypes.number,
  siblingCount: PropTypes.number,
  currentPage: PropTypes.number,
  pageSize: PropTypes.number,
};
export default Pagination;
