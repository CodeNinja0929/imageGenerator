import { Link } from 'react-router-dom';
import { heroImages } from '@/constants';
import PropTypes from 'prop-types';

const HeroImagesDisplay = ({ heroImage }) => {
  return (
    <div className="w-[25%] pl-3 overflow-hidden relative">
      {heroImage.map((image, index) => (
        <img key={index} src={image.img} alt={image.alt} className="w-full mt-1.5 rounded-md " />
      ))}
    </div>
  );
};

HeroImagesDisplay.propTypes = {
  heroImage: PropTypes.array,
};

const Hero = () => {
  return (
    <section id="home" className="bg-secondary lg:max-h-[80vh] max-h-[150vh] hero-gradient overflow-hidden mb-6 ">
      <div className="max-w-[1440px] grid lg:gap-9 gap-3 p-6 lg:grid-cols-[700px_1fr] grid-cols-1 m-auto">
        <div className="lg:pt-16 pt-8">
          <h1 className="flex lg:flex-row flex-col justify-start items-start flex-wrap lg:text-[56px] text-[32px] font-semibold leading-[120%] m-0 p-0">
            {/* -tracking-[.2em] */}
            <div>
              Create amazing <span className="text-gradient">photos</span>
            </div>
            <div>
              with the power of <span className="text-gradient">AI</span>.
            </div>
          </h1>
          <h2 className="lg:text-[18px] text-[15px] leading-[160%] font-normal opacity-75 m-0 pt-8">
            Imaginea is a suite of magical AI tools. Generate original images at scale, modify photos, expand pictures beyond
            their original borders, or create custom AI models.
          </h2>
          <div className="pt-12 pb-6">
            <Link
              to="/"
              className="font-inter font-medium text-[18px] h-[60px] bg-[#6469ff] m-0 px-9 rounded-lg inline-flex items-center hover:bg-[#7373EA]"
            >
              Start creating for free
            </Link>

            <p className="block pt-2 text-[12px] text-dimWhite">100/mo images for free. No credit card required</p>
          </div>
        </div>

        <div className="flex justify-center items-center md:my-0 my-10 relative">
          {heroImages.map((heroImageGroup, idx) => (
            <HeroImagesDisplay key={idx} heroImage={heroImageGroup.data} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
