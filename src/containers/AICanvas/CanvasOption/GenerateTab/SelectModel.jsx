import { useState, useContext } from 'react';
import PropTypes from 'prop-types';

import FilterDialog from './FilterDialog.jsx';
import { models, filters } from '@/constants/filter.js';
import { Select, Prompt } from '$common';

const SelectModel = ({ handleUpdate, params }) => {
  const [openFilter, setOpenFilter] = useState(false);

  const [filter, setFilter] = useState(filters.find((filter) => filter.id == params.modelId));

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
    params.setModelId('sdxl_vaefix_1.0');

    handleUpdate(value);

    if (value.category == 'sdxl') {
      params.setModelId(filters[1].id);
      params.setModel(filters[1].id + '.' + filters[1].type);
      params.setModelName(filters[1].name);
      params.setVae(filters[1].vae);

      setFilter({
        img: '',
        name: 'None',
      });
    } else if (value.category == 'sd1') {
      params.setModelId(filters[0].id);
      params.setModel(filters[0].id + '.' + filters[0].type);
      params.setModelName(filters[0].name);
      params.setVae(filters[0].vae);

      setFilter({
        img: '',
        name: 'None',
      });
    } else if (value.category == 'sd2') {
      setFilter({
        img: '',
        name: 'None',
      });
    }
  };

  const handleTextChange = (key, value) => {
    params.setNegativePrompt(value);
    handleUpdate({ [key]: value });
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

        {openFilter && (
          <FilterDialog open={openFilter} handleOpen={handleOpenFilter} selectModel={selectFilter} params={params} />
        )}
      </div>

      <Prompt
        id="g-negative-prompt"
        label="Negative Prompt"
        prompt={params.negativePrompt}
        changeValue={handleTextChange}
        handle={handleUpdate}
        placeholder="Describe what you don't want in your image."
      />
    </div>
  );
};

SelectModel.propTypes = {
  handleUpdate: PropTypes.func,
};

export default SelectModel;
