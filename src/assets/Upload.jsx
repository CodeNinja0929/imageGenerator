import PropTypes from 'prop-types';

const Upload = ({ addClass }) => {
  return (
    <svg className={addClass} width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.5 5.25H6.75C5.64543 5.25 4.75 6.14543 4.75 7.25V17.75C4.75 18.8546 5.64543 19.75 6.75 19.75H17.2502C18.3548 19.75 19.2502 18.8546 19.2502 17.75V10.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M14.5846 10.6428L12.2534 13.0673M12.2534 13.0673L10.0871 10.4944M12.2534 13.0673L12.4018 8.56971C12.5112 5.25781 15.2846 2.66159 18.5965 2.77091L18.8464 2.77915"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
};

Upload.propTypes = {
  addClass: PropTypes.string,
};

export default Upload;
