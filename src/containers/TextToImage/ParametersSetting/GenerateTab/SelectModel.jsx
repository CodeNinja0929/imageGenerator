import { useState, useContext } from 'react';
import PropTypes from 'prop-types';

import FilterDialog from './FilterDialog.jsx';
import { models, filters } from '@/constants/filter.js';
import { ParameterContext } from '@/contexts/ParameterContext.jsx';
import { Select } from '$common';

const SelectModel = ({ handleUpdate, params }) => {
  const { data } = useContext(ParameterContext);

  const [openFilter, setOpenFilter] = useState(false);

  const [filter, setFilter] = useState(filters.find((filter) => filter.id == data.modelId));

  const selectFilter = (value) => {
    setFilter(value);
    if (value.modelType == 'lora') {
      handleUpdate({
        modelId: value.id,
        model: value.baseModel + '.' + value.type,
        model_name: value.name,
        modelType: value.modelType,
        trigger: value.trigger,
        vae: value.vae,
      });
    } else if (value.modelType == 'prompt') {
      handleUpdate({
        modelId: value.id,
        model: value.baseModel + '.' + value.type,
        model_name: value.name,
        modelType: value.modelType,
        filterPrompt: value.prompt,
        vae: value.vae,
      });
    } else {
      handleUpdate({
        modelId: value.id,
        model: value.id + '.' + value.type,
        model_name: value.name,
        vae: value.vae,
      });
    }
  };
  const handleOpenFilter = () => setOpenFilter(!openFilter);

  const handleSelectModel = (value) => {

    handleUpdate(value);

    setFilter({
      img: '',
      name: 'None',
    });
  };

  return (
    <div>
      <Select id="category" label="Model" options={models} handleUpdate={handleSelectModel} param={params.category} />
      <div>
        <label htmlFor="filter" className="block mb-2 text-sm font-medium dark:text-white text-[#d7d8db]">
          Filter
        </label>
        <div
          id="filter"
          className="w-full border border-[#3c3f44] bg-[#1e2022] rounded-lg mb-4 p-2"
          onClick={handleOpenFilter}
        >
          <div className="flex items-center cursor-pointer gap-[6px] hover:opacity-75">
            <div className="flex items-center">
              <img src={filter.img} width="16px" height="16px" className="mr-3" />
              <h4 className="text-[13px] font-medium text-[#f7f8f8]">{filter.name}</h4>
            </div>
          </div>
        </div>

        {openFilter && <FilterDialog open={openFilter} handleOpen={handleOpenFilter} selectModel={selectFilter} />}
      </div>
    </div>
  );
};

SelectModel.propTypes = {
  handleUpdate: PropTypes.func,
};

export default SelectModel;
