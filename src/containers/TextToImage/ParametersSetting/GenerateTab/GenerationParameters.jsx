import PropTypes from 'prop-types';

import { Slider, LineInput } from '@/components/common';

const GenerationParameters = ({ handleUpdate, params }) => {
  const handleChange = ({ key, value }) => {
    handleUpdate({ [key]: value });
  };

  return (
    <div className="pt-3 block">
      <div className="pt-3">
        <Slider
          id="n-image"
          label="Number of images"
          minValue={1}
          maxValue={10}
          stepValue={1}
          defaultValue={params.num_outputs}
          handle={handleChange}
        />
        <div className="mt-[9px] grid grid-cols-2 gap-4 pt-6">
          <Slider id="step" label="Steps" minValue={1} maxValue={75} stepValue={1} defaultValue={params.steps} handle={handleChange} />
          <Slider
            id="g-scale"
            label="Guidance scale"
            minValue={0}
            maxValue={20}
            stepValue={1}
            defaultValue={params.guidance_scale}
            handle={handleChange}
          />
        </div>
      </div>
      <div className="pt-3">
        <LineInput id="seed" label="Seed" initialValue={String(params.seed)} handle={handleChange} />
      </div>
    </div>
  );
};

GenerationParameters.propTypes = {
  handleUpdate: PropTypes.func,
};

export default GenerationParameters;
