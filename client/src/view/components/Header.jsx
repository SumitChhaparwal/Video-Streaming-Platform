import { useState } from "react";
import { CgMenu } from "react-icons/cg";
import { FiSearch } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";
import { SiYoutubetv } from "react-icons/si";
import { useSelector } from "react-redux";
import { menuToggle } from "../utilities/homeSlice";
import { useDispatch } from "react-redux";
import { searchFun } from "../utilities/homeSlice";
import { vidData } from "../utilities/vidData";
import { MdOutlineAccountCircle } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { SiYoutubestudio } from "react-icons/si";
import { TbWorld } from "react-icons/tb";
import { PiSignOutBold } from "react-icons/pi";
import { IoMdClose } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";

const Header = () => {
  const [profileToggle, setProfileToggle] = useState(false);
  const userAccount = JSON.parse(sessionStorage.getItem("uInfo"));
  const userName = userAccount?.username ?? "";
  const userInitial = userName ? userName.slice(0, 1) : "";
  const signin = Boolean(userAccount && userAccount.username) ? true : false;
  console.log("userAc------+ ", userAccount);

  //default value = false..
  const menuChange = useSelector((store) => store.home.menuChange);

  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");

  function disUpdate() {
    dispatch(
      searchFun({
        sTerm: searchTerm,
        arr: vidData,
      }),
    );
  }

  //To accessing url location/path obj
  let urlLocation = useLocation();
  const changeB = urlLocation.pathname == "/" ? false : true;

  //In /signup page, menu is stopped..
  const disablingMenuBtn =
    urlLocation.pathname == "/signup"
      ? true
      : urlLocation.pathname == "/createchannel"
        ? true
        : false;

  function profileToggleFunc() {
    setProfileToggle(!profileToggle);
  }

  function signout() {
    sessionStorage.removeItem("uInfo");
    window.location.reload();
  }

  const accessData = sessionStorage.getItem("currentCh");
  const channelObj = accessData ? JSON.parse(accessData) : "";

  return (
    <>
      <header>
        {menuChange ? (
          <nav
            className={`top-0 left-0 fixed flex flex-row justify-between items-center bg-[#fffefef6] h-16 w-full z-50 ${changeB ? `border-b border-gray-200` : ``}`}
          >
            <div className="sec-1 flex items-center mx-3 lg:mx-6">
              <div
                className={`menu-icon text-xl text-gray-700 mr-6 max-sm:mr-3 ${disablingMenuBtn ? `cursor-not-allowed` : `cursor-pointer`}`}
              >
                <CgMenu
                  className={`icon hover:bg-zinc-100 ${disablingMenuBtn ? `pointer-events-none cursor-not-allowed` : ``}`}
                  onClick={disablingMenuBtn ? `` : () => dispatch(menuToggle())}
                />
              </div>
              <Link to="/" className="logo w-30">
                <img
                  src="/src/view/assets/youtubelogo.png"
                  alt="logo"
                  width="150"
                />
              </Link>
            </div>
            <div className="sec-2 flex border border-[#ccc] h-8 w-[40%] justify-center items-center rounded-2xl max-md:w-[30%] max-md:ml-2">
              <input
                type="text"
                placeholder="Search"
                className="border-r border-gray-200 bg-white rounded-tl-2xl rounded-bl-2xl h-full w-[80%] px-3.5"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div
                className="search-icon text-xl mx-auto bg-gray-50 h-full w-[19.9%] flex justify-center items-center rounded-tr-2xl rounded-br-2xl cursor-pointer text-gray-700"
                onClick={disUpdate}
              >
                <FiSearch />
              </div>
            </div>
            <div className="sec-3 flex gap-4 mx-3 lg:mx-6 max-md:gap-2">
              <div className="create flex items-center justify-center gap-1 w-18 h-8 rounded-2xl bg-gray-200 cursor-pointer">
                <Link
                  to={signin ? `/createchannel` : `/signup`}
                  className="contents"
                >
                  <FiPlus /> <span className="font-medium text-xs">Create</span>
                </Link>
              </div>
              {signin ? (
                <>
                  {/*
               className="account bg-violet-600 w-8 h-8 flex justify-center items-center rounded-2xl text-md text-white cursor-pointer hover:opacity-90 uppercase"
                    onClick={profileToggleFunc}
               */}
                  <div
                    className="account bg-violet-600 w-8 h-8 flex justify-center items-center rounded-2xl text-md text-white cursor-pointer hover:opacity-90 uppercase"
                    onClick={profileToggleFunc}
                  >
                    {userInitial || "G"}
                  </div>
                  {profileToggle && (
                    <div className="fixed inset-0 p-4 w-full h-full z-1000">
                      <div className="absolute right-2 top-18 w-full max-sm:w-60 max-w-xs bg-white border-2 border-gray-100 shadow-lg rounded-lg max-h-[95vh] overflow-y-auto outline-none px-3 pt-3 md:p-6 dark:bg-neutral-800 dark:border-neutral-70">
                        <span
                          className="absolute right-2 top-2 bg-gray-100 hover:bg-gray-200 rounded-sm cursor-pointer"
                          onClick={profileToggleFunc}
                        >
                          <IoMdClose />
                        </span>
                        <div className="r-1 flex flex-col items-center w-full py-5 bg-violet-50 rounded-lg mb-4 mt-4.5">
                          <div className="w-14 h-14 p-3 mb-2 mx-auto rounded-full dark:bg-green-300/20 flex justify-center items-center text-2xl uppercase bg-violet-600 text-white">
                            {userInitial || "G"}
                          </div>
                          <div className="title flex flex-col items-center">
                            <div className="text-slate-900 text-md font-medium dark:text-slate-50 capitalize">
                              {userName || "Guest"}
                            </div>
                            <div className="mt-0.5 tracking-tight text-sm">
                              {userAccount?.email ?? "No email"}
                            </div>
                          </div>
                        </div>
                        <div className="r-2 max-md:mb-3.5 flex flex-col gap-2 text-sm w-full">
                          <div className="row flex items-center gap-2 cursor-pointer w-full pl-3 py-1 hover:bg-gray-100 transition-colors rounded-md">
                            <Link className="contents" to="/signup">
                              <MdAccountCircle className="text-gray-700 text-[16px]" />
                              <span>Create new account</span>
                            </Link>
                          </div>
                          {channelObj && (
                            <div className="row flex items-center gap-2 cursor-pointer pl-3 py-1 hover:bg-gray-100 transition-colors rounded-md">
                              <Link className="contents" to="/channel">
                                <SiYoutubestudio className="text-gray-700" />
                                <span>View your channel</span>
                              </Link>
                            </div>
                          )}
                          <div className="row flex items-center gap-2 cursor-pointer pl-3 py-1 hover:bg-gray-100 transition-colors rounded-md">
                            <TbWorld className="text-gray-700" />{" "}
                            <span>Location: India</span>
                          </div>
                          <div
                            className="row flex items-center gap-2 hover:text-red-400 cursor-pointer pl-3 py-1 hover:bg-gray-100 transition-colors rounded-md"
                            onClick={signout}
                          >
                            <PiSignOutBold className="text-gray-700" />{" "}
                            <span>Sign out</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="account bg-gray-200 text-blue-500 h-8 px-2 max-md:px-1 text-center rounded-2xl text-sm max-md:text-xs font-medium cursor-pointer flex justify-center items-center gap-1 max-md:gap-0.5 hover:bg-blue-100">
                  <div className="text-lg">
                    <MdOutlineAccountCircle />
                  </div>
                  <Link to="/signup">
                    <div> Sign In</div>
                  </Link>
                </div>
              )}
            </div>
          </nav>
        ) : (
          <nav
            className={`top-0 left-0 fixed flex flex-row justify-between items-center bg-[#fffefef6] h-17 w-full lg:px-[2.4%] max-lg:px-[4%] md:px-[4%] sm:px-[3%] max-sm:px-[3%] z-50 ${changeB ? `border-b border-gray-200` : ``}`}
          >
            <div className="sec-1 flex items-center">
              <div
                className={`menu-icon text-xl text-gray-700 mr-6 max-sm:mr-3  ${disablingMenuBtn ? `cursor-not-allowed` : `cursor-pointer`}`}
              >
                <CgMenu
                  className="icon hover:bg-zinc-100"
                  onClick={disablingMenuBtn ? `` : () => dispatch(menuToggle())}
                />
              </div>
              <Link to="/" className="logo w-30">
                <img
                  src="/src/view/assets/youtubelogo.png"
                  alt="logo"
                  width="150"
                />
              </Link>
            </div>
            <div className="sec-2 flex border border-[#ccc] h-8 w-[40%] justify-center items-center rounded-2xl max-md:w-[30%]">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-r border-gray-200 bg-white rounded-tl-2xl rounded-bl-2xl h-full w-[80%] px-3.5"
              />
              <div
                className="search-icon text-xl mx-auto bg-gray-50 h-full w-[19.9%] flex justify-center items-center rounded-tr-2xl rounded-br-2xl cursor-pointer text-gray-700"
                onClick={disUpdate}
              >
                <FiSearch />
              </div>
            </div>
            <div className="sec-3 flex gap-4 max-md:mx-2 max-md:gap-2">
              <div className="create flex items-center justify-center gap-1 max-md:gap-1 w-18 h-8 rounded-2xl bg-gray-200 cursor-pointer hover:opacity-90">
                <Link
                  to={signin ? `/createchannel` : `/signup`}
                  className="contents"
                >
                  <FiPlus /> <span className="font-medium text-xs">Create</span>
                </Link>
              </div>
              {signin ? (
                <>
                  <div
                    className="account bg-violet-600 w-8 h-8 flex justify-center items-center rounded-2xl text-md text-white cursor-pointer hover:opacity-90 uppercase"
                    onClick={profileToggleFunc}
                  >
                    {userInitial || "G"}
                  </div>
                  {profileToggle && (
                    <div className="fixed inset-0 p-4 w-full h-full z-1000">
                      <div className="absolute right-2 top-18 w-full max-sm:w-60 max-w-xs bg-white border-2 border-gray-100 shadow-lg rounded-lg max-h-[95vh] overflow-y-auto outline-none px-3 pt-3 md:p-6 dark:bg-neutral-800 dark:border-neutral-70">
                        <span
                          className="absolute right-2 top-2 bg-gray-100 hover:bg-gray-200 rounded-sm cursor-pointer"
                          onClick={profileToggleFunc}
                        >
                          <IoMdClose />
                        </span>
                        <div className="r-1 flex flex-col items-center w-full py-5 bg-violet-50 rounded-lg mb-4 mt-4.5">
                          <div className="w-14 h-14 p-3 mb-2 mx-auto rounded-full dark:bg-green-300/20 flex justify-center items-center text-2xl uppercase bg-violet-600 text-white">
                            {userInitial || "G"}
                          </div>
                          <div className="title flex flex-col items-center">
                            <div className="text-slate-900 text-md font-medium dark:text-slate-50 capitalize">
                              {userName || "Guest"}
                            </div>
                            <div className="mt-0.5 tracking-tight text-sm">
                              {userAccount?.email ?? "No email"}
                            </div>
                          </div>
                        </div>
                        <div className="r-2 max-md:mb-3.5 flex flex-col gap-2 text-sm w-full">
                          <div className="row flex items-center gap-2 cursor-pointer w-full pl-3 py-1 hover:bg-gray-100 transition-colors rounded-md">
                            <Link className="contents" to="/signup">
                              <MdAccountCircle className="text-gray-700 text-[16px]" />
                              <span>Create new account</span>
                            </Link>
                          </div>
                          {channelObj && (
                            <div className="row flex items-center gap-2 cursor-pointer pl-3 py-1 hover:bg-gray-100 transition-colors rounded-md">
                              <Link className="contents" to="/channel">
                                <SiYoutubestudio className="text-gray-700" />
                                <span>View your channel</span>
                              </Link>
                            </div>
                          )}
                          <div className="row flex items-center gap-2 cursor-pointer pl-3 py-1 hover:bg-gray-100 transition-colors rounded-md">
                            <TbWorld className="text-gray-700" />{" "}
                            <span>Location: India</span>
                          </div>
                          <div
                            className="row flex items-center gap-2 hover:text-red-400 cursor-pointer pl-3 py-1 hover:bg-gray-100 transition-colors rounded-md"
                            onClick={signout}
                          >
                            <PiSignOutBold className="text-gray-700" />{" "}
                            <span>Sign out</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="account bg-gray-200 text-blue-500 h-8 px-2 text-center rounded-2xl text-sm max-md:text-xs max-md:px-1 font-medium cursor-pointer flex justify-center items-center gap-1 max-md:gap-0.5 hover:bg-blue-100">
                  <div className="text-lg">
                    <MdOutlineAccountCircle />
                  </div>
                  <div>
                    <Link to="/signup">Sign In</Link>
                  </div>
                </div>
              )}
            </div>
          </nav>
        )}
      </header>
    </>
  );
};

export default Header;
