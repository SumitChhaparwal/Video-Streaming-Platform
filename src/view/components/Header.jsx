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
import { useParams, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const Header = () => {
  //default value = false..
  const menuChange = useSelector((store) => store.home.menuChange);

  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");

  //sign in/up state
  let signIn = false;

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
  const disablingMenuBtn = urlLocation.pathname == "/signup" ? true : false;

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
            <div className="sec-2 flex border border-[#ccc] h-8 w-[40%] justify-center items-center rounded-2xl">
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
            <div className="sec-3 flex gap-4 mx-3 lg:mx-6">
              <div className="create flex items-center justify-center gap-1 w-18 h-8 rounded-2xl bg-gray-200 cursor-pointer">
                <FiPlus /> <span className="font-medium text-xs">Create</span>
              </div>
              {signIn ? (
                <div className="account bg-orange-600 w-8 h-8 text-center rounded-2xl text-xl text-white cursor-pointer hover:opacity-90">
                  <Link to="/signup">
                    <div>s</div>
                  </Link>
                </div>
              ) : (
                <div className="account bg-gray-200 text-blue-500 h-8 px-2 text-center rounded-2xl text-sm font-medium cursor-pointer flex justify-center items-center gap-1 hover:bg-blue-100">
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
              <div className={`menu-icon text-xl text-gray-700 mr-6 max-sm:mr-3  ${disablingMenuBtn ? `cursor-not-allowed` : `cursor-pointer`}`}>
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
            <div className="sec-2 flex border border-[#ccc] h-8 w-[40%] justify-center items-center rounded-2xl">
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
            <div className="sec-3 flex gap-4">
              <div className="create flex items-center justify-center gap-1 w-18 h-8 rounded-2xl bg-gray-200 cursor-pointer hover:opacity-90">
                <FiPlus /> <span className="font-medium text-xs">Create</span>
              </div>
              {signIn ? (
                <div className="account bg-orange-600 w-8 h-8 text-center rounded-2xl text-xl text-white cursor-pointer hover:opacity-90">
                  <Link to="/signup">
                    {" "}
                    <div>s</div>
                  </Link>
                </div>
              ) : (
                <div className="account bg-gray-200 text-blue-500 h-8 px-2 text-center rounded-2xl text-sm font-medium cursor-pointer flex justify-center items-center gap-1 hover:bg-blue-100">
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
