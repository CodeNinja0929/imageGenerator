import { useState } from 'react';
import PropTypes from 'prop-types';

const Prompt = ({ id, label, prompt, changeValue, placeholder }) => {
  const [rows, setRows] = useState(3);

  const handleChange = (e) => {
    let key = 'prompt';
    if (id == 'g-negative-prompt') key = 'negative_prompt';

    changeValue(key, e.target?.value);

    const newRow = e.target?.value.split('\n').length > 3 ? e.target?.value.split('\n').length : 3;
    setRows(newRow);
  };

  return (
    <div className="relative w-full mb-[18px]">
      <div className="pt-[22px] mt-3 relative ">
        <textarea
          id={id}
          name={id}
          className={`w-full pt-[9px] text-[14px] resize-none leading-[160%] rounded border border-[#3c3f44] bg-[#1e2022] text-[#d6d8da] py-[3px] px-[14px] flex items-center outline-none transition ease-in-out delay-0 duration-300 focus:border-[#5858e6]`}
          rows={rows}
          value={prompt}
          placeholder={placeholder}
          onChange={handleChange}
        />
        <label
          htmlFor="prompt"
          className="absolute top-0 left-0 pl-[1px] text-[13px] cursor-pointer text-[#d7d8db] block text-medium mb-[3px]"
        >
          {label}
        </label>
      </div>
    </div>
  );
};

Prompt.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  prompt: PropTypes.string,
  changeValue: PropTypes.func,
  placeholder: PropTypes.string,
};

export default Prompt;
