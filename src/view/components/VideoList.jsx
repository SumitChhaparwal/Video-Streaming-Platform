import { useSelector } from "react-redux";
import VideoItem from "./VideoItem";

const VideoList = () => {
  const vidData = useSelector((store) => store.home.vData);

  return (
    <div className="h-full w-[73vw] max-sm:w-full mx-auto flex flex-wrap gap-x-3.5 gap-y-6.5  justify-start items-center my-3 lg:w-[82vw]  lg:gap-x-4 lg:gap-y-6 md:gap-x-4 max-lg:w-full max-lg:justify-center max-lg:gap-x-12 lg:mt-6">
      {vidData.map((item) => {
        return <VideoItem itemD={item} key={item.videoId}/>;
      })}
    </div>
  );
};

export default VideoList;
