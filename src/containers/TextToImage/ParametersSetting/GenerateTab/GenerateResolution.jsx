import { useState } from 'react';
import PropTypes from 'prop-types';

import { Slider } from '$common';

const Unit = ({ htmlFor, index, content, width, height, clickedNo, setClickedNo }) => {
  return (
    <label
      htmlFor={htmlFor}
      onClick={() => {
        setClickedNo({ index, width, height });
      }}
      className={`w-[60px] h-6 border border-[#3c3f44] bg-primary rounded py-[3px] px-[9px] text-xs flex items-center justify-between cursor-pointer ${
        clickedNo === index && 'border-borderPurple'
      }`}
    >
      <span className={`text-[#f7f8f8] text-[10px] rounded-sm ${clickedNo !== index && 'opacity-75'}`}>{content}</span>
      <i
        className={`rounded-sm  ${clickedNo === index ? 'bg-borderPurple' : 'bg-[#3C3F44] opacity-75'}`}
        style={{ width: `${width}px`, height: `${height}px` }}
      />
    </label>
  );
};

Unit.propTypes = {
  htmlFor: PropTypes.string,
  index: PropTypes.number,
  content: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  clickedNo: PropTypes.number,
  setClickedNo: PropTypes.func,
};

const Simple = ({ handle }) => {
  const [clickedNo, setClickedNo] = useState(1);

  const handleClick = ({ index, width, height }) => {
    setClickedNo(index);
    handle({
      width: 64 * width,
      height: 64 * height,
    });
  };

  return (
    <div className="flex flex-col gap-[6px]">
      <div className="flex gap-[6px]">
        <Unit
          htmlFor="aspectRatio1_1"
          index={1}
          content="1:1"
          width={8}
          height={8}
          clickedNo={clickedNo}
          setClickedNo={handleClick}
        />
      </div>
      <div className="flex gap-[6px]">
        <Unit
          htmlFor="aspectRatio4_5"
          index={2}
          content="4:5"
          width={8}
          height={10}
          clickedNo={clickedNo}
          setClickedNo={handleClick}
        />
        <Unit
          htmlFor="aspectRatio2_3"
          index={3}
          content="2:3"
          width={8}
          height={12}
          clickedNo={clickedNo}
          setClickedNo={handleClick}
        />
        <Unit
          htmlFor="aspectRatio4_7"
          index={4}
          content="4:7"
          width={8}
          height={14}
          clickedNo={clickedNo}
          setClickedNo={handleClick}
        />
      </div>
      <div className="flex gap-[6px]">
        <Unit
          htmlFor="aspectRatio5_4"
          index={5}
          content="5:4"
          width={10}
          height={8}
          clickedNo={clickedNo}
          setClickedNo={handleClick}
        />
        <Unit
          htmlFor="aspectRatio3_2"
          index={6}
          content="3:2"
          width={12}
          height={8}
          clickedNo={clickedNo}
          setClickedNo={handleClick}
        />
        <Unit
          htmlFor="aspectRatio7_4"
          index={7}
          content="7:4"
          width={14}
          height={8}
          clickedNo={clickedNo}
          setClickedNo={handleClick}
        />
      </div>
    </div>
  );
};

Simple.propTypes = {
  handle: PropTypes.func,
};

const Advanced = ({ handle }) => {
  const handleChange = ({ key, value }) => {
    handle({ [key]: value });
  };

  return (
    <div className="mt-[9px] grid grid-cols-2 gap-4">
      <Slider
        id="resolution-width"
        label="Width"
        minValue={256}
        maxValue={1024}
        stepValue={64}
        defaultValue={512}
        handle={handleChange}
      />
      <Slider
        id="resolution-height"
        label="Height"
        minValue={256}
        maxValue={1024}
        stepValue={64}
        defaultValue={512}
        handle={handleChange}
      />
    </div>
  );
};

Advanced.propTypes = {
  handle: PropTypes.func,
};

const GenerateResolution = ({ handleUpdate }) => {
  const [tabToggle, setTabToggle] = useState('simple');

  return (
    <div className="pt-3 block text-left">
      <div className="inline-block mb-3 border-b border-b-borderGray ">
        <div className="translate-y-px">
          <nav className="pb-0">
            <ul className="m-0 p-0 list-none flex items-center text-neutral-400">
              <li
                className="mr-[18px] pl-[6px] pb-3 pr-[3px] relative"
                onClick={() => {
                  setTabToggle('simple');
                }}
              >
                <a
                  className={`text-[13px] leading-[12px] cursor-pointer flex items-center ${
                    tabToggle === 'simple' && 'text-borderPurple'
                  } `}
                >
                  Simple
                </a>
              </li>
              <li
                className="mr-[18px] pl-[6px] pb-3 pr-[3px] relative"
                onClick={() => {
                  setTabToggle('advanced');
                }}
              >
                <a
                  className={`text-[13px] leading-[12px] cursor-pointer flex items-center ${
                    tabToggle === 'advanced' && 'text-borderPurple'
                  } `}
                >
                  Advanced
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      {tabToggle == 'simple' ? <Simple handle={handleUpdate} /> : <Advanced handle={handleUpdate} />}
    </div>
  );
};

GenerateResolution.propTypes = {
  handleUpdate: PropTypes.func,
};

export default GenerateResolution;
