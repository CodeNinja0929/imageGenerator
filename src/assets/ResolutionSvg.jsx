import PropTypes from "prop-types";

const ResolutionSvg = ({ addClass }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${addClass} lucide lucide-scaling`}
    >
      <path d="M21 3 9 15"></path>
      <path d="M12 3H3v18h18v-9"></path>
      <path d="M16 3h5v5"></path>
      <path d="M14 15H9v-5"></path>
    </svg>
  );
};

ResolutionSvg.propTypes = {
  addClass: PropTypes.string,
};

export default ResolutionSvg;
