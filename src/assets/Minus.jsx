import PropTypes from "prop-types";

const Minus = ({ addClass }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${addClass} lucide lucide-minus`}
    >
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );
};

Minus.propTypes = {
  addClass: PropTypes.string,
};

export default Minus;
