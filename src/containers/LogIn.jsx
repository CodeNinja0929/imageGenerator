import { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';

import { Google, Log } from '@/assets';
import { LineInput } from '$common';

// eslint-disable-next-line react/display-name
const LogIn = forwardRef(({ handler, login, handlerSignUp, signIn }, ref) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const clickSignUp = () => {
    handler(false);
    handlerSignUp(true);
  };

  const clickLogin = () => {
    signIn({
      email,
      password,
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 ">
      <div className="bg-[#1f2023] bg-opacity-50 w-full h-full absolute backdrop-blur"></div>
      <div
        ref={ref}
        className="bg-[#1f2023] text-white rounded-lg w-[418px] mx-3 md:mx-0 overflow-hidden relative z-10 py-3 px-[18px]"
      >
        <div className="py-[6px] px-3">
          <button onClick={() => handler(false)} className="absolute top-2 right-5 text-white text-2xl opacity-60">
            &times;
          </button>

          <h2 className="text-[26px] font-semibold m-0">Log in to account</h2>
          <p className="leading-[160%] !text-[14px] font-normal mt-[2px] mx-[0] mb-[9px] !text-[hsla(180,7%,97%,.76)]">
            Don't have an account?{' '}
            <span className="underline cursor-pointer" onClick={clickSignUp}>
              Create it now
            </span>
          </p>
          <button className="flex bg-blue-700 items-center rounded-md mt-10" onClick={login}>
            <div className="flex bg-white h-9 w-9 m-[2px]">
              <Google addClass="h-5 w-5 m-auto p-auto" />
            </div>
            <span className="my-auto mx-7">Continue with Google</span>
          </button>
          <div className="py-6 relative">
            <div className="w-full h-px bg-[#3c3f44]">
              <div className="text-[12px] font-medium flex items-center justify-center text-center text-[hsla(180,7%,97%,.6)] w-full absolute -mt-[8px]">
                <span className="bg-primary px-[9px]">or use email</span>
              </div>
            </div>
          </div>
          <div className="mb-10">
            <LineInput
              id="email"
              label="Email address"
              addClass="opacity-50"
              placeholder="Enter your email address..."
              handle={(e) => setEmail(e.value)}
              required
            />
            <LineInput
              id="password"
              label="Password"
              addClass="opacity-50"
              placeholder="Enter your password..."
              isPassword
              handle={(e) => setPassword(e.value)}
              required
            />
          </div>
          <div className="flex relative my-5">
            <button
              className="w-full h-[46px] text-[16px] leading-[16px] !font-semibold border-[1px] border-solid bg-[#5858e6] border-[#5858e6] [box-shadow:0_1px_2px_rgba(0,0,0,.07)] inline-flex items-center justify-center relative rounded-[4px] cursor-pointer [transition:.24s_ease-in-out] outline-[none] px-[18px] py-[3px] no-underline text-[#fff] overflow-hidden hover:opacity-70"
              onClick={clickLogin}
            >
              <Log addClass={'mr-2'} />
              Log in
            </button>
          </div>
          {/* <div className="flex justify-center flex-col text-[12px] gap-[9px] text-[hsla(180,7%,97%,.7)]">
            <Link to="forgot-password" className="hover:underline">
              Forgot your password?
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
});

LogIn.propTypes = {
  handler: PropTypes.func,
  login: PropTypes.func,
  handlerSignUp: PropTypes.func,
  signIn: PropTypes.func,
};

export default LogIn;
