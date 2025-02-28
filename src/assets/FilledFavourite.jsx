import PropTypes from 'prop-types';

const FilledFavourite = ({ addClass }) => {
  return (
    <svg className={addClass} fill="#FFFFFF" width="20" height="20" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <title>favorite--filled</title>
      <path
        d="M22.5,4c-2,0-3.9,0.8-5.3,2.2L16,7.4l-1.1-1.1C12,3.3,7.2,3.3,4.3,6.2c0,0-0.1,0.1-0.1,0.1c-3,3-3,7.8,0,10.8L16,29
            l11.8-11.9c3-3,3-7.8,0-10.8C26.4,4.8,24.5,4,22.5,4z"
      />
      <rect width="32" height="32" fill="none" />
    </svg>
  );
};

FilledFavourite.propTypes = {
  addClass: PropTypes.string,
};

export default FilledFavourite;
