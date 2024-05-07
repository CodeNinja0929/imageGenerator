import { footerLink } from '@/constants';
import { Discord, Instagram } from '@/assets';

const Footer = () => {
  return (
    <nav className="max-w-[1200px] grid grid-cols-5 m-auto py-16 ">
      <div className="layout_footer_logo">
        <div>
          <a href="/">Imaginea</a>
        </div>
        <div className="flex gap-3 items-center">
          <a className="opacity-60">
            <Discord />
          </a>
          <a className="opacity-60">
            <Instagram />
          </a>
        </div>
      </div>
      {footerLink.map((feature, index) => (
        <div key={index} className="px-3">
          <h6 className="m-0 text-[14px] font-semibold">{feature.title}</h6>
          <ul className="p-0 mt-[6px] mb-8">
            {feature.links.map((link, linkIndex) => (
              <li key={linkIndex} className="py-[6px]">
                <a href={link.link} className="text-[14px] opacity-50 font-normal">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
};

export default Footer;
