import PropTypes from 'prop-types';
import { useState } from 'react';

const match = {
  step: 'steps',
  'g-scale': 'guidance_scale',
  'resolution-width': 'width',
  'resolution-height': 'height',
  'n-image': 'num_outputs',
};

const Slider = ({ id, label, minValue, maxValue, stepValue, defaultValue, unit = 1, handle }) => {
  const [value, setValue] = useState(defaultValue);

  const handleSliderChange = (e) => {
    const newValue = parseInt(e.target.value);
    setValue(newValue);

    handle({ key: match[id], value: newValue });
  };

  return (
    <div>
      <label className="text-[13px] text-sliderLabel font-medium mb-[3px] flex flex-col">
        <span>
          {label}: {value / unit}
        </span>
        <input type="range" min={minValue} max={maxValue} step={stepValue} value={value} onChange={handleSliderChange} />
      </label>
    </div>
  );
};

Slider.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  stepValue: PropTypes.number,
  defaultValue: PropTypes.number,
  unit: PropTypes.number,
  handle: PropTypes.func,
};

export default Slider;
