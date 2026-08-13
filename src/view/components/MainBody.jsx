import Sidebar from "./Sidebar";
import VideoList from "./VideoList";
import FilterBtn from "./FilterBtn";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateMenuOverlap } from "../utilities/homeSlice";

const MainBody = () => {
  //To overlap on small screen and if its false then not overlap on big screen -continue..
  // let menuOverlap = false;
  const menuOverlap = useSelector((store) => store.home.menuOverlap);
  const menuChange = useSelector((store) => store.home.menuChange);

  const dispatch = useDispatch();

  //setting condition related to overlap..
  function menuOverFun() {
    let width = window.innerWidth;
    if (width < 768) {
      dispatch(updateMenuOverlap());
    } else {
      dispatch(updateMenuOverlap(false));
    }
  }
  menuOverFun();

  return (
    <>
      {menuOverlap ? (
        <div className="flex flex-row w-full pt-16">
          <div className="side_bar w-0 z-50">
            <Sidebar />
          </div>
          <div className="main_c  w-full pt-4">
            <div className="fixed px-3 xl:px-[5vw] lg:px-[3.5vw] md:pl-[9.5vw] top-14 z-20 bg-[#fffefe] w-full backdrop-blur-xl lg:mx-14 lg:mt-2 pt-4">
              <FilterBtn />
            </div>
            <div className="pt-6 z-10 mx-2">
              <VideoList />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-row w-full min-h-screen pt-12">
          <div
            className={
              menuChange
                ? `side_bar w-50 shrink-0`
                : `side_bar w-28 border-r border-gray-100 shrink-0`
            }
          >
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
