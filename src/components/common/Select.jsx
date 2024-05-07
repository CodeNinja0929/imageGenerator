import { useState } from 'react';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const Select = ({ id, label, options, handleUpdate, param }) => {
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    const option = document.querySelector(`option[value="${param}"`);
    option.selected = true;
  }, []);

  const handleChange = (event) => {
    setIsSelected(true);

    handleUpdate({ [id]: event.target.value });
  };
  return (
    <div className="w-full relative mb-[18px]">
      <div className="cursor-pointer mt-3 relative">
        <label htmlFor="model" className="block mb-2 text-sm font-medium dark:text-white text-[#d7d8db]">
          {label}
        </label>
        <select
          id="model"
          className={`bg-[#1e2022] border border-[#3c3f44] text-[#d6d8da] text-sm rounded-lg focus:ring-borderPurple focus:border-borderPurple block w-full p-2.5 outline-none ${
            isSelected && 'border-borderPurple'
          }`}
          onChange={handleChange}
        >
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

Select.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.array,
  handleUpdate: PropTypes.func,
};
export default Select;
