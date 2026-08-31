import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState, useRef, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { FiCheck } from "react-icons/fi";
import { IoImageOutline } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { getVidData } from "../utilities/getVidData";

const Channel = () => {
  //for more menu..
  const [openDropdown, setOpenDropDown] = useState(null);
  const [edit, setEdit] = useState(false);

  //to store stringy url data [binary to string converted data]
  const [prevUpload, setPrevUpload] = useState(null);

  //accessing global state
  const vData = useSelector((store) => store.home.vData);

  //channel specific videos
  const channelVids = vData.slice(0, 5);

  console.log(channelVids);

  const dispatch = useDispatch();

  //only call when component mount or page reload..
  useEffect(() => {
    if (vData.length === 0) {
      getVidData(dispatch);
    }
  }, []);

  //for getting VideoDetails
  //1. for title
  const titleRef = useRef(null);
  //2. for description
  const descRef = useRef(null);
  //3. to store file obj data
  const [file, setFile] = useState(null);

  //func() to display videoDetails
  function displayVideoD() {
    console.log({
      title: titleRef.current.value,
      desc: descRef.current.value,
      imgUrl: prevUpload,
    });
  }

  //func() to delete video
  function deleteVid(id) {
    const filteredData = channelVids.filter((obj) => obj.id !== id);
    setVid(filteredData);
  }

  //check newFile
  function checkNewFile(e) {
    const newFile = e.target.files[0];
    if (!newFile) {
      console.log("file object isn't found!");
      return;
    }
    //store file obj value in file state
    setFile(newFile);

    //to get upload url
    let uploadedImgURL = URL.createObjectURL(newFile);
    if (!uploadedImgURL) {
      console.log("problem occurs when getting url..");
      return;
    }

    const reader = new FileReader();
    //wait fo reader to finish reading asynchronous
    reader.onload = () => {
      const stringyURL = reader.result;
      setPrevUpload(stringyURL);
      console.log("#stringyURL: ", stringyURL);
    };
    //readAsDataURL convert binary to stringy url, note: its only take file or blob object, not url
    reader.readAsDataURL(newFile);
  }

  //toggle() to update state..
  function dropdownToggle(index) {
    setOpenDropDown(openDropdown === index ? null : index);
  }

  const accessData = sessionStorage.getItem("currentCh");
  const channelObj = accessData ? JSON.parse(accessData) : "";
  const initialFavicon = channelObj ? channelObj.channelName.slice(0, 1) : "";

  return (
    <div className="mt-18 md:max-w-[80vw] w-full mx-auto max-sm:px-1">
      <div className="channel-banner w-full">
        <img
          src={
            channelObj
              ? channelObj.bannerImg
              : "https://yt3.googleusercontent.com/B5iaLfhJJ65Gh20ZsOaXJZ6eeKCoLzoU-rtFQcYncWSs_j5SFYi5p80kChpSnX6xO54to0q4EXo=w1707-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj"
          }
          className="rounded-xl max-sm:rounded-md max-sm:w-full"
          alt="banner_img"
        />
      </div>
      <div className="ch-about flex flex-row items-center gap-6 max-sm:gap-4 mt-5 max-sm:border max-sm:border-[#ccc] max-sm:py-3 max-sm:px-1 max-sm:rounded-md max-sm:mt-2">
        <div className="sec-1">
          {channelObj ? (
            <div className="bg-violet-600 text-white w-24 h-24 max-sm:w-20 max-sm:h-20 flex justify-center items-center text-4xl rounded-full uppercase shadow-xl">
              <span>{initialFavicon || "U"}</span>
            </div>
          ) : (
            <img
              src="https://yt3.ggpht.com/3fPNbkf_xPyCleq77ZhcxyeorY97NtMHVNUbaAON_RBDH9ydL4hJkjxC8x_4mpuopkB8oI7Ct6Y=s68-c-k-c0x00ffffff-no-rj-mo"
              alt="favicon_img"
              className="w-50 xl:w-40 lg:w-50 md:w-60 sm:w-60 max-sm:w-80 rounded-full"
            />
          )}
          {/*  */}
        </div>
        <div className="sec-2 flex flex-col justify-start gap-2.5 max-sm:gap-1">
          <div className="name r-1 capitalize flex items-center gap-2 font-semibold">
            <span className="text-3xl max-sm:text-2xl capitalize text-gray-900">
              {channelObj?.channelName || "Fireship"}
            </span>
            <span>
              <FaCheckCircle className="text-md" />
            </span>
          </div>
          <div className="sub r-2 flex gap-2 text-md">
            <div className="tag font-semibold tracking-tight text-gray-900 max-sm:w-20 overflow-x-clip line-clamp-2">
              @{channelObj?.handle || "fireship"}
            </div>
            <div className="sub tracking-tight text-gray-800">
              • {channelObj?.subscribers || "1k"} subscribers
            </div>
            <div className="vids tracking-tight text-gray-800">• 5 videos</div>
          </div>
          <div className="desc r-3 line-clamp-2 text-gray-800 w-full pr-20 max-sm:pr-0">
            {channelObj?.desc ||
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam inventore dolore aspernatur similique repellat odit fugit aut necessitatibus veniam amet repudiandae, aperiam recusandae architecto sequi magni obcaecati tempora consequuntur! Quasi."}
          </div>
          <div className="btn r-4 max-sm:mt-1">
            <button className="rounded-3xl px-4 py-1.5  bg-gray-900 hover:bg-gray-800 text-white text-md cursor-pointer">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <div className="menu flex items-center gap-6 mt-7 border-b border-zinc-300 pb-2.5 max-sm:justify-center max-sm:mt-6">
        <Link to="/" className="pl-10 max-sm:pl-0 text-gray-600 tracking-tight">
          Home
        </Link>
        <Link to="#" className=" text-gray-700 font-medium tracking-tight">
          Videos
        </Link>
        <Link to="#" className=" text-gray-600 tracking-tight">
          Shorts
        </Link>
        <Link to="#" className=" text-gray-600 tracking-tight">
          Live
        </Link>
        <Link to="#" className=" text-gray-600 tracking-tight">
          Posts
        </Link>
        <IoSearchOutline className="text-gray-600" />
      </div>
      <div className="vid-sec mt-6 w-full  h-full py-5 flex flex-wrap gap-12 max-sm:justify-center sm: max-sm:gap-10 mx-auto justify-left 2xl:pl-8 xl:pl-1 xl:gap-x-10 lg:pl-0 max-lg:justify-center">
        {/*PopUp Overlay: Edit Section*/}
        {edit && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
            {/*Model Container*/}
            <div className="flex h-[90vh] w-full max-w-5xl flex-col rounded-xl bg-white shadow-2xl border border-gray-100 overflow-hidden">
              {/*Header*/}
              <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4 ">
                <h2 className="text-lg font-semibold text-gray-900">
                  Video details
                </h2>
                <div className="btn flex flex-row items-center gap-5">
                  <button
                    className="rounded-lg p-1.5 text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer text-xl"
                    onClick={() => {
                      displayVideoD();
                      setEdit(false);
                    }}
                  >
                    <FiCheck />
                  </button>
                  <button
                    className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors cursor-pointer"
                    onClick={() => setEdit(false)}
                  >
                    <RxCross2 className="text-xl" />
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-6">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                  {/*Left Column: Form Field*/}
                  <div className="space-y-6 lg:col-span-7">
                    {/*Title Input*/}
                    <div className="relative rounded-lg border border-gray-300 px-3.5 py-2.5 focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
                      <label className="block text-xs font-medium text-gray-500">
                        Title (required)
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your video title.."
                        className="w-full border-0 p-0 text-sm text-gray-900 focus:outline-none mt-2"
                        ref={titleRef}
                      />
                    </div>

                    {/*Description textarea*/}
                    <div className="relative rounded-lg border border-gray-300 px-3.5 py-2.5 focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
                      <label className="block text-xs font-medium text-gray-500">
                        Description
                      </label>
                      <textarea
                        rows="4"
                        className="w-full resize-none border-0 p-0 text-sm text-gray-900 focus:outline-none mt-2"
                        placeholder="Tell viewers about your video..."
                        ref={descRef}
                      ></textarea>
                    </div>
                    {/*Thumbnail section*/}
                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-2">
                        Thumbnail
                      </label>
                      <p className="text-xs text-gray-500 mb-3">
                        Select or upload a picture that shows what's in your
                        video.
                      </p>
                      <label
                        className="flex h-28 w-36 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 bg-gray-50 text-gray-500"
                        htmlFor="imgfile"
                      >
                        {prevUpload ? (
                          <img
                            src={prevUpload}
                            alt="img_prview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <>
                            <IoImageOutline className="text-lg" />
                            <span className="text-xs font-medium">
                              Upload Image
                            </span>
                          </>
                        )}
                        <input
                          type="file"
                          className="hidden"
                          id="imgfile"
                          onChange={checkNewFile}
                          accept="image/*"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {channelVids.map((item, index) => {
          const isOpen = openDropdown === index;
          return (
            <div
              className="vid-item w-87 xl:w-83 h-70 lg:w-75 lg:h-70 max-lg:w-[70vw] max-lg:h-110 max-sm:w-[95vw] sm:h-120 [@media(max-width:772px)_and_(height:883px)]:h-[50vh] [@media(max-width:772px):h-[10vh] [@media(max-width:768px)_and_(height:1024px)]:h-[40vh] cursor-pointer"
              key={item._id}
            >
              <div className="thumb-sec relative">
                <Link
                  to={`/videoplayer/${item.videoId}`}
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  
                >
                  <img
                    src={`${item.thumbnailUrl}`}
                    alt="thumbnail_img"
                    className="rounded-lg"
                  />
                </Link>
                <span className="absolute bottom-2.5 right-2.5 bg-[#0a0a0a8a] text-white font-medium px-1.5 py-0.5 rounded-md">
                  {item.duration}
                </span>
              </div>

              <div className="next-sec w-full flex flex-row mt-2">
                <div className="favicon basis-15">
                  <img
                    src="https://yt3.ggpht.com/3fPNbkf_xPyCleq77ZhcxyeorY97NtMHVNUbaAON_RBDH9ydL4hJkjxC8x_4mpuopkB8oI7Ct6Y=s68-c-k-c0x00ffffff-no-rj-mo"
                    className="w-10 h-10 rounded-4xl"
                    alt="favicon_img"
                  />
                </div>
                <div className="info flex flex-col items-start gap-1 md:gap-0.5 w-full">
                  {/* max-xl:px-1 max-lg:px-1 lg:px-1=n*/}
                  <div className="info-top flex flex-row justify-between items-start w-full">
                    <div className="title text-md font-medium text-gray-900 line-clamp-2 max-xl:text-sm basis-[95%] -z-10">
                      {item.title}
                    </div>
                    <div className="option relative">
                      <BsThreeDotsVertical
                        className="text-lg text-gray-900 mt-1 absolute right-2 top-1 cursor-pointer z-20"
                        onClick={() => dropdownToggle(index)}
                      />
                      {isOpen && (
                        <div
                          id="multi-dropdown"
                          className={`absolute right-0 bg-neutral-primary-medium border-default-medium rounded-base shadow-lg w-32 rounded-xl border border-gray-100 bg-white z-10`}
                        >
                          <ul
                            className="p-2 text-sm text-body font-medium w-[90%]"
                            aria-labelledby="multiLevelDropdownButton"
                          >
                            <li className="hover:bg-gray-100 hover:rounded-lg transition-all px-2">
                              <button
                                className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded cursor-pointer"
                                onClick={() => setEdit(true)}
                              >
                                Edit
                              </button>
                            </li>
                            <li className="hover:bg-red-100 transition-all rounded-lg px-2">
                              <button
                                className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded cursor-pointer"
                                onClick={() => deleteVid(item.id)}
                              >
                                Delete
                              </button>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                  <div
                    className={`channelName text-sm font-medium text-gray-500 max-xl:text-sm`}
                  >
                    {channelObj.channelName}
                  </div>
                  <div className="more flex gap-1 items-center text-sm font-medium text-gray-500 max-xl:text-sm">
                    <div className="views">{item.views}</div>
                    <div>•</div>
                    <div className="ago">{item.ago}</div>
                  </div>
                </div>
                {/* <div className="moreIcon basis-[4%]"></div> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Channel;
