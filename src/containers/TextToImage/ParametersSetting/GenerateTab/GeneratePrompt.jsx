import { useContext } from 'react';
import PropTypes from 'prop-types';

import { ParameterContext } from '@/contexts/ParameterContext';
import { Prompt } from '$common';
import { style } from '@/style.js';
import { RandomSvg } from '@/assets';
import { randomPrompts, randomNegativePrompts } from '@/constants/prompts.js';
import { useState } from 'react';

const GeneratePrompt = ({ handleUpdate }) => {
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const { data } = useContext(ParameterContext);

  const generateRandomPrompt = () => {
    if (Object.prototype.hasOwnProperty.call(randomPrompts, data.modelId)) {
      const randomIndex = Math.floor(Math.random() * randomPrompts[data.modelId].length);
      const randomPrompt = randomPrompts[data.modelId][randomIndex];
      const randomNegativePrompt =
        randomNegativePrompts[data.modelId][Math.min(randomIndex, randomNegativePrompts[data.modelId].length - 1)];
      if (randomPrompt === prompt) generateRandomPrompt();

      setPrompt(randomPrompt);
      setNegativePrompt(randomNegativePrompt);
      handleUpdate({ prompt: randomPrompt });
      handleUpdate({
        negative_prompt: randomNegativePrompt,
      });
    }
  };

  const handleTextChange = (key, value) => {
    if (key === 'prompt') setPrompt(value);
    else setNegativePrompt(value);
    handleUpdate({ [key]: value });
  };

  return (
    <div className="pt-3 block">
      {
        <Prompt
          id="g-prompt"
          label="Prompt"
          prompt={prompt}
          changeValue={handleTextChange}
          handle={handleUpdate}
          placeholder="Describe something  you'd like to see generated. Experiment with different words and styles..."
        />
      }
      <div className="mt-[-12px] flex justify-end">
        <div className="flex relative shrink-0">
          <button
            className={`${style.button} ${style.button1} h-6 text-[10px] leading-[10px] px-2 hover:text-borderPurple`}
            onClick={generateRandomPrompt}
          >
            <RandomSvg width={12} height={12} addClass={'mr-[6px]'} />
            Random
          </button>
        </div>
      </div>
      {
        <Prompt
          id="g-negative-prompt"
          label="Negative Prompt"
          prompt={negativePrompt}
          changeValue={handleTextChange}
          handle={handleUpdate}
          placeholder="Describe what you don't want in your image."
        />
      }
    </div>
  );
};

GeneratePrompt.propTypes = {
  handleUpdate: PropTypes.func,
};

export default GeneratePrompt;
