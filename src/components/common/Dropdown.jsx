import { useState } from 'react';

import { Linejoin } from '@/assets';
import { collapse } from '@/style.js';
import PropTypes from 'prop-types';

const Dropdown = ({ content: Content, label, icon: Icon, handleUpdate, params }) => {
  const [toggle, setToggle] = useState(false);

  return (
    <div className={collapse.head}>
      <div
        className={collapse.head1}
        onClick={() => {
          setToggle(!toggle);
        }}
      >
        <div className="flex items-center hover:opacity-75">
          <Icon addClass={collapse.img} />
          <h4 className={collapse.headText}>{label}</h4>
        </div>
        <div className={collapse.svg}>
          <Linejoin addClass={`transition-all ${toggle ? 'h-3 w-3 mt-0 rotate-180' : 'w-[14px] h-[14px] mt-[1px] '}`} />
        </div>
      </div>
      {toggle && <Content handleUpdate={handleUpdate} params={params} />}
    </div>
  );
};

Dropdown.propTypes = {
  content: PropTypes.func,
  label: PropTypes.string,
  icon: PropTypes.func,
  handleUpdate: PropTypes.func,
};

export default Dropdown;
