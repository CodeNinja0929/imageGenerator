import PropTypes from 'prop-types';

const Commit = ({ addClass }) => {
  return (
    <svg className={addClass} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 18.75C15.866 18.75 19.25 16.6552 19.25 12C19.25 7.34483 15.866 5.25 12 5.25C8.13401 5.25 4.75 7.34483 4.75 12C4.75 13.7675 5.23783 15.1659 6.05464 16.2206C6.29358 16.5292 6.38851 16.9392 6.2231 17.2926C6.12235 17.5079 6.01633 17.7134 5.90792 17.9082C4.94614 19.6364 5 20 6.99526 19.7297C8.0113 19.5263 9.14752 19.222 10.0954 18.7738C10.2933 18.6803 10.5134 18.6439 10.7305 18.6714C11.145 18.724 11.5695 18.75 12 18.75Z"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
};

Commit.propTypes = {
  addClass: PropTypes.string,
};

export default Commit;
