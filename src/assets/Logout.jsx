import PropTypes from "prop-types";

const Logout = ({ addClass }) => {
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
        d="M4 12H15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M8 7L3 12L8 17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M21 3L21 21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
};

Logout.propTypes = {
  addClass: PropTypes.string,
};

export default Logout;
