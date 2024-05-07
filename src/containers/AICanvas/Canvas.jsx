import { useState } from 'react';
import Flow from './Canvas/Flow';
import { samplers, models, filters } from '@/constants/filter.js';


const Canvas = () => {

  const [generateFrameWidth, setGenerateFrameWidth] = useState(512);
  const [generateFrameHeight, setGenerateFrameHeight] = useState(512);
  const [numberOfImages, setNumberOfImages] = useState(1);
  const [modelId, setModelId] = useState(filters[0].id);
  const [model, setModel] = useState(filters[0].id + '.' + filters[0].type);
  const [modelName, setModelName] = useState(filters[0].name);
  const [modelType, setModelType] = useState('checkpoint');
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [step, setStep] = useState(50);
  const [scale, setScale] = useState(7.5);
  const [seed, setSeed] = useState(-1);
  const [sampler, setSampler] = useState(samplers[0].value);
  const [vae, setVae] = useState(filters[0].vae);
  const [flag, setFlag] = useState(false);
  const [category, setCategory] = useState(models[0].value);

  return (
    <div className="bg-primary text-[#f7f8f8] font-inter">
      <Flow
        generateFrameWidth={generateFrameWidth} generateFrameHeight={generateFrameHeight}
        setGenerateFrameWidth={setGenerateFrameWidth} setGenerateFrameHeight={setGenerateFrameHeight}
        numberOfImages={numberOfImages} setNumberOfImages={setNumberOfImages}
        modelId={modelId} setModelId={setModelId}
        model={model} setModel={setModel}
        modelName={modelName} setModelName={setModelName}
        modelType={modelType} setModelType={setModelType} 
        prompt={prompt} setPrompt={setPrompt}
        negativePrompt={negativePrompt} setNegativePrompt={setNegativePrompt}
        step={step} setStep={setStep}
        scale={scale} setScale={setScale}
        seed={seed} setSeed={setSeed}
        sampler={sampler} setSampler={setSampler}
        vae={vae} setVae={setVae}
        flag={flag} setFlag={setFlag}
        category={category} setCategory={setCategory}
      />
    </div>
  );
};

export default Canvas;
