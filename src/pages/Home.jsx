import {
  Welcome,
  DreamBooth,
  Footer,
  GetStarted,
  Hero,
  InPainting,
  OutPainting,
  QA,
  Stats,
  TextToImage,
  TopRated,
} from '@/containers/Home';

const Home = () => {
  return (
    <>
      <main className="bg-primary text-[#f7f8f8] font-inter">
        <div className="bg-primary w-full overflow-hidden text-white">
          <Welcome />
          <TopRated />
          <Hero />
          <div className="bg-primary sm:px-16 px-6 flex justify-center items-center">
            <div className="xl:max-w-[1440px] w-full">
              <Stats />
              <TextToImage />
              <OutPainting />
              <InPainting />
              <DreamBooth />
              <QA />
              <GetStarted />
            </div>
          </div>
        </div>
      </main>
      <footer className="block bg-generatorParam text-[#f7f8f8]">
        <Footer />
      </footer>
    </>
  );
};

export default Home;
