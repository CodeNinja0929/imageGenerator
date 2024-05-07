const InPainting = () => {
  return (
    <section className="grid md:grid-cols-2 grid-cols-1 m-auto p-6 md:pb-16 md:gap-[72px] gap-[24px] items-center">
      <div className="py-3">
        <h3 className="md:text-base text-[15px] font-semibold text-sky-400 mb-[3px]">AI Editor · Inpainting</h3>
        <h2 className="md:text-4xl text-3xl font-semibold m-0">Edit images with only text</h2>
        <p className="m-0 md:text-[17px] text-[16px] leading-[160%] pt-3 opacity-75">
          Easily modify small details or change whole visual features on any picture. Use AI inpainting to remove unwanted
          objects from images, or alter any other elements. Just erase part of the image and tell AI what to render in empty
          space.
        </p>
      </div>
      <div>
        <video src="https://storage.googleapis.com/imagineo-ai/assets/video/generate.mp4" autoPlay loop muted playsInline />
      </div>
    </section>
  );
};

export default InPainting;
