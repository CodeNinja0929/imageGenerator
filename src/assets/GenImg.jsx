import PropTypes from 'prop-types';

const GenImg = ({ addClass }) => {
  return (
    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4.75 16.5V17.75C4.75 18.8546 5.64543 19.75 6.75 19.75H17.25C18.3167 19.75 19.25 19 19.25 17.75C19.25 14.2944 19.25 13.7 19.25 13.7M4.75 16.5V7.25C4.75 6.14543 5.64543 5.25 6.75 5.25H14.25M4.75 16.5L7.49619 13.0067C8.2749 12.0161 9.76453 11.9837 10.5856 12.9395L11.75 14M13.25 12.5C13.25 12.5 12.0743 13.6906 11.75 14M11.75 14L12.75 15M19.25 13.7V12.5M19.25 13.7V11.0605"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M20.4857 2.5C20.4857 4.31305 19.5083 5.44555 17.6953 5.44555C19.5083 5.44555 20.4857 6.57993 20.4857 8.39296C20.4857 6.57993 21.4631 5.44555 23.2761 5.44555C21.4631 5.44555 20.4857 4.31305 20.4857 2.5Z"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M15.8838 6.9375C15.8838 8.02536 14.8378 9.07133 13.75 9.07133C14.8378 9.07133 15.8838 10.1173 15.8838 11.2052C15.8838 10.1173 16.9298 9.07133 18.0177 9.07133C16.9298 9.07133 15.8838 8.02536 15.8838 6.9375Z"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
};

GenImg.propTypes = {
  addClass: PropTypes.string,
};

export default GenImg;
