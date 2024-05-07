import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { navLinks } from '@/constants';
import { close, menu, Logout } from '@/assets';

import { useAuth } from '@/contexts/AuthProvider';
import useClickOutside from '@/hooks/useClickOutside';
import SignUp from '@/containers/SignUp';
import LogIn from '@/containers/LogIn';

const Navbar = () => {
  const [active, setActive] = useState('Home');
  const [toggle, setToggle] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const { login, isAuthenticated, user, logout, register, signIn } = useAuth();
  const [showProfile, setShowProfile] = useState(false);
  const [credit, setCredit] = useState(user.credit);

  const profileRef = useRef();
  const logInRef = useRef();
  const signUpRef = useRef();

  useClickOutside(profileRef, () => setShowProfile(false));
  useClickOutside(logInRef, () => setShowLogin(false));
  useClickOutside(signUpRef, () => setShowSignUp(false));

  useEffect(() => {
    if (isAuthenticated) {
      setShowSignUp(false);
      setShowLogin(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    setCredit(user.credit);
  }, [user.credit]);
  const handleLogout = () => {
    setShowProfile(!showProfile);
    logout();
  };
  return (
    <>
      <nav className="w-full flex justify-between items-center bg-primary lg:px-8 px-4 py-4 border-b border-borderGray fixed z-50 bg-opacity-80">
        <Link to="/">
          <div className="text-lg font-semibold text-white">Imaginea</div>
        </Link>

        <ul className="list-none md:flex hidden justify-end items-center flex-1">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`font-poppins font-normal cursor-pointer text-[16px] lg:mr-10 mr-3 ${
                active === nav.title ? 'text-white' : 'text-dimWhite'
              }`}
              onClick={() => setActive(nav.title)}
            >
              <Link to={nav.link}>{nav.title}</Link>
            </li>
          ))}
          <li
            className={`font-poppins font-medium cursor-pointer text-[16px] lg:mr-10 mr-3 bg-[#3d444e] py-3 px-6 rounded-md ${
              active === 'Log in' ? 'text-white' : 'text-dimWhite'
            } ${isAuthenticated && 'hidden'}`}
            onClick={() => setShowLogin(!showLogin)}
          >
            <div onClick={() => setToggle(!toggle)}>Log in</div>
          </li>
          <button
            onClick={() => setShowSignUp(true)}
            className={`font-semibold bg-blue-500 text-white px-4 py-2 rounded-md ${isAuthenticated && 'hidden'}`}
          >
            Create free account
          </button>
          {isAuthenticated && (
            <section className="relative mr-[-6px] hover:bg-[#292A2F]" onClick={() => setShowProfile(!showProfile)}>
              <div className="flex items-center text-right pl-[12px] rounded-[4px] cursor-pointer">
                <div>
                  <div className="text-[13px] text-[hsla(180,7%,97%,.8)] font-medium">{user.name}</div>
                  <div className="pt-px text-[12px] text-[hsla(180,7%,97%,.6)]">Credits: {credit}</div>
                </div>
                <div className="mt-auto ml-[12px] flex items-center p-[6px] rounded-[4px] text-[#5f6b7a] cursor-pointer ">
                  <img src={user.picture} className="w-9 h-9 rounded-md" />
                </div>
              </div>
            </section>
          )}
        </ul>
        {showProfile && (
          <div
            ref={profileRef}
            className="absolute w-[240px] right-[32px] top-[62px] [box-shadow:0_3px_12px_rgba(0,0,0,.09)] border-[1px] border-solid border-[#303236] bg-[#232426] p-[6px] rounded-[4px] z-10"
          >
            <ul className="[list-style:none] p-0 m-0 cursor-pointer">
              <li className="mb-[3px]" onClick={handleLogout}>
                <a className="text-[13px] px-[9px] py-[6px] text-[hsla(180,7%,97%,.6)] rounded-[3px] flex items-center">
                  <Logout addClass={'h-4 w-4 mr-[9px] text-[hsla(180,7%,97%,.4)]'} />
                  Log out
                </a>
              </li>
            </ul>
          </div>
        )}

        <div className="md:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-7 h-7 object-contain cursor-pointer"
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? 'hidden' : 'flex'
            } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
          >
            <ul className="list-none flex justify-end items-start flex-1 flex-col">
              {navLinks.map((nav, index) => (
                <li
                  key={index}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav.title ? 'text-white' : 'text-dimWhite'
                  } mb-4`}
                  onClick={() => setActive(nav.title)}
                >
                  <Link to={nav.link} onClick={() => setToggle(!toggle)}>
                    {nav.title}
                  </Link>
                </li>
              ))}
              <li
                className={`font-poppins font-medium cursor-pointer text-[16px] ${
                  active === 'Log in' ? 'text-white' : 'text-dimWhite'
                } mb-4`}
                onClick={() => setActive('Log in')}
              >
                <Link to="/" onClick={() => setToggle(!toggle)}>
                  Log in
                </Link>
              </li>

              <button
                onClick={() => setShowSignUp(true)}
                className="font-inter font-medium bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Create free account
              </button>
            </ul>
          </div>
        </div>
      </nav>

      {showSignUp && (
        <SignUp ref={signUpRef} handler={setShowSignUp} login={login} handlerLogin={setShowLogin} register={register} />
      )}
      {showLogin && (
        <LogIn ref={logInRef} handler={setShowLogin} login={login} handlerSignUp={setShowSignUp} signIn={signIn} />
      )}
    </>
  );
};

export default Navbar;
