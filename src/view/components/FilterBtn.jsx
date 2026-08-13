const FilterBtn = () => {
  return (
    <div className="w-full max-w-full min-w-0 flex gap-3 overflow-y-hidden overflow-x-auto custom-scrollbar pb-2 cursor-pointer">
      <button className=" bg-zinc-200 px-2.5 py-0.5 rounded-lg text-sm font-medium hover:text-white hover:bg-gray-800 cursor-pointer shrink-0">
        All
      </button>
      <button className=" bg-zinc-200 px-2.5 py-0.5 rounded-lg text-sm font-medium hover:text-white hover:bg-gray-800 cursor-pointer shrink-0">
        Tech
      </button>
      <button className=" bg-zinc-200 px-2.5 py-0.5 rounded-lg text-sm font-medium hover:text-white hover:bg-gray-800 cursor-pointer shrink-0">
        Psychology
      </button>
      <button className=" bg-zinc-200 px-2.5 py-0.5 rounded-lg text-sm font-medium hover:text-white hover:bg-gray-800 cursor-pointer shrink-0">
        Motivation
      </button>
      <button className=" bg-zinc-200 px-2.5 py-0.5 rounded-lg text-sm font-medium hover:text-white hover:bg-gray-800 cursor-pointer shrink-0">
        Book Summary
      </button>
      <button className=" bg-zinc-200 px-2.5 py-0.5 rounded-lg text-sm font-medium hover:text-white hover:bg-gray-800 cursor-pointer shrink-0">
        Recently Uploaded
      </button>
      <button className=" bg-zinc-200 px-2.5 py-0.5 rounded-lg text-sm font-medium hover:text-white hover:bg-gray-800 cursor-pointer shrink-0">
        New to you
      </button>
    </div>
  );
};

export default FilterBtn;
