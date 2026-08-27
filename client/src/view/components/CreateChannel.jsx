import { useState } from "react";
import { FaUser } from "react-icons/fa6";
import { FaCircleCheck } from "react-icons/fa6";
import { RiErrorWarningFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";

const CreateChannel = () => {
  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");
  const navigate = useNavigate();

  //input validation
  function checkHandlerFun() {
    const pattern = new RegExp("^[a-zA-Z0-9]+([-_][a-zA-Z0-9]+)*$");
    if (name.trim() === handle.trim()) {
      return false;
    } else if (pattern.test(handle)) {
      return true;
    } else {
      return false;
    }
  }

  //validating form
  function validate(event){
    if(!name || !handle){
      return;
    }
     event.preventDefault();
    if(checkHandlerFun()){
      setHandle("");
      setName("");
      navigate("/channel");
    } else{
      console.log("Invalid submission..");
    }
  }

  return (
    <>
      <div className="mt-16 min-h-[95vh] antialiased font-sans p-4 flex flex-col justify-center items-center bg-[#f9f9f9]">
        <form className="contain w-full max-w-lg bg-white border border-gray-200 shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-6 sm:p-10 rounded-3xl">
          <div className="title text-2xl font-medium tracking-tight">
            How you'll appear
          </div>
          <div className="cap text-sm text-gray-500 leading-relaxed mt-3">
            Your profile picture, name, and handle will be visible on YouTube.
            You can change them at anytime
          </div>
          <div className="profile flex justify-center items-center mt-5">
            <div className="border border-gray-200 rounded-[100%] bg-gray-50 h-21 w-21 flex flex-col justify-center items-center cursor-pointer">
              <FaUser className="text-gray-400 text-4xl" />
            </div>
          </div>
          <div className="input-sec flex flex-col gap-6 mt-6.5">
            <div className="sec-1 relative">
              <input
                type="text"
                id="channel-name"
                placeholder=" "
                className="peer block w-full rounded-xl border border-gray-300 bg-white px-4 pt-5.5 pb-1.5 text-md text-gray-900 placeholder-transparent transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                maxLength={50}
              />
              <label
                htmlFor="channel-name"
                className="absolute top-4 left-4 z-10 origin-left -translate-y-2.75 scale-[0.82] transform text-[15px] text-gray-500 duration-150 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-2.75 peer-focus:scale-[0.82] peer-focus:text-blue-500"
              >
                Name
              </label>
              <div className="absolute top-4.5 right-4 text-[11px] font-medium tracking-wider text-gray-400">
                {name.length}/50
              </div>
            </div>
            <div className="sec-2 relative">
              <input
                type="text"
                id="handle-name"
                placeholder=" "
                value={handle}
                pattern="^[a-zA-Z0-9]+([-_][a-zA-Z0-9]+)*$"
                onChange={(e) => setHandle(e.target.value)}
                className={`peer block w-full rounded-xl border border-gray-300 bg-white px-4 pt-5.5 pb-1.5 text-md text-gray-900 placeholder-transparent transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none`}
                required
                maxLength={30}
              />
              <label
                htmlFor="handle-name"
                className={`absolute top-4 left-4 z-10 origin-left -translate-y-2.75 scale-[0.82] transform text-[15px] text-gray-500 duration-150 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-2.75 peer-focus:scale-[0.82] peer-focus:text-blue-500 `}
              >
                Handle
              </label>
              {handle.trim() !== "" &&
                (checkHandlerFun() ? (
                  <div className="absolute top-4.5 right-4 text-[14px] font-medium tracking-wider text-green-600">
                    <FaCircleCheck />
                  </div>
                ) : (
                  <div className="absolute top-4.5 right-4 text-[16px] font-medium tracking-wider text-red-500">
                    <RiErrorWarningFill />
                  </div>
                ))}
            </div>
          </div>
          <div className="term text-xs text-gray-500 mt-6.5 border-b border-gray-100 pb-5">
            By clicking Create Channel, you agree to YouTube's{" "}
            <span className="text-blue-500 font-medium hover:text-blue-600 transition-all cursor-pointer">
              Terms of Service
            </span>
            . Changes made to your name and profile picture are visible only on
            YouTube and not other services.{" "}
            <span className="text-blue-500 font-medium hover:text-blue-600 transition-all cursor-pointer">
              Learn more
            </span>
          </div>
          <div className="btn-sec flex justify-end gap-3 mt-6.5 mb-2">
            <div className="cancel font-medium text-[14px] px-3.5 py-1.5 rounded-2xl hover:bg-gray-100 tracking-wide cursor-pointer">
              <Link to="/">
               Cancel
              </Link>
            </div>
            <div className="create-btn">
              <button
                className={`bg-blue-600 text-white px-3.5 py-1.5 rounded-2xl hover:bg-blue-700 cursor-pointer font-medium text-[14px] tracking-wide transition-all`}
                type="submit"
                onClick={validate}
              >
                Create Channel
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default CreateChannel;
