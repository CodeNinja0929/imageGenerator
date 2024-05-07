import { ImageUpload } from '$common';
import { style } from '@/style';
import { Linejoin } from '@/assets';

const GenerateImage = () => {
  return (
    <div className="pt-3 block text-left">
      {<ImageUpload />}
      <div className="mb-6 p-0">
        <div className="flex flex-col py-4 relative w-full">
          <label className="text-[#d7d8db] font-medium mb-[3px] pl-[1px] text-[13px] transition-all cursor-pointer">
            Control image with ControlNet:
          </label>
          <div
            className={`${style.input_zeros} min-h-[36px] text-[14px] py-[3px] px-4 flex justify-between hover:bg-borderGray`}
          >
            None
            <Linejoin addClass="hover:borderPurple" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateImage;
