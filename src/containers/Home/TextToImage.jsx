const TextToImage = () => {
  return (
    <section className="grid md:grid-cols-2 grid-cols-1 m-auto p-6 md:pb-16 md:gap-[72px] gap-[24px] items-center">
      <div className="py-3">
        <h3 className="md:text-base text-[15px] font-semibold text-sky-400 mb-[3px]">Text to Image</h3>
        <h2 className="md:text-4xl text-3xl font-semibold m-0">Generate original images at scale.</h2>
        <p className="m-0 md:text-[17px] text-[16px] leading-[160%] pt-3 opacity-75">
          Unleash your imagination and create any type of image or art with text. Use your creativity to mix different art
          styles, or just describe what you want to see and watch the AI bring your ideas to life. Use one of 20+
          community-trained models to apply a unique style to your creations, or train custom model based on your own art.
        </p>
      </div>
      <div>
        <video src="https://storage.googleapis.com/imagineo-ai/assets/video/generate.mp4" autoPlay loop muted playsInline />
      </div>
    </section>
  );
};

export default TextToImage;
