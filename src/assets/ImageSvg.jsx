import PropTypes from "prop-types";

const ImageSvg = ({ addClass }) => {
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
      className={`${addClass} lucide lucide-image`}
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <circle cx="9" cy="9" r="2"></circle>
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
    </svg>
  );
};

ImageSvg.propTypes = {
  addClass: PropTypes.string,
};

export default ImageSvg;
