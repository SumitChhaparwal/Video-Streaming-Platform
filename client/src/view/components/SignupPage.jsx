import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaCheck } from "react-icons/fa6";
import { IoMdAlert } from "react-icons/io";

const SignupPage = () => {
  const [toggle, setToggle] = useState(false);
  const [popup, setPopup] = useState(false);
  //for signUp
  const [displayErr, setDisplayErr] = useState("");
  //for signIn
  const [popup_, setPopup_] = useState(false);
  const [displayE, setDisplayE] = useState("");
  const [emaill, setEmaill] = useState("");
  const [pass, setPass] = useState("");

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [passw, setPassw] = useState("");

  //Signup Func()
  async function checkSignUp(e) {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3200/api/signup", {
        username: name,
        email,
        password: passw,
      });
      if (!response) {
        console.log("Something went wrong!");
        return;
      }
      sessionStorage.setItem("ust", JSON.stringify(response.data));
      const t_Obj = JSON.parse(sessionStorage.getItem("ust"));
      if (!t_Obj.newToken) {
        alert("Retry this!");
        return;
      }
      setName("");
      setEmail("");
      setPassw("");
      setPopup(true);
      setTimeout(() => {
        setPopup(false);
      }, 3000);
      setToggle(false);
    } catch (error) {
      setDisplayErr(error?.response?.data.msg);
      setTimeout(() => {
        setDisplayErr("");
      }, 3000);
      console.error("Response error: ", error?.response?.data?.msg ?? error);
    }
  }

  //SignIn func()
  async function checkSignIn(e) {
    e.preventDefault();
    const userT = JSON.parse(sessionStorage.getItem("ust"));
    const userToken = userT ? userT.newToken : "dummyxyz";
    try {
      const data = {
        email: emaill,
        password: pass,
      };
      const res = await axios.post(
        "http://localhost:3200/api/auth/signin",
        data,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        },
      );
      if (!res) {
        console.log("Something went wrong!");
        return;
      }
      const resObj = res.data.data;
      //customizing obj data for security purpose
      const customObj = {
        channels: resObj.channels,
        email: resObj.email,
        username: resObj.username,
        id: resObj._id,
      };
      //storing customObj(userInfo) in sesssion storage..
      sessionStorage.setItem("uInfo", JSON.stringify(customObj));
      setEmaill("");
      setPass("");
      setPopup_(true);
      setTimeout(() => {
        setPopup_(false);
        navigate("/", { replace: true });
      }, 3000);
    } catch (error) {
      setDisplayE(error?.response?.data?.err ?? error?.response?.data?.msg);
      setTimeout(() => {
        setDisplayE("");
      }, 3000);
      console.error("Response error: ", error.response);
    }
  }

  return (
    <div className="w-90 mx-auto my-[20vh] shadow-xl px-10 py-6  rounded-2xl border border-[#ececec]">
      {popup && (
        <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-1000 before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)]">
          <div className="w-full max-w-md bg-white border border-slate-100 shadow-lg rounded-lg relative max-h-[95vh] overflow-y-auto outline-none p-10 md:p-6 dark:bg-neutral-800 dark:border-neutral-700">
            <div className="text-center">
              <div className="w-14 h-14 p-3 mb-4 mx-auto rounded-full bg-green-50 dark:bg-green-300/20 flex justify-center items-center">
                <FaCheck className="text-green-500 text-2xl" />
              </div>
              <div
                id="modal-title"
                className="text-slate-900 text-xl font-medium dark:text-slate-50"
              >
                Account Created Successfully
              </div>
              <p className="text-slate-600 text-md mt-2 leading-relaxed dark:text-slate-400">
                Your request has been successfully processed to create new
                account.
              </p>
            </div>
          </div>
        </div>
      )}
      {popup_ && (
        <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-1000 before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)]">
          <div className="w-full max-w-md bg-white border border-slate-100 shadow-lg rounded-lg relative max-h-[95vh] overflow-y-auto outline-none p-12 md:p-6 dark:bg-neutral-800 dark:border-neutral-700">
            <div className="text-center">
              <div className="w-14 h-14 p-3 mb-4 mx-auto rounded-full bg-green-50 dark:bg-green-300/20 flex justify-center items-center">
                <FaCheck className="text-green-500 text-2xl" />
              </div>
              <div
                id="modal-title"
                className="text-slate-900 text-xl font-medium dark:text-slate-50"
              >
                Sign In Successfully...
              </div>
            </div>
          </div>
        </div>
      )}

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
                  value={name}
                  minLength={4}
                  maxLength={50}
                  onChange={(e) => setName(e.target.value)}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  minLength={4}
                  maxLength={50}
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
                  value={passw}
                  onChange={(e) => setPassw(e.target.value)}
                  id="passw"
                  name="user_pas"
                  min={5}
                  required
                />
              </label>
            </div>
            {displayErr && (
              <div className="row w-full mt-1.5">
                <div className="border border-[#f15f5f] w-full py-1 text-sm rounded-md px-2 mt-1 flex items-center gap-1.5">
                  <IoMdAlert className="text-red-600" />{" "}
                  <span>{displayErr}</span>
                </div>
              </div>
            )}

            <button
              className="btn w-full mt-2.5 py-1.5 rounded-md text-white bg-blue-600 mb-1 hover:bg-blue-700 transition-colors cursor-pointer"
              type="submit"
            >
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
                  value={emaill}
                  onChange={(e) => setEmaill(e.target.value)}
                  minLength={4}
                  maxLength={50}
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
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  min={7}
                  required
                />
              </label>
            </div>
            {displayE && (
              <div className="row w-full mt-1.5">
                <div className="border border-[#f15f5f] w-full py-1 text-sm rounded-md px-2 mt-1 flex items-center gap-1.5">
                  <IoMdAlert className="text-red-600" /> <span>{displayE}</span>
                </div>
              </div>
            )}
            <button
              className="btn w-full mt-2.5 py-1.5 rounded-md text-white bg-blue-600 mb-1 hover:bg-blue-700 transition-colors cursor-pointer"
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
