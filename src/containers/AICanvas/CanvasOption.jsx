import { CanvasParameters } from './CanvasOption/index.js';

const CanvasOption = (props) => {
  return (
    <div className="fixed top-[90px] right-[12px] w-[300px]  bg-[#232426] border-[1px] border-solid border-[#303236] rounded-[4px] pt-[3px] px-[0] pb-[12px] [box-shadow:0_2px_4px_0_rgba(0,0,82,.08)] flex flex-col overflow-hidden">
      <div className="min-h-[calc(100vh-24px-90px)]">
        <CanvasParameters params={props} />
      </div>
    </div>
  );
};

export default CanvasOption;
