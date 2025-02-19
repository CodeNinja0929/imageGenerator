import PropTypes from 'prop-types';

const Pencil = ({ addClass }) => {
  return (
    <svg className={addClass} width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_963_46762)">
        <path
          d="M7.12891 20.7499L11.3789 19.7499L21.328 9.80071C21.7186 9.41018 21.7186 8.77702 21.328 8.38649L19.4923 6.55071C19.1017 6.16018 18.4686 6.16018 18.078 6.55071L8.12891 16.4999L7.12891 20.7499Z"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M16.4023 8.28125L19.4023 11.2813"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M4.37891 20.742C4.37891 20.742 1.74254 21.1068 1.74254 19.8052C1.74254 18.5036 5.75781 18.6453 5.37891 16.768C5 14.8906 0.5 15.5 0.5 15.5"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_963_46762">
          <rect width="24" height="24" fill="currentColor" transform="translate(0 0.5)"></rect>
        </clipPath>
      </defs>
    </svg>
  );
};

Pencil.propTypes = {
  addClass: PropTypes.string,
};

export default Pencil;
