import PropTypes from "prop-types";

const Linejoin = ({ addClass }) => {
  return (
    <svg
      className={addClass}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 8L12 16L20 8"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
};

Linejoin.propTypes = {
  addClass: PropTypes.string,
};

export default Linejoin;
