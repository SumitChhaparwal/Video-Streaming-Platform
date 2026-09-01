import { useDispatch } from "react-redux";
import { filterBtn } from "../utilities/homeSlice";

const FilterBtn = () => {
  const dispatch = useDispatch();
  return (
    <div className="w-full max-w-full min-w-0 flex gap-3 overflow-y-hidden overflow-x-auto custom-scrollbar pb-2 cursor-pointer">
      <button
        className=" bg-zinc-200 px-2.5 py-0.5 rounded-lg text-sm font-medium hover:text-white hover:bg-gray-800 cursor-pointer shrink-0"
        onClick={() =>
          dispatch(
            filterBtn({
              type: "all",
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
