import { useState } from 'react';
import PropTypes from 'prop-types';

import { PricePlans, QAData } from '@/constants';
import { style } from '@/style';
import { Able, Unable, Plus, Minus } from '@/assets';

const Price = () => (
  <div className="max-w-[1200px] text-center m-auto pt-16 pb-6">
    <h1 className="text-[36px] leading-[120%] font-medium mt-3 mb-6 text-[#f7f8f8]">Pricing</h1>
    <p className="leading-[160%] text-[20px] text-[#AEAEAE] font-medium">
      Use Imaginea for free with 100 monthly credits.
      <br />
      Create more. Pay Less.
    </p>
  </div>
);

const Plan = () => (
  <div className="max-w-[1240px] m-auto pt-3 px-6 rounded-xl">
    <div className="grid grid-cols-5 w-full m-auto gap-6 justify-center">
      {PricePlans.map((plan, index) => (
        <div
          key={index}
          className={`text-[#f7f8f8] flex flex-col p-6 border border-[#3c3f44] rounded-2xl ${
            index == 1 && 'price_selected_plan_gradient relative border-borderPurple'
          }`}
        >
          <div className="text-[18px] font-medium text-center opacity-75">{plan.label}</div>
          <div className="mt-[6px] mb-4 text-center">
            <span className="text-2xl font-semibold">{plan.price}</span>
          </div>
          <div className="flex relative shrink-0 p-0">
            <a
              className={`${style.button1} ${
                index == 1 ? style.buttonPrimary : style.button
              } h-9 text-[14px]] leading-[14px] w-full`}
            >
              {plan.buttonLabel}
            </a>
          </div>
          <div className="relative py-6 ">
            <div className="w-full h-[1px] bg-[#3c3f44]"></div>
          </div>
          <div className="p-0 text-[14px] text-[#F7F8F8] opacity-90">
            <div className="pb-[6px] font-medium">{plan.subLabel}</div>
            {plan.features.map((feature, featureIndex) => (
              <div key={featureIndex} className="flex items-center py-[6px] opacity-80">
                {feature.able ? (
                  <Able addClass={'shrink-0 mr-[9px] stroke-[4px] text-borderPurple'} />
                ) : (
                  <Unable addClass={'shrink-0 mr-[9px] stroke-2 text-[#eb5757]'} />
                )}
                {feature.label}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const PriceQA = () => {
  const ToggleBlock = ({ data }) => {
    const [toggle, setToggle] = useState('true');
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

const Pricing = () => {
  return (
    <main className="bg-primary text-[#f7f8f8] font-inter">
      <div className="price_hero_gradient">
        <Price />
      </div>
      <Plan />
      <div className="max-w-7xl flex justify-center mx-auto py-6 font-normal w-full text-[11px] text-[#f7f8f8] opacity-70">
        Training custom DreamBooth model requires one-time payment of 2000 image credits.
      </div>
      <PriceQA />
    </main>
  );
};

export default Pricing;
