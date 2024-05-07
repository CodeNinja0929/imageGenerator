import PropTypes from 'prop-types';

const FilterAll = ({ addClass }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-tally4 mr-[6px]"
    >
      <path d="M4 4v16"></path>
      <path d="M9 4v16"></path>
      <path d="M14 4v16"></path>
      <path d="M19 4v16"></path>
    </svg>
  );
};

FilterAll.propTypes = {
  addClass: PropTypes.string,
};
export default FilterAll;
