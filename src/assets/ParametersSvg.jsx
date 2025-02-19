import PropTypes from "prop-types";

const ParametersSvg = ({ addClass }) => {
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
      className={`${addClass} lucide lucide-sliders-horizontal`}
    >
      <line x1="21" y1="4" x2="14" y2="4"></line>
      <line x1="10" y1="4" x2="3" y2="4"></line>
      <line x1="21" y1="12" x2="12" y2="12"></line>
      <line x1="8" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="20" x2="16" y2="20"></line>
      <line x1="12" y1="20" x2="3" y2="20"></line>
      <line x1="14" y1="2" x2="14" y2="6"></line>
      <line x1="8" y1="10" x2="8" y2="14"></line>
      <line x1="16" y1="18" x2="16" y2="22"></line>
    </svg>
  );
};

ParametersSvg.propTypes = {
  addClass: PropTypes.string,
};

export default ParametersSvg;
