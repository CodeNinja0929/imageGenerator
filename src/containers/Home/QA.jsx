import { useState } from 'react';
import PropTypes from 'prop-types';

import { QAData } from '@/constants';
import { Plus, Minus } from '@/assets';

const ToggleBlock = ({ data }) => {
  const [toggle, setToggle] = useState(true);

  const handleClick = () => {
    setToggle(!toggle);
  };

  return (
    <div className="border-t-[1px] border-t-[#303236] py-3 focus:">
      <div className="hover:bg-[#232426]">
        <button
          className="flex items-center justify-between w-full p-3 text-[18px] leading-[140%] font-semibold cursor-pointer"
          onClick={handleClick}
        >
          <span>{data.question}</span>
          {toggle ? <Plus addClass="shrink-0 text-borderPurple" /> : <Minus addClass="shrink-0 text-borderPurple" />}
        </button>
      </div>
      <div className={`h-full px-3 pb-3 ${toggle && 'hidden'} `}>
        <p className="mt-3 leading-[160%] text-[#f7f8f9] opacity-80">{data.answer}</p>
      </div>
    </div>
  );
};

ToggleBlock.propTypes = {
  data: PropTypes.object,
};

const QA = () => {
  return (
    <section className="max-w-[600px] m-auto pb-16">
      <h2 className="text-[24px] font-medium text-center py-6 m-0">Frequently Asked Questions</h2>
      <div className="border-b-[1px] border-b-[#303236]">
        {QAData.map((qa, index) => (
          <div key={index}>
            <ToggleBlock data={qa} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default QA;
