import PropTypes from 'prop-types';

const Select = ({ addClass }) => {
  return (
    <svg className={addClass} width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4.5 5L10.8 20L13.2 13.7L19.5 11.3L4.5 5Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
};

Select.propTypes = {
  addClass: PropTypes.string,
};

export default Select;
