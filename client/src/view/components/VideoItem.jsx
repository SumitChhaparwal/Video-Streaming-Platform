import { BsThreeDotsVertical } from "react-icons/bs";

const VideoItem = ({ itemD }) => {
  return (
    <>
      <div className="vidItem cursor-pointer 2xl:h-[45vh] xl:h-[40vh] lg:h-[35vh] [@media(width:1024px)_and_(height:1366px)]:h-[20vh] max-md:h-full xl:w-[32%] lg:w-[31.9%] md:w-[35.5vw] max-sm:w-full hover:bg-zinc-100 hover:rounded-xl transition-all">
        <div className="thumb-sec relative">
          <img
            src={`${itemD.thumbnailUrl}`}
            alt="thumbnail_img"
            className="rounded-lg"
          />
          <span className="absolute bottom-2.5 right-2.5 bg-[#0a0a0a8a] text-white font-medium px-1.5 py-0.5 rounded-md">
            {itemD.duration}
          </span>
        </div>
        <div className="next-sec w-full flex flex-row justify-between mt-2">
          <div className="favicon basis-[14%] lg:basis-[13%] max-sm:basis-[10%] sm:basis-[6%]">
            <img
              src={`${itemD.channelFavicon}`}
              className="w-10 h-10 rounded-4xl"
              alt="favicon_img"
            />
          </div>
          <div className="info basis-[77%] lg:basis-[75%] max-sm:basis-[80%] flex flex-col items-start gap-1 md:gap-0.5">
            {/* max-xl:px-1 max-lg:px-1 lg:px-1=n*/}
            <div className="title text-md font-medium text-gray-900 line-clamp-2 max-xl:text-sm flex-5">
              {itemD.title}
            </div>
            <div className="channelName text-sm font-medium text-gray-500 max-xl:text-sm">
              {itemD.channelId}
            </div>
            <div className="more flex gap-1 items-center text-sm font-medium text-gray-500 max-xl:text-sm">
              <div className="views">{itemD.views}</div>
              <div>•</div>
              <div className="ago">{itemD.ago} ago</div>
            </div>
          </div>
          <div className="moreIcon basis-[4%]">
            <div>
              <BsThreeDotsVertical className="text-md text-gray-900" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoItem;
