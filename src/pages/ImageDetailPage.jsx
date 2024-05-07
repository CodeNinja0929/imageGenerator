import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthProvider';
import { generationData } from '@/style';
import { FilledFavourite, Close } from '@/assets';

const timeSince = (dataString) => {
  const now = new Date();
  const createdDate = new Date(dataString);

  const seconds = Math.floor((now - createdDate) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days >= 1) {
    if (days == 1) {
      return 'a day ago';
    }
    return days + ' days ago';
  } else if (hours >= 1) {
    if (hours == 1) {
      return 'a hour ago';
    }
    return hours + ' hours ago';
  } else if (minutes >= 1) {
    if (minutes == 1) {
      return 'a minute ago';
    }
    return minutes + ' minutes ago';
  } else {
    return seconds + ' seconds ago';
  }
};

const ImageDetailPage = () => {
  const [images, setImages] = useState([]);
  const [copied, setCopied] = useState(false);
  const { UnauthenticatedFetch } = useAuth();

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    UnauthenticatedFetch('GET', `/v1/image/${id}`).then((res) => {
      setImages(
        res.data.map((img) => ({
          id: img._id,
          src: img,
        }))
      );
    });
  }, []);
  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000); // Change this value to adjust the duration
  };

  const handleBack = () => {
    navigate(-1);
  };

  const buttonText = copied ? 'Copied!' : 'Use Generation Data';
  return (
    <div>
      {images.map((image) => (
        <div
          key={image.id}
          className="outline-[0px] no-underline font-inter text-[rgb(193,_194,_197)] bg-[rgb(26,_27,_30)] box-border rounded-[4px] [box-shadow:none] w-screen h-screen flex relative overflow-hidden"
        >
          <div className="relative flex-1">
            <div className="flex items-center justify-center absolute inset-0">
              <div className="flex items-center justify-center relative h-[701px] w-[701px]">
                <img src={image.src.url} alt="Selected Image" className="w-full h-auto" />
              </div>
            </div>
          </div>

          <div className="text-[rgb(193,_194,_197)] relative overflow-hidden bg-[rgb(37,_38,_43)] w-[400px] [border-left:1px_solid_rgb(55,_58,_64)] flex flex-col p-[16px]">
            <div className="-mx-4 -mt-4 [border-bottom:1px_solid_rgb(55,_58,_64)] ">
              <div className="flex justify-between p-3">
                <div className="flex flex-row items-stretch justify-start gap-2 ">
                  <div className="box-border relative block select-none overflow-hidden w-9 min-w-9 h-9 rounded-[32px] no-underline border-[0] p-0 bg-[rgba(0,0,0,0.31)]">
                    <img
                      src={image.src.user_picture}
                      className="object-cover w-full h-full block border-none align-middle"
                    />
                  </div>
                  <div className="flex flex-col items-stretch justify-start gap-0">
                    <div className="flex text-[12px] font-medium overflow-hidden overflow-ellipsis leading-[1.55] text-green-600">
                      {image.src.user_name}
                    </div>

                    <div className="overflow-hidden overflow-ellipsis no-underline -mt-[2px] -mb-[2px] text-[#909296] text-xs leading-[1.55]">
                      {timeSince(image.src.created_at)}
                    </div>
                  </div>
                </div>
                <div
                  className="flex cursor-pointer  border-[1px] border-solid border-[rgb(55,58,64)] bg-[rgb(37,_38,_43)] text-white h-[34px] min-h-[34px] w-[34px] max-h-[34px] rounded-[4px] items-center justify-center"
                  onClick={handleBack}
                >
                  <Close />
                </div>
              </div>
            </div>
            <div className="-mx-3 -mt-4 [border-bottom:1px_solid_rgb(55,_58,_64)] py-3">
              <div className="flex flex-row mt-4 ml-2">
                <div className="">
                  <FilledFavourite />
                </div>
                <div className="ml-2 text-[14px]">{image.src.star}</div>
              </div>
            </div>
            <div className="-mx-3 -mt-4 [border-bottom:1px_solid_rgb(55,_58,_64)] py-3">
              <div className="flex flex-col mt-3 ml-2">
                <div className="flex font-semibold ">
                  <h2 className="text-lg text-blue-300">{image.src.title}</h2>
                </div>
                <div className="flex text-[12px]">
                  <p>{image.src.description}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-stretch justify-start gap-[10px]">
              <div className="text-base leading-[1.55] no-underline mt-3 text-center">Generation Data</div>
              <div className={`${generationData.component}`}>
                <div className={`${generationData.label}`}>Prompt</div>
                <pre className={`${generationData.value}`}>{image.src.prompt}</pre>
              </div>
              <div className={`${generationData.component}`}>
                <div className={`${generationData.label}`}>Negative prompt</div>
                <pre className={`${generationData.value}`}>{image.src.negative_prompt}</pre>
              </div>
              <div className={`${generationData.component}`}>
                <div className={`${generationData.label}`}>Model</div>
                <pre className={`${generationData.value}`} dir="ltr">
                  {image.src.model_name}
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
                    {image.src.guidance_scale}
                  </code>
                </div>
                <div className={`${generationData.component1}`}>
                  <div className={`${generationData.label1}`}>Steps</div>
                  <code className={`${generationData.value1}`} dir="ltr">
                    {image.src.steps}
                  </code>
                </div>
                <div className={`${generationData.component1}`}>
                  <div className={`${generationData.label1}`}>Seed</div>
                  <code className={`${generationData.value1}`} dir="ltr">
                    {image.src.seed}
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
      ))}
    </div>
  );
};

export default ImageDetailPage;
