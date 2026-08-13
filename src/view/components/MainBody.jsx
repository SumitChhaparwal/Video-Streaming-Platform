import Sidebar from "./Sidebar";
import VideoList from "./VideoList";
import FilterBtn from "./FilterBtn";
import { useState } from "react";

const MainBody = () => {
  //To toggle state of sidebar- true[show]/false[hide]
  const [toggle, setToggle] = useState(true);

  //To overlap on small screen and if its false then not overlap on big screen -continue..
  let menuToggle = true;
  return (
    <>
      {menuToggle ? (
        <div className="flex flex-row w-full pt-16">
          {toggle && (
            <div className="side_bar w-0 z-50">
              <Sidebar />
            </div>
          )}
          <div className="main_c  w-full pt-4">
            <div className="fixed px-3 top-14 z-20 bg-[#fffefe] w-full backdrop-blur-xl lg:mx-14 lg:mt-2 pt-4">
              <FilterBtn />
            </div>
            <div className="pt-6 z-10 mx-2"> 
              <VideoList />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-row w-full min-h-screen pt-12">
          <div className="side_bar w-50 shrink-0">
            <Sidebar />
          </div>
          <div className="main_c flex-1 px-3 pt-4">
            <div className="fixed z-50 bg-[#fffefef6] w-[73vw] backdrop-blur-xl">
              <FilterBtn />
            </div>
            <div className="pt-10 -z-50">
              <VideoList />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MainBody;
