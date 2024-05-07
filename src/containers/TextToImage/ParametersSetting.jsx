import { useState } from 'react';

import { GenerateTabs, GenerateParameters, GenerateActions } from './ParametersSetting/index.js';
import { ParameterContext } from '@/contexts/ParameterContext';

const ParametersSetting = () => {
  const [tabToggle, setTabToggle] = useState('generate');
  const [data, setData] = useState({});

  return (
    <div className="w-full sticky top-[69px] h-[calc(100vh)-69px] pl-6 py-6">
      <div className="w-[380px] bg-[#232426] border border-borderGray rounded-md h-full overflow-hidden fixed z-50">
        <ParameterContext.Provider value={{ data, setData }}>
          <GenerateTabs tabToggle={tabToggle} setTabToggle={setTabToggle} />
          <GenerateParameters tabToggle={tabToggle} />
          <GenerateActions />
        </ParameterContext.Provider>
      </div>
    </div>
  );
};

export default ParametersSetting;
