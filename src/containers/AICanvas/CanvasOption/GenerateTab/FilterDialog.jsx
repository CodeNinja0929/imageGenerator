import { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';

import { Dialog, DialogHeader, DialogBody, IconButton } from '@material-tailwind/react';

import { XMarkIcon } from '@heroicons/react/24/outline';

import { ParameterContext } from '@/contexts/ParameterContext.jsx';
import { filters } from '@/constants/filter';
import { Search } from '@/assets';
import { searchFilter } from '@/constants';

const ModelCard = (props) => {
  const { model, handleModel } = props;

  return (
    <label
      htmlFor="modelstablediffusionv2"
      className="border-[1px] border-solid border-[#303236] [box-shadow:0_0_0_1px_transparent] rounded-[4px] [transition:.12s_ease-in-out] cursor-pointer relative overflow-hidden w-48 h-72 pb-[100%]"
    >
      <div className="absolute top-[0] left-[0] w-full h-full" onClick={handleModel}>
        <div className="w-full h-full">
          <img src={model.img} />
        </div>
        <div className="p-[9px] text-[#f7f8f8] flex flex-col justify-end absolute top-[0] left-[0] w-full h-full bg-[linear-gradient(12deg,rgba(0,0,0,.9)_10%,transparent_40%)]">
          {model.name}
        </div>
      </div>
    </label>
  );
};

ModelCard.propTypes = {
  model: PropTypes.object,
  handleModel: PropTypes.func,
};

const FilterDialog = ({open, handleOpen, selectModel, params}) => {

  const selectedFilters = filters.filter((item) => item.category == params.category);

  const handleModel = (model) => {
    selectModel(model);
    handleOpen();
  };

  return (
    <Fragment>
      <Dialog
        open={open}
        handler={handleOpen}
        size="xl"
        className="bg-generatorParam h-[50rem] overflow-scroll scrollbar-hide border-none outline-none"
      >
        <DialogHeader className="border-none justify-between">
          <h4 className="text-white p-1 font-medium text-[18px]">Select AI Model </h4>
          <IconButton color="blue-gray" size="sm" variant="text" onClick={handleOpen} className="outline-none">
            <XMarkIcon strokeWidth={2} className="h-5 w-5 " />
          </IconButton>
        </DialogHeader>
        <DialogBody className="border-borderGray" divider>
          <div className="flex items-end justify-between flex-row-reverse flex-wrap w-full gap-3 mt-[-18px] p-[3px] border-[#303236] border-b border-solid">
            <div className="flex translate-y-3 items-center gap-[9px]">
              <div className="relative w-full mb-5">
                <div className="relative">
                  <Search addClass={'absolute left-[6px] top-[7px] text-[#646466]'} />
                  <input
                    id="textfilter"
                    className="mt--3 bg-[#1e2022] rounded border-solid border border-[#3c3f44] outline-none min-h-[28px] text-[12px] pt-[3px] pr-[14px] pb-[3px] pl-[28px] w-full max-w-full min-w-full text-[#d6d8da] shadow-[0_0_0_2px_transparent] flex items-center transition ease-in-out delay-0 duration-300 focus:border-[#5858e6]"
                  />
                </div>
              </div>
            </div>
            <div className="inline-flex items-end shrink-0 p-0 translate-y-[2px]">
              <nav className="pb-0">
                <ul className="text-[13px] text-[hsla(180,7%,97%,0.6)] ">
                  {searchFilter.map((filter, index) => (
                    <li key={index} className="relative mr-[18px] pr-[6px] pb-3 pl-[3px]">
                      <a className="text-[#5858e6] text-[13px] leading-3 cursor-pointer flex items-center">
                        <filter.component />
                        <span>{filter.title} </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
          <div className="grid 2xl:grid-cols-7 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-1 overflow-hidden p-[3px]">
            {selectedFilters.map((model, index) => (
              <ModelCard key={index} model={model} handleModel={() => handleModel(model)} />
            ))}
          </div>
        </DialogBody>

        {/* <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter> */}
      </Dialog>
    </Fragment>
  );
};

FilterDialog.propTypes = {
  open: PropTypes.bool,
  handleOpen: PropTypes.func,
  selectModel: PropTypes.func,
};

export default FilterDialog;
