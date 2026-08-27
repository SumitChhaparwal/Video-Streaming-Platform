import { SlLike } from "react-icons/sl";
import { SlDislike } from "react-icons/sl";
import { MdOutlineSort } from "react-icons/md";
import { FaCircleUser } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import YoutubePlayer from "./YoutubePlayer";
import { useParams } from "react-router-dom";
import { vidData } from "../utilities/vidData";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LiaEdit } from "react-icons/lia";
import { TiUserDeleteOutline } from "react-icons/ti";
import { useSelector } from "react-redux";
import { useLocation, matchPath } from "react-router-dom";

const VideoPlayer = () => {
  const { id } = useParams();

  // const editRef = useRef(null);
  const [apply, setApply] = useState("");

  //getting objData according url parameter id
  const filteredObj = vidData.find((item) => item.videoId == id);
  // console.log(filteredObj);

  const [like, setLike] = useState(1);

  // //Initialize comments state using obj.comments prop
  // const [comments, setComments] = useState(filteredObj.comments);
  const [vidObj, setVidObj] = useState(filteredObj);

  // console.log("vidObj:::", vidObj);

  const [comment, setComment] = useState("");

  //Update comments whenever video id changes
  useEffect(() => {
    if (filteredObj) {
      setLike(1);
      setVidObj(filteredObj);
    }
  }, [id]);

  function addCommentFun(event) {
    // console.log(event);
    if (event.key === "Enter") {
      event.preventDefault();

      if (!comment.trim()) {
        return;
      }

      const newObj = {
        userId: `userxyz2-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        text: comment,
      };

      setVidObj((preVidObj) => ({
        ...preVidObj,
        comments: [newObj, ...preVidObj.comments],
      }));

      // setComments([newObj, ...comments]);

      //updating dataset..
      // filteredObj.comments.unshift(newObj);
      // console.log("-----------", filteredObj);

      setComment("");
    }
  }

  function handleFoucs(id) {
    //dynamically target specific comment box
    const targetElement = document.getElementById(`comment-${id}`);
    targetElement.focus();
  }

  function handleEdit(event, id) {
    if (event.key == "Enter") {
      event.preventDefault();
      const editedTxt = event.currentTarget.innerText.trim();
      if (!editedTxt) {
        return "Try again!";
      }

      //building updated comment list
      const updatedComments = vidObj.comments.map((commentObj) =>
        commentObj.userId == id
          ? { ...commentObj, text: editedTxt }
          : commentObj,
      );

      //updating current state
      setVidObj((preVidObj) => ({
        ...preVidObj,
        comments: updatedComments,
      }));

      console.log("+++++", updatedComments);

      event.currentTarget.blur();
    }
  }

  function handleCDelete(id) {
    const filteredComments = vidObj.comments.filter((obj) => obj.userId != id);
    //updating current state
    setVidObj((preVidObj) => ({
      ...preVidObj,
      comments: filteredComments,
    }));
  }

  //recommendation vid filter
  const filteredVidData = vidData.filter((item) => item.videoId != id);

   const urlLocation = useLocation();

   const custFirstSidebar =
    matchPath({ path: "/videoplayer/:id" }, urlLocation.pathname) !== null;

  let menuChange = custFirstSidebar ? useSelector(store => store.home.menuChange) : false;

  return (
    <>
      <div className="contain flex flex-row md:mb-10 max-md:flex-col max-md:mx-auto max-md:px-2">
        <div className="sec-1 flex flex-col gap-2 ml-2 max-md:ml-0 xl:w-[75vw] lg:w-[70vw] md:w-[70vw] max-sm:w-full mt-20">
          <div className={`relative aspect-video overflow-hidden rounded-xl shadow-lg bg-black overflow-y-hidden ${menuChange ? `-z-10`: ``}`} >
            <YoutubePlayer url={vidObj.videoLink}/>
          </div>
          <div className="title text-lg lg:text-2xl lg:mt-1 md:text-xl font-medium line-clamp-2">
            {vidObj.title}
          </div>
          <div className="sub-sec mt-1 mb-2 flex justify-between">
            <div className="sub1 flex gap-2">
              <div className="subF w-11 xl:w-12 max-sm:w-10">
                <img src={`${vidObj.channelFavicon}`} className="rounded-4xl" />
              </div>
              <div className="subS">
                <div className="row text-md font-medium flex items-center gap-1">
                  {vidObj.channelId}{" "}
                  <span className="text-xs text-[#070707b9]">
                    <FaCheckCircle />
                  </span>{" "}
                </div>
                <div className="row text-xs font-medium text-zinc-400">
                  {vidObj.likes} subscribers
                </div>
              </div>
              <div className="subT">
                <button className="bg-gray-900 rounded-2xl text-gray-200 font-medium text-sm px-2.5 py-1.5 hover:bg-gray-800 transition-all cursor-pointer ml-2.5">
                  Subscribe
                </button>
              </div>
            </div>
            <div className="sub2">
              <div className="likeUnlike bg-[#e6e6e6a1] rounded-4xl w-30 flex flex-row justify-around py-1.5 font-medium">
                <button
                  className="flex items-center pl-1 cursor-pointer"
                  onClick={() => setLike(like + 1)}
                >
                  <SlLike /> <span className="mx-1.5 text-sm">{like}</span>
                </button>
                <button
                  className="border-l-2 border-gray-300 pl-5.5 pr-1 cursor-pointer"
                  onClick={() => setLike(like - 1)}
                >
                  <SlDislike />
                </button>
              </div>
            </div>
          </div>
          <div className="desc bg-blue-50 rounded-xl py-2.5 px-2">
            <div className="row1 flex gap-3.5 text-md font-medium text-gray-800">
              <div>{vidObj.views} views</div>
              <div>{vidObj.ago} ago</div>
            </div>
            <div className="row2 text-md">
              <p>{vidObj.description}</p>
            </div>
          </div>
          <div className="comment-sec mt-5">
            <div className="sec1 flex gap-4">
              <div className="title text-lg font-medium text-gray-800">
                {vidObj.comments.length} Comments
              </div>
              <div className="sort flex items-center gap-1.5">
                <MdOutlineSort className="text-lg" />{" "}
                <span className="font-medium text-gray-800">Sort by</span>
              </div>
            </div>
            <div className="sec2 mt-5 flex items-center gap-2.5 w-full">
              <div className="profileIcon text-2xl text-gray-400">
                <FaCircleUser />
              </div>
              <div className="addComment w-full">
                <input
                  type="text"
                  placeholder="Add a comment.."
                  className="border-b-2 border-gray-300 pb-1 w-full"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  onKeyDown={addCommentFun}
                />
              </div>
            </div>
            <div className="sec-3 comm mt-5 flex-col">
              {vidObj.comments.map((obj) => {
                return (
                  <div className="users flex gap-2 mb-3" key={obj.userId}>
                    <div className="profile w-8 h-8 bg-blue-500 flex items-center justify-center rounded-4xl text-md font-medium text-white">
                      {obj.userId.split("")[0].toUpperCase()}
                    </div>
                    <div className="comment flex flex-col gap-0.5 w-full">
                      <div className="userchannelName text-sm font-medium">
                        @{obj.userId.toLowerCase()}
                      </div>
                      <div className="msg text-md flex w-full justify-between items-center pr-2 cursor-pointer">
                        <div
                          className="txt pr-3"
                          contentEditable
                          suppressContentEditableWarning
                          onKeyDown={(e) => handleEdit(e, obj.userId)}
                          id={`comment-${obj.userId}`}
                        >
                          {obj.text}
                        </div>
                        <div className="edit flex gap-5">
                          <div onClick={() => handleFoucs(obj.userId)}>
                            <LiaEdit />
                          </div>
                          <div onClick={() => handleCDelete(obj.userId)}>
                            <TiUserDeleteOutline />
                          </div>
                        </div>
                      </div>
                      <div className="likeUnlike rounded-4xl w-24 flex flex-row gap-3 py-1.5">
                        <button className="flex items-center cursor-pointer">
                          <SlLike />{" "}
                          <span className="mx-1.5 text-xs font-medium text-gray-400">
                            1
                          </span>
                        </button>
                        <button className=" border-gray-300 cursor-pointer">
                          <SlDislike />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="sec-2 mt-20 mx-3 flex flex-col gap-2.5 max-md:mt-6 max-md:gap-4 max-md:border-t max-md:mb-10 max-md:border-gray-300 max-md:pt-8">
          {filteredVidData.map((objEle) => {
            return (
              <Link
                key={objEle.videoId}
                to={`http://localhost:5173/videoplayer/${objEle.videoId}`}
                className="contents"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <div className="vid-sec flex flex-row cursor-pointer hover:bg-gray-50 transition-all">
                  <div className="thumbnail max-w-65">
                    <img
                      src={objEle.thumbnailUrl}
                      alt="thumbnail_img"
                      height="100"
                      className="rounded-xl"
                    />
                  </div>
                  <div className="about ml-1.5">
                    <div className="title line-clamp-3 font-medium">
                      {objEle.title}
                    </div>
                    <div className="channelId text-sm font-medium text-gray-500 flex items-center gap-1">
                      {objEle.channelId} <FaCheckCircle className="text-xs" />
                    </div>
                    <div className="view text-sm font-medium text-gray-500">
                      <div>{objEle.views} views</div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default VideoPlayer;
