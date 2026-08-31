import VideoItem from "./VideoItem";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { storeData } from "../utilities/homeSlice";

const VideoList = () => {

  const vData = useSelector(store => store.home.vData);

  const dispatch = useDispatch();

  //func() made get api request through axios for videos data
  async function getVidData() {
    try{
      const response = await axios.get("http://localhost:3200");
      if(!response){
        console.log("Try again!");
        return;
      }
      console.log(response.data);
      //dispatching storeData action to store fetched data inside global state..
      dispatch(storeData(response.data));
      //store data inside sessionStorage, which utilitze for filter and search
      sessionStorage.setItem("videoD", JSON.stringify(response.data));   
    } catch(err){
      console.log("Response Error: ", err);
    }
  }

  //only call when component mount or page reload..
  useEffect(() => {
    getVidData();
  }, []);


 
  return (
    <div className="h-full w-[73vw] max-sm:w-full mx-auto flex flex-wrap gap-x-3.5 gap-y-6.5  justify-start items-center my-3 lg:w-[82vw]  lg:gap-x-4 lg:gap-y-6 md:gap-x-4 max-lg:w-full max-lg:justify-center max-lg:gap-x-12 lg:mt-6">
      {vData.map((item) => {
        return (
          <Link to={`/videoplayer/${item.videoId}`} key={item.videoId} className="contents" onClick={() => window.scrollTo({top: 0, behavior: "smooth"})}> {/*Using Contents to avoid layout issues*/}
            <VideoItem itemD={item} />
          </Link>
        );
      })}
    </div>
  );
};

export default VideoList;
