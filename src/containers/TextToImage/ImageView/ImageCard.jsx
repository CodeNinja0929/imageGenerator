import PropTypes from 'prop-types';

import { Delete, Download, Share, Star } from '@/assets';

const ImageCard = ({ img, onDelete, onDownload, onShare, setShowImage, setModalImage }) => {
  const clickImage = () => {
    setShowImage(true);
    setModalImage(img);
  };

  return (
    <div className="group tile relative flex justify-center">
      <img className="rounded-[5px]" src={img.src.url} onClick={clickImage} />
      <div className="w-full flex justify-end gap-[12px] top-[5px] absolute p-[10px]">
        <div className="relative flex-shrink-0">
          <button
            className="transition-all duration-500 ease-in-out group-hover:opacity-100 opacity-0 hover:bg-black inline-flex items-center justify-center bg-black bg-opacity-40 text-white font-semibold p-2 rounded-lg outline-none focus:outline-none select-none w-9 h-9"
            onClick={() => onDownload(img.id)}
          >
            <Download />
          </button>
        </div>
        <div className="relative flex-shrink-0">
          <button
            className="transition-all duration-500 ease-in-out group-hover:opacity-100 opacity-0 hover:bg-black inline-flex items-center justify-center bg-black bg-opacity-40 text-white font-semibold p-2 rounded-lg outline-none focus:outline-none select-none w-9 h-9"
            onClick={() => onShare(img.id)}
          >
            <Share />
          </button>
        </div>
      </div>

      <div className="w-full flex justify-between gap-[12px] bottom-[5px] absolute p-[10px]">
        {img.src.isPublished ? (
          <div className="flex relative flex-shrink-0 items-center">
            <div className="transition-all duration-500 ease-in-out group-hover:opacity-100 opacity-0 inline-flex items-center justify-center bg-black bg-opacity-40 text-white font-semibold p-2 rounded-lg outline-none focus:outline-none select-none w-16 h-9 gap-4">
              <button className="">
                <Star />
              </button>
              <p>{img.src.star}</p>
            </div>
          </div>
        ) : (
          <div style={{ width: '16rem' }}></div>
        )}

        <div className="relative flex-shrink-0">
          <button
            className="transition-all duration-500 ease-in-out group-hover:opacity-100 opacity-0 hover:bg-black inline-flex items-center justify-center bg-black bg-opacity-40 text-white font-semibold p-2 rounded-lg outline-none focus:outline-none select-none w-9 h-9"
            onClick={() => onDelete(img.id)}
          >
            <Delete />
          </button>
        </div>
      </div>
    </div>
  );
};

ImageCard.propTypes = {
  img: PropTypes.object,
  published: PropTypes.bool,
  onDelete: PropTypes.func,
  onDownload: PropTypes.func,
  onShare: PropTypes.func,
  setShowImage: PropTypes.func,
  setModalImage: PropTypes.func,
};

export default ImageCard;
