const ImageUpload = () => {
  return (
    <div>
      <div className="relative max-w-[180px]">
        <div
          role="presentation"
          tabIndex={0}
          className="w-full h-[120px] relative border border-borderGray rounded bg-primary overflow-hidden cursor-pointer"
        >
          <div className="w-full h-full flex items-center justify-center flex-col p-0 text-center leading-[160%]">
            <input
              type="file"
              accept="image/png, .png, image/jpeg, .jpeg, jpg"
              tabIndex="-1"
              className="hidden"
            />
            <p className="p-3 text-xs font-normal text-gray-500">
              Drag an image here, or click to select one.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-[-9px]">
        <div className="mt-[19px]">
          <label className="inline-flex items-center cursor-pointer ">
            <input
              type="checkbox"
              id="centerCrop"
              name="centerCrop"
              className="transition-all w-4 h-4"
            />
            <span className="text-[#d7d8db] ml-1 text-[12px] font-medium">
              Crop center to fit output resolution
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
