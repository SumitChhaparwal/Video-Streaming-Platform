import { useDispatch, useSelector } from "react-redux";
import { filterBtn } from "../utilities/homeSlice";
import { vidData } from "../utilities/vidData";

const FilterBtn = () => {
  // const backUpData = useSelector((store) => store.home.vData);
  const backUpData = vidData;

  const dispatch = useDispatch();
  return (
    <div className="w-full max-w-full min-w-0 flex gap-3 overflow-y-hidden overflow-x-auto custom-scrollbar pb-2 cursor-pointer">
      <button
        className=" bg-zinc-200 px-2.5 py-0.5 rounded-lg text-sm font-medium hover:text-white hover:bg-gray-800 cursor-pointer shrink-0"
        onClick={() =>
          dispatch(
            filterBtn({
              type: "all",
              bArray: backUpData,
            }),
          )
        }
      >
        All
      </button>
      <button
        className=" bg-zinc-200 px-2.5 py-0.5 rounded-lg text-sm font-medium hover:text-white hover:bg-gray-800 cursor-pointer shrink-0"
        onClick={() =>
          dispatch(
            filterBtn({
              type: "tech",
              bArray: backUpData,
            }),
          )
        }
      >
        Tech
      </button>
      <button
        className=" bg-zinc-200 px-2.5 py-0.5 rounded-lg text-sm font-medium hover:text-white hover:bg-gray-800 cursor-pointer shrink-0"
        onClick={() =>
          dispatch(
            filterBtn({
              type: "motivation",
              bArray: backUpData,
            }),
          )
        }
      >
        Motivation
      </button>
      <button
        className=" bg-zinc-200 px-2.5 py-0.5 rounded-lg text-sm font-medium hover:text-white hover:bg-gray-800 cursor-pointer shrink-0"
        onClick={() =>
          dispatch(
            filterBtn({
              type: "song",
              bArray: backUpData,
            }),
          )
        }
      >
        Song
      </button>
      <button
        className=" bg-zinc-200 px-2.5 py-0.5 rounded-lg text-sm font-medium hover:text-white hover:bg-gray-800 cursor-pointer shrink-0"
        onClick={() =>
          dispatch(
            filterBtn({
              type: "trailer",
              bArray: backUpData,
            }),
          )
        }
      >
        Movie Trailer
      </button>
      <button
        className=" bg-zinc-200 px-2.5 py-0.5 rounded-lg text-sm font-medium hover:text-white hover:bg-gray-800 cursor-pointer shrink-0"
        onClick={() =>
          dispatch(
            filterBtn({
              type: "podcast",
              bArray: backUpData,
            }),
          )
        }
      >
        Podcast
      </button>
      <button
        className=" bg-zinc-200 px-2.5 py-0.5 rounded-lg text-sm font-medium hover:text-white hover:bg-gray-800 cursor-pointer shrink-0"
        onClick={() =>
          dispatch(
            filterBtn({
              type: "newtoyou",
              bArray: backUpData,
            }),
          )
        }
      >
        New to you
      </button>
    </div>
  );
};

export default FilterBtn;
