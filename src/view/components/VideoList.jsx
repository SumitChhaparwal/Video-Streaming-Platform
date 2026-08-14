import { BsThreeDotsVertical } from "react-icons/bs";
import { useSelector } from "react-redux";

const VideoList = () => {
  const vidData = useSelector(store => store.home.vData);
  
  return (
    <div className="h-full w-[73vw] max-sm:w-full mx-auto flex flex-wrap gap-x-3.5 gap-y-6.5  justify-start items-center my-3 lg:w-[82vw]  lg:gap-x-4 lg:gap-y-6 md:gap-x-4 max-lg:w-full max-lg:justify-center max-lg:gap-x-12 lg:mt-6">
      {vidData.map((item) => {
        return (
          <div className="vidItem cursor-pointer 2xl:h-[45vh] xl:h-[40vh] lg:h-[35vh] [@media(width:1024px)_and_(height:1366px)]:h-[20vh] max-md:h-full xl:w-[32%] lg:w-[31.9%] md:w-[35.5vw] max-sm:w-full border" key={item.videoId}>
            <div className="thumb-sec relative">
              <img
                src={`${item.thumbnailUrl}`}
                alt="thumbnail_img"
                className="rounded-lg"
              />
              <span className="absolute bottom-2.5 right-2.5 bg-[#0a0a0a8a] text-white font-medium px-1.5 py-0.5 rounded-md">
                {item.duration}
              </span>
            </div>
            <div className="next-sec w-full flex flex-row justify-between mt-2">
              <div className="favicon basis-[14%] lg:basis-[13%] max-sm:basis-[10%] sm:basis-[6%] border">
                <img
                  src={`${item.channelFavicon}`}
                  className="w-10 h-10 rounded-4xl"
                  alt="favicon_img"
                />
              </div>
              <div className="info basis-[77%] lg:basis-[75%] max-sm:basis-[80%] border flex flex-col items-start gap-1 md:gap-0.5">
                {/* max-xl:px-1 max-lg:px-1 lg:px-1=n*/}
                <div className="title text-md font-medium text-gray-900 line-clamp-2 max-xl:text-sm flex-5">
                  {item.title}
                </div>
                <div className="channelName text-sm font-medium text-gray-500 max-xl:text-sm">
                  Think School
                </div>
                <div className="more flex gap-1 items-center text-sm font-medium text-gray-500 max-xl:text-sm">
                  <div className="views">867k</div>
                  <div>•</div>
                  <div className="ago">4 months ago</div>
                </div>
              </div>
              <div className="moreIcon basis-[4%]">
                <a href="#">
                  <BsThreeDotsVertical className="text-md text-gray-900" />
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default VideoList;
