import PropTypes from 'prop-types';

import { GenerationParameters, GenerateResolution, SelectModel, GenerateAdvanced } from './GenerateTab';
import { ResolutionSvg, ParametersSvg, SettingSvg, AIModel } from '@/assets';
import { Dropdown } from '$common';

const CanvasParameters = ({ params }) => {
  const handleGenerateParams = (value) => {
    if (value.width && value.height) {
      params.setGenerateFrameWidth(value.width);
      params.setGenerateFrameHeight(value.height);
    } else if (value.width) {
      params.setGenerateFrameWidth(value.width);
    } else if (value.height) {
      params.setGenerateFrameHeight(value.height);
    } else if (value.num_outputs) {
      params.setNumberOfImages(value.num_outputs);
    } else if (value.steps) {
      params.setStep(value.steps);
    } else if (value.guidance_scale) {
      params.setScale(value.guidance_scale);
    } else if (value.seed) {
      params.setSeed(value.seed);
    } else if (value.sampler) {
      params.setSampler(value.sampler);
    } else if (value.modelId && value.model && value.model_name && value.vae) {
      params.setModelId(value.modelId);
      params.setModel(value.model);
      params.setModelName(value.model_name);
      params.setVae(value.vae);
    } else if (value.category) {
      params.setCategory(value.category);
    }
  };

  return (
    <div className="overflow-hidden h-[calc(100vh)]">
      <div className="p-4 pt-6 max-h-[calc(100vh-100px)] overflow-auto hide-scrollbar">
        <Dropdown
          content={SelectModel}
          label="AI Model"
          icon={AIModel}
          handleUpdate={handleGenerateParams}
          params={params}
        />

        <Dropdown
          content={GenerateResolution}
          label="Resolution"
          icon={ResolutionSvg}
          handleUpdate={handleGenerateParams}
          params={params}
        />

        <Dropdown
          content={GenerationParameters}
          label="Generation Parameters"
          icon={ParametersSvg}
          handleUpdate={handleGenerateParams}
          params={params}
        />
        <Dropdown
          content={GenerateAdvanced}
          label="Advanced"
          icon={SettingSvg}
          handleUpdate={handleGenerateParams}
          params={params}
        />
      </div>
    </div>
  );
};

CanvasParameters.propTypes = {
  tabToggle: PropTypes.string,
};

export default CanvasParameters;
