import { stats } from '@/constants';

const Stats = () => {
  return (
    <section className="m-auto px-[24px] pb-16">
      <h2 className="lg:text-[24px] text-[21px] font-medium m-0 text-center py-6">
        A fully integrated suite of image-generation tools
      </h2>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="min-w-[200px] lg:p-[42px] p-6 stat-gradient rounded-2xl border border-[#303236]">
            <h2 className="lg:text-[24px] text-[18px] font-normal leading-[120%] mb-4">{stat.title}</h2>
            <p className="lg:text-[18px] text-[17px] font-normal leading-[160%] mt-4 opacity-75 p-0">{stat.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
