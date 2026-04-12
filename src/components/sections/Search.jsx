import iconSearch from "../../assets/images/icon-search.svg";

const Search = () => {
  return (
    <>
      <section className="flex flex-col xl:items-center gap-10 mt-10 xl:mt-15">
        <span className="text-white text-4xl xl:text-5xl font-bold px-10 xl:px-0 text-center">How's the sky looking today?</span>
        <div className="flex flex-col md:flex-row gap2 px-10 xl:px-0 gap-4">
          <div className="flex flex-row w-full rounded-md bg-neutral-700 gap-3 xl:w-[500px]">
            <img src={iconSearch} alt="search" className="w-4 self-center ml-2"/>
            <input type="text" placeholder="Search for a place..." className="text-base text-white font-semibold w-full py-3 border-transparent hover:border-transparent outline-none"/>
          </div>
          <button className="text-white bg-blue-500 px-5 py-3 md:py-1 rounded-md text-base font-semibold hover:bg-blue-700">Search</button>
        </div>
      </section>
    </>
  );
};

export default Search;
