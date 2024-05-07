const DreamBooth = () => {
  return (
    <section className="grid md:grid-cols-2 grid-cols-1 m-auto p-6 md:pb-16 md:gap-[72px] gap-[24px] items-center">
      <div>
        <video
          src="https://storage.googleapis.com/imagineo-ai/assets/video/dreambooth.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
      <div className="py-3">
        <h3 className="md:text-base text-[15px] font-semibold text-sky-400 mb-[3px]">DreamBooth</h3>
        <h2 className="md:text-4xl text-3xl font-semibold m-0">Create your custom AI model.</h2>
        <p className="m-0 md:text-[17px] text-[16px] leading-[160%] pt-3 opacity-75">
          Get a personalized AI model. It is as easy as uploading 10 pictures. Whether you want to create AI avatars for
          yourself or your team, need to render beautiful images of your product in different scenarios, or just want to have
          your own AI model to generate ideas with your style. We have got you covered. Every model is hosted on getimg.ai
          and available to use in seconds.
        </p>
      </div>
    </section>
  );
};

export default DreamBooth;
