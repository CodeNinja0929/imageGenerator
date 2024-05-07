import { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import { GeneratePrompt, GenerationParameters, GenerateResolution, SelectModel, GenerateAdvanced } from './GenerateTab';

import { InstructionSvg, ResolutionSvg, ParametersSvg, SettingSvg, AIModel } from '@/assets';

import { Dropdown } from '$common';
import { samplers, models, filters } from '@/constants/filter.js';
import { ParameterContext } from '@/contexts/ParameterContext.jsx';

const Generate = () => {
  const { data, setData } = useContext(ParameterContext);

  useEffect(() => {
    setData({
      modelId: filters[0].id,
      model: filters[0].id + '.' + filters[0].type,
      model_name: filters[0].name,
      category: models[0].value,
      modelType: 'checkpoint',
      prompt: '',
      negative_prompt: '',
      width: 512,
      height: 512,
      num_outputs: 1,
      steps: 50,
      guidance_scale: 7.5,
      seed: -1,
      sampler: samplers[0].value,
      vae: filters[0].vae,
    });
  }, []);

  const handleGenerateParams = (value) => {
    setData((prevState) => ({
      ...prevState,
      ...value,
    }));
  };


  return (
    <div className="overflow-hidden h-[calc(100vh-48px-24px-150px)]">
      <div className="p-4 pt-6 max-h-[calc(100vh-48px-24px-150px)] overflow-auto hide-scrollbar">
        <Dropdown content={SelectModel} label="AI Model" icon={AIModel} handleUpdate={handleGenerateParams} params={data} />
        <Dropdown content={GeneratePrompt} label="Prompt" icon={InstructionSvg} handleUpdate={handleGenerateParams} params={data} />
        <Dropdown content={GenerateResolution} label="Resolution" icon={ResolutionSvg} handleUpdate={handleGenerateParams} params={data} />
        <Dropdown
          content={GenerationParameters}
          label="Generation Parameters"
          icon={ParametersSvg}
          handleUpdate={handleGenerateParams}
          params={data}
        />
        <Dropdown content={GenerateAdvanced} label="Advanced" icon={SettingSvg} handleUpdate={handleGenerateParams} params={data}/>
      </div>
    </div>
  );
};

const Edit = () => {
  return (
    <div className="overflow-hidden h-[calc(100vh-48px-24px-150px)]">
      <div className="p-4 pt-6 max-h-[calc(100vh-48px-24px-150px)] overflow-auto"></div>
    </div>
  );
};

const GenerateParameters = ({ tabToggle }) => {
  return <>{tabToggle === 'generate' ? <Generate /> : <Edit />}</>;
};

GenerateParameters.propTypes = {
  tabToggle: PropTypes.string,
};

export default GenerateParameters;
