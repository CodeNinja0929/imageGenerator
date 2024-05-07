const OutPainting = () => {
  return (
    <section className="grid md:grid-cols-2 grid-cols-1 m-auto p-6 md:pb-16 md:gap-[72px] gap-[24px] items-center">
      <div>
        <video
          src="https://storage.googleapis.com/imagineo-ai/assets/video/outpainting.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
      <div className="py-3">
        <h3 className="md:text-base text-[15px] font-semibold text-sky-400 mb-[3px]">AI Editor · Outpainting</h3>
        <h2 className="md:text-4xl text-3xl font-semibold m-0">Expand pictures beyond their borders.</h2>
        <p className="m-0 md:text-[17px] text-[16px] leading-[160%] pt-3 opacity-75">
          Make your artwork creation process faster thanks to AI. With our advanced Editor, you can generate missing parts of
          any photo or create stunning large art pieces on infinitely sized canvas. There literally are no limits here.
        </p>
      </div>
    </section>
  );
};

export default OutPainting;
