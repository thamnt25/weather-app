import iconSearch from "../../assets/images/icon-search.svg";

const Search = () => {
  return (
    <>
      <section className="mt-10 flex flex-col gap-8 px-6 md:px-10 xl:mt-14 xl:items-center xl:px-0">
        <span className="text-center text-4xl font-bold text-white xl:text-5xl">
          How&apos;s the sky looking today?
        </span>

        <div className="flex w-full max-w-[29rem] flex-col gap-3 md:max-w-[34rem] md:flex-row md:items-center">
          <label className="flex h-12 flex-1 items-center gap-3 rounded-xl border border-neutral-600/70 bg-neutral-800 px-4 shadow-[0_14px_30px_rgba(3,1,45,0.2)] transition-colors focus-within:border-blue-500/70">
            <img src={iconSearch} alt="" className="h-4 w-4 opacity-90" />
            <input
              type="text"
              placeholder="Search for a place..."
              className="w-full bg-transparent text-base font-medium text-white placeholder:text-neutral-300/90 outline-none"
            />
          </label>

          <button
            type="button"
            className="h-12 rounded-xl bg-blue-500 px-6 text-base font-semibold text-white shadow-[0_16px_30px_rgba(68,85,218,0.35)] transition-all hover:bg-blue-700"
          >
            Search
          </button>
        </div>
      </section>
    </>
  );
};

export default Search;
