import { TiHome } from "react-icons/ti";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineAccountBox } from "react-icons/md";
import { MdOutlineHistory } from "react-icons/md";
import { MdOutlinePlaylistAddCheck } from "react-icons/md";
import { MdOutlineWatchLater } from "react-icons/md";
import { AiOutlineLike } from "react-icons/ai";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { RiDownloadLine } from "react-icons/ri";
import { MdSubscriptions } from "react-icons/md";
import { MdAccountCircle } from "react-icons/md";
import { useSelector } from "react-redux";
import { matchPath, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const Sidebar = () => {
  //default value is false..
  const menuChange = useSelector((store) => store.home.menuChange);
  const urlLocation = useLocation();

  const custFirstSidebar =
    matchPath({ path: "/videoplayer/:id" }, urlLocation.pathname) !== null;

  const disablingSecSidebar =
    urlLocation.pathname == "/channel"
      ? true
      : custFirstSidebar
        ? true
        : false;

  return (
    <>
      {menuChange ? (
        <aside
          className={`border-r border-gray-100 pr-1 w-48 max-sm:w-[40vw] pt-3 pb-2 bg-[#fffffffb] h-full fixed 2xl:block xl:block lg:block ${custFirstSidebar ? `mt-16` : ``} ${disablingSecSidebar && `-mt-2 z-10`}`}
        >
          <div className="top-sec border-b-2 pb-4 border-gray-200">
            <ul className="flex flex-col gap-4.5 px-4 text-md">
              <li>
                <Link
                  to="/"
                  className="flex items-center gap-4 rounded-md py-1 hover:bg-zinc-100"
                >
                  <TiHome className="text-2xl" /> <span>Home</span>
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="flex items-center gap-5 rounded-md py-1 hover:bg-zinc-100"
                >
                  <SiYoutubeshorts className="text-lg" /> <span>Shorts</span>
                </Link>
              </li>
            </ul>
          </div>
          <br />
          <div className="subs-sec border-b-2 pb-8 border-gray-200">
            <div className="cap mx-4 mb-4 flex items-center">
              <span className="mb-1 font-medium">Subscriptions</span>{" "}
              <MdOutlineKeyboardArrowRight className="text-xl mx-1" />
            </div>
            <ul className="flex flex-col gap-4 px-4 text-md">
              <li>
                <Link
                  to="#"
                  className="flex items-center gap-4 rounded-md py-1 hover:bg-zinc-100"
                >
                  <img
                    src="https://media.licdn.com/dms/image/v2/C560BAQH-ryPU8XRnyg/company-logo_200_200/company-logo_200_200/0/1652783491338/timelab_pro_logo?e=2147483647&v=beta&t=hRRRgYYS7iWniA5hjqw_zPs1rKrVr37FGM_stgWW3-I"
                    alt="img"
                    width="23"
                    className="rounded-2xl"
                  />
                  <div>Curly Talks</div>
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="flex items-center gap-4 rounded-md py-1 hover:bg-zinc-100"
                >
                  <img
                    src="https://media.licdn.com/dms/image/v2/C560BAQH-ryPU8XRnyg/company-logo_200_200/company-logo_200_200/0/1652783491338/timelab_pro_logo?e=2147483647&v=beta&t=hRRRgYYS7iWniA5hjqw_zPs1rKrVr37FGM_stgWW3-I"
                    alt="img"
                    width="23"
                    className="rounded-2xl"
                  />
                  <div>Timelab Pro</div>
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="flex items-center gap-4 rounded-md py-1 hover:bg-zinc-100"
                >
                  <img
                    src="https://media.licdn.com/dms/image/v2/C560BAQH-ryPU8XRnyg/company-logo_200_200/company-logo_200_200/0/1652783491338/timelab_pro_logo?e=2147483647&v=beta&t=hRRRgYYS7iWniA5hjqw_zPs1rKrVr37FGM_stgWW3-I"
                    alt="img"
                    width="23"
                    className="rounded-2xl"
                  />
                  <div>Labor Law</div>
                </Link>
              </li>
            </ul>
          </div>
          <br />
          <div className="you-sec">
            <div className="cap mx-4 mb-4 flex items-center">
              <span className="mb-1 font-medium">You</span>{" "}
              <MdOutlineKeyboardArrowRight className="text-xl mx-1" />
            </div>
            <ul className="flex flex-col gap-4 px-4 text-md">
              <li>
                <Link
                  to="/channel"
                  className="flex items-center gap-4 rounded-md py-1 hover:bg-zinc-100"
                >
                  <MdOutlineAccountBox className="text-2xl text-zinc-700" />
                  <span>Your channel</span>
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="flex items-center gap-4 rounded-md py-1 hover:bg-zinc-100"
                >
                  <MdOutlineHistory className="text-2xl text-zinc-700" />
                  <span>History</span>
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="flex items-center gap-4 rounded-md py-1 hover:bg-zinc-100"
                >
                  <MdOutlinePlaylistAddCheck className="text-2xl text-zinc-700" />
                  <span>Playlists</span>
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="flex items-center gap-4 rounded-md py-1 hover:bg-zinc-100"
                >
                  <MdOutlineWatchLater className="text-2xl text-zinc-700" />
                  <span>Watch Later</span>
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="flex items-center gap-4 rounded-md py-1 hover:bg-zinc-100"
                >
                  <AiOutlineLike className="text-2xl text-zinc-700" />
                  <span>Liked Videos</span>
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="flex items-center gap-4 rounded-md py-1 hover:bg-zinc-100"
                >
                  <MdOutlineVideoLibrary className="text-2xl text-zinc-700" />
                  <span>Your Videos</span>
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="flex items-center gap-4 rounded-md py-1 hover:bg-zinc-100"
                >
                  <RiDownloadLine className="text-2xl text-zinc-700" />
                  <span>Downloads</span>
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      ) : (
        <aside
          className={`px-3 w-26 max-sm:w-[15%] py-4 fixed mt-10 ${disablingSecSidebar ? `md:hidden` : `2xl:block xl:block lg:block`} max-md:hidden`}
        >
          <div className="top-sec pb-4">
            <ul className="flex flex-col gap-6 text-md">
              <li>
                <Link
                  to="/"
                  className="flex flex-col items-center gap-2 rounded-md py-1 hover:bg-zinc-100 hover:py-1"
                >
                  <TiHome className="text-2xl" />{" "}
                  <span className="text-xs font-medium text-gray-700">
                    Home
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="flex flex-col items-center gap-2 rounded-md py-1 hover:bg-zinc-100 hover:py-1"
                >
                  <SiYoutubeshorts className="text-xl" />{" "}
                  <span className="text-xs font-medium text-gray-700">
                    Shorts
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="flex flex-col items-center gap-2 rounded-md py-1 hover:bg-zinc-100 hover:px-10 hover:py-1"
                >
                  <MdSubscriptions className="text-xl" />{" "}
                  <span className="text-xs font-medium text-gray-700">
                    Subscriptions
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/channel"
                  className="flex flex-col items-center gap-2 rounded-md py-1 hover:bg-zinc-100 hover:px-10 hover:py-1"
                >
                  <MdAccountCircle className="text-2xl" />{" "}
                  <span className="text-xs font-medium text-gray-700">You</span>
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      )}
    </>
  );
};

export default Sidebar;
