import { useState } from 'react';
import PropTypes from 'prop-types';
import { Eye, NoEye } from '../../assets';

const LineInput = ({ id, label, initialValue, placeholder, isPassword, addClass, handle, required, row = 1 }) => {
  const [value, setValue] = useState(initialValue || '');

  const [passwordType, setPasswordType] = useState(isPassword || false);

  const handleChange = (e) => {
    setValue(e.target?.value);
    if (handle) handle({ key: id, value: e.target?.value });
  };

  return (
    <div className="relative w-full mb-[18px]">
      <div className="flex pt-[22px] mt-3 relative ">
        <input
          id={id}
          type={passwordType ? 'password' : 'text'}
          className={`${addClass} w-full rounded border border-[#3c3f44] bg-[#1e2022] text-[#d6d8da] py-[3px] px-[12px] flex items-center transition-all min-h-[36px] text-[14px] outline-none transition ease-in-out delay-0 duration-300 focus:border-[#5858e6]`}
          rows={row}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          required={required}
        />
        {isPassword && (
          <button
            className="top-3 text-[hsla(180,7%,97%,.6)] absolute h-full flex right-[0] items-center justify-center appearance-none border-none bg-none w-[42px] cursor-pointer [transition:.2s_ease-in-out] z-10"
            onClick={() => setPasswordType(!passwordType)}
          >
            {passwordType ? <Eye addClass={'text-gray-700'} /> : <NoEye />}
          </button>
        )}

        <label
          htmlFor="negativePrompt"
          className="absolute top-0 left-0 pl-[1px] text-[13px] cursor-pointer text-[#d7d8db] block text-medium mb-[3px]"
        >
          {label}
        </label>
      </div>
    </div>
  );
};

LineInput.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  initialValue: PropTypes.string,
  placeholder: PropTypes.string,
  addClass: PropTypes.string,
  handle: PropTypes.func,
  isPassword: PropTypes.bool,
  required: PropTypes.any,
  row: PropTypes.number,
};

export default LineInput;
