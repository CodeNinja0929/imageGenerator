import { useState } from 'react';
import ReactSwitch from 'react-switch';
import PropTypes from 'prop-types';
import { Select } from '$common';
import { samplers } from '@/constants/filter.js';

const GenerateAdvanced = ({ handleUpdate, params }) => {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);

  const handleChange1 = (val) => {
    setChecked1(val);
  };

  const handleChange2 = (val) => {
    setChecked2(val);
  };

  return (
    <div className="pt-3 block">
      <Select id="sampler" label="Sampler" options={samplers} handleUpdate={handleUpdate} param={params.sampler} />
      <div className="flex items-center">
        <ReactSwitch
          onColor="#5858e6"
          offColor="#303236"
          uncheckedIcon={false}
          checkedIcon={false}
          height={24}
          width={42}
          handleDiameter={18}
          checked={checked1}
          onChange={handleChange1}
        />
        <span
          className="text-[12px] font-semibold cursor-pointer text-[#949494] ml-[9px] hover:opacity-75"
          onClick={handleChange1}
        >
          Skip ControlNet pre-processing
        </span>
      </div>
      <div className="flex items-center mt-3">
        <ReactSwitch
          onColor="#5858e6"
          offColor="#303236"
          uncheckedIcon={false}
          checkedIcon={false}
          height={24}
          width={42}
          handleDiameter={18}
          checked={checked2}
          onChange={handleChange2}
        />
        <span
          className="text-[12px] font-semibold cursor-pointer text-[#949494] ml-[9px] hover:opacity-75"
          onClick={handleChange2}
        >
          Fix faces (+1 credit/image)
        </span>
      </div>
      <div className="flex items-center pt-3">
        <small className="text-[11px] pt-[3px] pb-[1px] w-full text-[#949494]">
          You can always upscale and enhance faces after generating images
        </small>
      </div>
    </div>
  );
};

GenerateAdvanced.propTypes = {
  handleUpdate: PropTypes.func,
};
export default GenerateAdvanced;
