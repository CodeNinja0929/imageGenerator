import { useState } from 'react';
import PropTypes from 'prop-types';
import { generationData } from '../../style';

const ShareImageModal = ({ img, onClose }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000); // Change this value to adjust the duration
  };

  const buttonText = copied ? 'Copied!' : 'Use Generation Data';

  return (
    <div className="fixed top-0 left-0 w-full h-full min-h-screen bg-[rgba(0,0,0,.5)] transition-[.13s_ease-in-out]">
      <div
        className="absolute top-0 left-0 w-full min-h-screen h-full bg-[rgba(0,0,0,.2)] backdrop-filter backdrop-blur-[3px] transition-[80ms_ease-in-out] animate-[ai-generator_fade-in_S3aCC_.24s_ease-in-out]"
        onClick={onClose}
      ></div>
      <div className="flex items-center justify-center h-full w-full p-6 overflow-y-scroll">
        <div className="flex flex-row flex-shrink-0 m-auto bg-[rgba(31,32,35,.94)] w-3/4 h-full backdrop-filter backdrop-blur-md border-[1px] border-solid border-[#303236] rounded-[12px] p-12">
          <div className="flex-shrink-0 w-2/3">
            <img src={img.src.url} alt="Selected Image" className="w-full h-full object-cover" />
          </div>

          <div className="flex-grow w-1/3 pl-10">
            <div className="flex flex-col items-stretch justify-start gap-[10px]">
              <div className="text-base leading-[1.55] no-underline mt-[2px] text-center">Generation Data</div>
              <div className={`${generationData.component}`}>
                <div className={`${generationData.label}`}>Prompt</div>
                <pre className={`${generationData.value}`}>{img.src.prompt}</pre>
              </div>
              <div className={`${generationData.component}`}>
                <div className={`${generationData.label}`}>Negative prompt</div>
                <pre className={`${generationData.value}`}>{img.src.negative_prompt}</pre>
              </div>
              <div className={`${generationData.component}`}>
                <div className={`${generationData.label}`}>Model</div>
                <pre className={`${generationData.value}`} dir="ltr">
                  {img.src.model_name}
                </pre>
              </div>
              <div className="box-border flex [flex-flow:row_wrap] items-center justify-between gap-[16px]">
                <div className={`${generationData.label1}`}>Sampler</div>
                <code className="leading-[1.55] p-[2px_calc(5px)] rounded-[4px] text-[rgb(193,_194,_197)] bg-[rgb(44,_46,_51)] text-xs flex-1 text-right overflow-hidden whitespace-nowrap">
                  DPM++ SDE Karras
                </code>
              </div>
              <div className="box-border grid grid-cols-[repeat(2,_minmax(0px,_1fr))] gap-y-[10px] gap-x-[16px]">
                <div className={`${generationData.component1}`}>
                  <div className={`${generationData.label1}`}>CFG scale</div>
                  <code className={`${generationData.value1}`} dir="ltr">
                    {img.src.guidance_scale}
                  </code>
                </div>
                <div className={`${generationData.component1}`}>
                  <div className={`${generationData.label1}`}>Steps</div>
                  <code className={`${generationData.value1}`} dir="ltr">
                    {img.src.steps}
                  </code>
                </div>
                <div className={`${generationData.component1}`}>
                  <div className={`${generationData.label1}`}>Seed</div>
                  <code className={`${generationData.value1}`} dir="ltr">
                    {img.src.seed}
                  </code>
                </div>
              </div>
              <button
                className={`appearance-none text-left no-underline box-border h-[30px] pl-[14px] pr-[14px] inline-block w-auto rounded-[4px] font-semibold relative leading-none text-xs select-none cursor-pointer border-[1px] border-solid border-[transparent] text-[#a5d8ff] hover:opacity-80 ${
                  copied ? 'bg-[#1F463E]' : 'bg-[#233549]'
                }`}
                type="button"
                onClick={handleCopy}
              >
                <div className="flex items-center justify-center h-full overflow-visible">
                  <span className="flex whitespace-nowrap h-full overflow-hidden items-center">{buttonText}</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ShareImageModal.propTypes = {
  img: PropTypes.object,
  onClose: PropTypes.func,
};

export default ShareImageModal;
