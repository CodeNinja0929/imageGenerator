const GetStarted = () => {
  return (
    <section className="pb-16">
      <div className="border border-[#303236] max-w-[1200px] rounded-3xl m-auto p-12 text-center getStarted-gradient">
        <h2 className="flex justify-center items-start flex-wrap text-[33px] text-semibold leading-[120%] m-0 p-0">
          Ready to get started?
        </h2>
        <p className="text-[15px] leading-[160%] opacity-75 text-normal m-auto max-w-[600px] pt-3">
          Explore our tools, or create an account.
        </p>
        <div className="flex flex-col pt-6 items-center">
          <button className="h-[46px] text-base bg-[#5858e6] border border-[#5858e6] shadow-sm py-[3px] px-[18px] rounded-md">
            Get started. It is Free.
          </button>
        </div>
      </div>
    </section>
  );
};

export default GetStarted;
