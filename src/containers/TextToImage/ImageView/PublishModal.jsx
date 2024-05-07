import { useState } from 'react';
import PropTypes from 'prop-types';
import { LineInput, Select } from '$common';
import { publicCategory } from '@/constants/filter.js'

const PublishModal = ({ closePublish, onPublish }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const handleChange = (e) => {
    setDescription(e.target?.value);
  };

  const handleCategory = (e) => {
    if (e.target?.value == 'None') {
      alert('Select category...');
    } else {
      setCategory(e.target?.value);
    }
  }

  const handlePublish = () => {
    if (title == '') alert('input title');
    else onPublish({ title, category, description });
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full min-h-screen bg-[rgba(0,0,0,.5)] transition-[.13s_ease-in-out]">
      <div
        className="absolute top-0 left-0 w-full min-h-screen h-full bg-[rgba(0,0,0,.2)] backdrop-filter backdrop-blur-[3px] transition-[80ms_ease-in-out] animate-[ai-generator_fade-in_S3aCC_.24s_ease-in-out]"
        onClick={closePublish}
      ></div>
      <div className="flex items-center justify-center h-full w-full p-6 overflow-y-scroll">
        <div className="flex flex-row flex-shrink-0 m-auto bg-[rgba(31,32,35,.94)] w-[600px] max-h-[90vh] backdrop-filter backdrop-blur-md border-[1px] border-solid border-[#303236] rounded-[12px] p-12">
          <div className="flex-shrink-0 w-full">
            <LineInput
              id="title"
              label="Title"
              addClass="opacity-50 w-full"
              placeholder="Enter your title..."
              handle={(e) => setTitle(e.value)}
              required
            />

            <Select id="category" label="Category" options={publicCategory} handleUpdate={handleCategory} param={'None'} />

            <div className="pt-[22px] mt-3 relative ">
              <textarea
                id="description"
                name="description"
                className="opacity-50 w-full pt-[9px] text-[14px] resize-none leading-[160%] rounded border border-[#3c3f44] bg-[#1e2022] text-[#d6d8da] py-[3px] px-[14px] flex items-center transition-all"
                rows={4}
                value={description}
                placeholder="Add description..."
                onChange={handleChange}
              />
              <label
                htmlFor="description"
                className="absolute top-0 left-0 pl-[1px] text-[13px] cursor-pointer text-[#d7d8db] block text-medium mb-[3px]"
              >
                Description
              </label>
            </div>
            <div className="flex mt-4 justify-end">
              <button
                className="appearance-none text-left no-underline box-border h-[30px] pl-[14px] pr-[14px] inline-block w-auto rounded-[4px] font-semibold relative leading-none text-xs select-none cursor-pointer border-[1px] border-solid border-[transparent] text-[#a5d8ff] hover:opacity-80 bg-[#9d5454] mx-4"
                type="button"
                onClick={closePublish}
              >
                <div className="flex items-center justify-center h-full overflow-visible">
                  <span className="flex whitespace-nowrap h-full overflow-hidden items-center text-white">Close</span>
                </div>
              </button>
              <button
                className="appearance-none text-left no-underline box-border h-[30px] pl-[14px] pr-[14px] inline-block w-auto rounded-[4px] font-semibold relative leading-none text-xs select-none cursor-pointer border-[1px] border-solid border-[transparent] text-[#a5d8ff] hover:opacity-80 bg-[#1F463E]"
                type="button"
                onClick={handlePublish}
              >
                <div className="flex items-center justify-center h-full overflow-visible">
                  <span className="flex whitespace-nowrap h-full overflow-hidden items-center text-white">Publish</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

PublishModal.propTypes = {
  onPublish: PropTypes.func,
  closePublish: PropTypes.func,
};

export default PublishModal;
