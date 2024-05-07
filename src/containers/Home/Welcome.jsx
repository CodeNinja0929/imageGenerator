const Welcome = () => {
  return (
    <div className="mx-[auto] my-[0] pt-0 pb-0">
      <div className="bg-[url('assets/background/background.png')] px-[0] py-[80px] w-[100.6vw] overflow-hidden bg-cover relative left-2/4 transform -translate-x-1/2 flex items-center">
        <div className="content-[''] absolute top-[0] left-[0] bottom-[0] right-[0] bg-[linear-gradient(_180deg,_rgba(0,_0,_0,_0.2)_0%,_rgba(0,_0,_0,_0.7)_60%_)]"></div>
        <div className="w-[94%] [901px] ml-auto mr-auto relative text-center [text-shadow:0_0_5px_rgba(0,_0,_0,_0.8),_0_0_15px_rgba(0,_0,_0,_0.8),_0_0_40px_rgba(0,_0,_0,_0.8)]">
          <h1 className="text-center text-[50px] leading-[1.2] text-[#fff]">
            <span className="inline-block bg-[#252b30] text-[#fff] text-base uppercase px-[10px] py-[2px] [text-shadow:-1px_-1px_0_rgba(0,_0,_0,_0.5)] rounded-[3px]">
              AI Art Generator
            </span>
            <br />
            Create Stunning AI Art
          </h1>
          <p className="text-[#fff] text-[21px] font-medium max mt-[10px] mx-[auto] mb-[16px] max-w-[700px]">
            Create amazing artworks in seconds using the power of Artificial Intelligence, participate in AI Art Challenges,
            chat with AI Art enthusiasts, and more. Try an art generator now!
          </p>
          <div className="max-w-[440px] mx-[auto] my-[0] p-[18px] rounded-[8px]">
            <div className="text-[#fff] text-left relative">
              <div className="grid grid-cols-[repeat(12,_1fr)] gap-[16px]">
                <div className="col-end-[span_12] order-none">
                  <div className="flex flex-wrap">
                    <div className="flex-grow mb-[5px] font-bold text-[15px] text-[#dee2e3]">
                      <label htmlFor="textinput">Describe what you want to see</label>
                    </div>
                    <div className="flex-[0_0_auto] self-end mb-[5px] text-sm">
                      <button className="relative inline-block text-center cursor-pointer [transition:all_0.3s_ease] text-sm !bg-transparent text-[#dee2e3] p-0 !border-none normal-case !underline">
                        <span className="flex items-center justify-center w-full">Random</span>
                      </button>
                    </div>
                    <div className="max-h-[60px] min-h-[40px] w-full">
                      <textarea
                        rows={1}
                        id="textinput"
                        placeholder="prompt"
                        className="block appearance-none w-full px-[18px] py-[10px] leading-[1.2] text-base [41px] h-[60px] max-h-[600px] resize-none border-[1px] border-solid border-[rgba(255,255,255,0.8)] bg-[rgba(255,_255,_255,_0.05)] rounded-[4px] text-[rgb(255,_255,_255)]"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="col-end-[span_12] order-none">
                  <div className="text-white text-left">
                    <div className="flex flex-wrap">
                      <div className="flex-grow mb-[5px] font-bold text-[15px] text-[#dee2e3]">
                        <div>Choose a model</div>
                      </div>
                      <div className="flex-[0_0_100%] max-w-full">
                        <div className="bg-[url('')]"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-end-[span_12] order-none">
                  <div className="w-full">
                    <button className="relative block text-center !no-underline border-[1px] border-solid border-[#e64d6a] cursor-pointer font-bold uppercase tracking-[0.02em] [transition:all_0.3s_ease] px-[2em] py-[1em] w-full pl-[0.66em] pr-[0.66em] bg-[#e64d6a] text-[#fff] [box-shadow:0_0_20px_rgba(255,255,255,0.3)] text-base">
                      <span className="flex items-center justify-center w-full">Create</span>
                    </button>
                    <div className="font-medium block text-[13px] mt-[5px] mx-[0] mb-[0] text-center text-[#bcc1c3]">
                      <p>No payment or credit card required</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
