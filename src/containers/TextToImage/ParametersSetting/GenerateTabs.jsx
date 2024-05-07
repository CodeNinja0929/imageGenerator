import PropTypes from 'prop-types';

const GenerateTabs = ({ tabToggle, setTabToggle }) => {
  return (
    <div className="w-full pt-3 px-4 border-b border-b-borderGray ">
      <div className="translate-y-px">
        <nav className="pb-0">
          <ul className="m-0 p-0 list-none flex items-center text-neutral-400">
            <li
              className="mr-[18px] pl-[6px] pb-3 pr-[3px] relative"
              onClick={() => {
                setTabToggle('generate');
              }}
            >
              <a
                className={`text-[13px] leading-[12px] cursor-pointer flex items-center ${
                  tabToggle === 'generate' && 'text-borderPurple'
                } `}
              >
                Generate
              </a>
            </li>
            {/* <li
              className="mr-[18px] pl-[6px] pb-3 pr-[3px] relative"
              onClick={() => {
                setTabToggle("edit");
              }}
            >
              <a
                className={`text-[13px] leading-[12px] cursor-pointer flex items-center ${
                  tabToggle === "edit" && "text-borderPurple"
                } `}
              >
                Edit
              </a>
            </li> */}
          </ul>
        </nav>
      </div>
    </div>
  );
};

GenerateTabs.propTypes = {
  tabToggle: PropTypes.string,
  setTabToggle: PropTypes.func,
};
export default GenerateTabs;
