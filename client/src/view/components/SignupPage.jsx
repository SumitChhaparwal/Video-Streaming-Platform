import { useState } from "react";
import { useNavigate } from "react-router-dom";


const SignupPage = () => {
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();

  function checkSignIn(e) {
    e.preventDefault();
    //after user authentication
    //........
    //...
    navigate("/createchannel", {replace: true});
  }

  function checkSignUp(e) {
    e.preventDefault();
    //after user authentication
    //........
    //...
    navigate("/", {replace: true});
  }

  return (
    <div className="w-90 mx-auto my-[20vh] shadow-xl px-10 py-6  rounded-2xl border border-[#ececec]">
      <div className="title text-center text-xl font-semibold">
        {toggle ? "Sign up" : "Sign in"}
      </div>
      <div className="form-contain flex flex-col items-center gap-3">
        {toggle ? (
          <form className="contents" onSubmit={checkSignUp}>
            <div className="row w-full">
              <label htmlFor="name">
                Username <br />
                <input
                  type="text"
                  placeholder="Enter name"
                  className="border border-[#ccc] w-full py-1.5 rounded-md px-2 mt-1"
                  id="name"
                  name="username"
                  required
                />
              </label>
            </div>
            <div className="row w-full">
              <label htmlFor="email">
                Email <br />
                <input
                  type="email"
                  placeholder="Enter email id"
                  className="border border-[#ccc] w-full py-1.5 rounded-md px-2 mt-1"
                  id="email"
                  name="user_email"
                  required
                />
              </label>
            </div>
            <div className="row w-full">
              <label htmlFor="passw">
                Password <br />
                <input
                  type="password"
                  placeholder="Enter password"
                  className="border border-[#ccc] w-full py-1.5 rounded-md px-2 mt-1"
                  id="passw"
                  name="user_pas"
                  required
                />
              </label>
            </div>
            <button className="btn w-full mt-2.5 py-1.5 rounded-md text-white bg-blue-600 mb-1 hover:bg-blue-700 transition-all cursor-pointer" type="submit">
              Sign Up
            </button>
            <div className="text-sm text-gray-400">
              {" "}
              Already have an account?{" "}
              <span
                className="text-blue-600 font-medium hover:border-b transition-all cursor-pointer"
                onClick={() => setToggle(!toggle)}
              >
                Sign In
              </span>
            </div>
          </form>
        ) : (
          <form onSubmit={checkSignIn} className="contents">
            <div className="row w-full my-1">
              <label htmlFor="email">
                Email Id
                <br />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="border border-[#ccc] w-full py-1.5 rounded-md px-2 mt-1"
                  id="email"
                  name="user_email"
                  required
                />
              </label>
            </div>
            <div className="row w-full">
              <label htmlFor="passw">
                Password <br />
                <input
                  type="password"
                  placeholder="Enter password"
                  className="border border-[#ccc] w-full py-1.5 rounded-md px-2 mt-1"
                  id="passw"
                  name="user_pas"
                  required
                />
              </label>
            </div>
            <button
              className="btn w-full mt-2.5 py-1.5 rounded-md text-white bg-blue-600 mb-1 hover:bg-blue-700 transition-all cursor-pointer"
              type="submit"
            >
              Sign In
            </button>
            <div className="text-sm text-gray-400 mb-1">
              {" "}
              You don't have an account?{" "}
              <span
                className="text-blue-500 font-medium hover:border-b cursor-pointer"
                onClick={() => setToggle(!toggle)}
              >
                Create account
              </span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
export default SignupPage;
