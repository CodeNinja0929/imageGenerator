import PropTypes from "prop-types";

const Able = ({ addClass }) => {
  return (
    <svg
      className={`${addClass} plans_check__Kds87`}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 12L9 18L21 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
};

Able.propTypes = {
  addClass: PropTypes.string,
};

export default Able;
