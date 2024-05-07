import { useState, useContext } from 'react';
import { style } from '@/style.js';
import { ParameterContext } from '@/contexts/ParameterContext.jsx';
import { ImageContext } from '@/pages/TextToImage.jsx';
import { useAuth } from '@/contexts/AuthProvider';
import { Loader } from '$common';

const GenerateActions = () => {
  const { data } = useContext(ParameterContext);
  const [images, setImages] = useContext(ImageContext);

  const [generating, setGenerating] = useState(false);

  const { AuthenticatedFetch } = useAuth();
  const requiredCredit = data.num_outputs;
  const user = JSON.parse(sessionStorage.getItem('user'));

  const handleClick = () => {
    if (data['prompt'] === '') {
      alert('Insert prompt');
    } else if (requiredCredit > user.credit) {
      alert('You have to purchase more credit.');
    } else {
      const user = JSON.parse(sessionStorage.getItem('user'));
      const params = JSON.parse(JSON.stringify(data));

      delete params.category;

      if (params.modelType == 'lora') {
        params.prompt = params.prompt + ' ' + params.trigger;
        delete params.trigger;
      }

      if (params.modelType == 'prompt') {
        params.prompt = params.prompt + ', ' + params.filterPrompt;
        delete params.filterPrompt;
      }

      const postData = {
        params: params,
        userId: user.id,
        credit: requiredCredit,
        from: 'txt2img'
      };

      setGenerating(true);
      AuthenticatedFetch('POST', '/v1/projects/txt2img', postData)
        .then((res) => {
          if (res.status == 200) {
            sessionStorage.setItem('user', JSON.stringify(res.data.user));
            setGenerating(false);
            setImages((images) => [
              ...images,
              {
                id: res.data.image._id,
                src: res.data.image,
              },
            ]);
          } else {
            alert(res.data.error);
          }
        })
        .catch((err) => {
          setGenerating(false);
        });
    }
  };

  return (
    <div className="pt-[3px] px-4 pb-3 w-full border-t border-t-borderGray bg-generatorParam">
      <small className="text-[11px] py-2 pr-[1px] text-normal flex w-full text-[#AEAFAF]">
        Need {requiredCredit} credits for this generation.
      </small>
      <div className="flex relative p-0">
        <button
          className={`w-full h-[46px] text-[16px] leading-[16px] font-semibold bg-[#5858e6] border border-borderPurple ${
            style.button1
          } ${generating && 'opacity-60'}`}
          onClick={handleClick}
          disabled={generating}
        >
          {generating ? (
            <div>
              <span className="absolute left-20 top-3.5">
                {' '}
                <Loader />
              </span>
              <span>Generating...</span>
            </div>
          ) : (
            <span>{`Generate ${data.num_outputs} images`}</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default GenerateActions;
