import PropTypes from "prop-types";

const Instagram = ({ addClass }) => {
  return (
    <svg
      className={addClass}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 6C2 3.79086 3.79086 2 6 2H18C20.2091 2 22 3.79086 22 6V18C22 20.2091 20.2091 22 18 22H6C3.79086 22 2 20.2091 2 18V6Z"
        stroke="#ffffff"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <circle
        cx="12"
        cy="12.0001"
        r="4.44444"
        stroke="#ffffff"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></circle>
      <path
        d="M18 6.0217V6"
        stroke="#ffffff"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
};

Instagram.propTypes = {
  addClass: PropTypes.string,
};

export default Instagram;
