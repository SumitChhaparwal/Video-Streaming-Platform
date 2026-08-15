import { SlLike } from "react-icons/sl";
import { SlDislike } from "react-icons/sl";
import { MdOutlineSort } from "react-icons/md";
import { FaCircleUser } from "react-icons/fa6";
import YoutubePlayer from "./YoutubePlayer";

const VideoPlayer = () => {
  //YT video URL address 
  let url = "https://m.youtube.com/watch?v=3_9vCamtuPY&pp=ygUjRHVuZTogUGFydCBUaHJlZSB8IE9mZmljaWFsIFRyYWlsZXI%3D";
  return (
    <>
      <div className="contain">
        <div className="sec-1">
          <div className="relative aspect-video overflow-hidden rounded-xl shadow-lg bg-black mt-20 ml-2 overflow-y-hidden lg:w-[75vw] md:w-[70vw] max-sm:w-full">
            <YoutubePlayer url={url}/>
          </div>
          <div className="title">Marvel Avengers New Trailer Launch</div>
          <div className="sub-sec">
            <div className="sub1">
              <div className="subF">
                <img src="#" alt="channel_favicon" />
              </div>
              <div className="subS">
                <div className="row">channel_name</div>
                <div className="row">1M Subscribers</div>
              </div>
              <div className="subT">
                <button>Subscribe</button>
              </div>
            </div>
            <div className="sub2">
              <div className="likeUnlike">
                <button>
                  <SlLike /> <span>1K</span>
                </button>
                <button>
                  <SlDislike />
                </button>
              </div>
            </div>
          </div>
          <div className="desc">
            <div className="row1">
              <div>100k views</div>
              <div>1 day ago</div>
            </div>
            <div className="row2">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
                soluta porro earum quis maiores, consequatur commodi
                necessitatibus mollitia ab. Harum recusandae neque in! Ad
                tempora magni placeat culpa beatae amet.
              </p>
            </div>
          </div>
          <div className="comments">
            <div className="sec1">
              <div className="title">10 Comments</div>
              <div className="sort">
                <MdOutlineSort /> Sort by
              </div>
            </div>
            <div className="sec2">
              <div className="profileIcon">
                <FaCircleUser />
              </div>
              <div className="addComment">
                <input
                  type="text"
                  placeholder="Add a comment.."
                  className="border-b"
                />
              </div>
            </div>
            <div className="sec-3">
              <div className="profile">T</div>
              <div className="comment">
                <div className="userchannelName">@xyzshort</div>
                <div className="likedislike">
                  <div>
                    <SlLike /> 5
                  </div>
                  <div>
                    <SlDislike />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sec-2">
          <div className="vid-sec">
            <div className="thumbnail">
              <img src="#" alt="thumbnail_img" />
            </div>
            <div className="about">
              <div className="title line-clamp-3">
                Don't Be In the Comfort Zone
              </div>
              <div className="channelId">The Deshbhakt</div>
              <div className="view">
                <div>5k</div>
              </div>
            </div>
          </div>
          <div className="vid-sec">
            <div className="thumbnail">
              <img src="#" alt="thumbnail_img" />
            </div>
            <div className="about">
              <div className="title line-clamp-3">
                Don't Be In the Comfort Zone
              </div>
              <div className="channelId">The Deshbhakt</div>
              <div className="view">
                <div>5k</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoPlayer;
