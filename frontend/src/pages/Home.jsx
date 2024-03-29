import { useContext, useEffect } from "react";
import RecipeContext from "../context/Recipes/RecipeContext";
import Spinner from "../components/Spinner";
import TagItem from "../components/TagItem";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faClock } from "@fortawesome/free-solid-svg-icons";

function Home() {
  const { data, randomArr, isLoading, fetchRecipies } =
    useContext(RecipeContext);

  useEffect(() => {
    fetchRecipies();
  }, []);

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <h1 className="mb-8 text-4xl font-bold my-12 md:my-6 text-black md:text-stone-300 text-center md:text-left md:mt-10 md:ml-16">
        Cullinary Craft
      </h1>
      {/* Input and SVG Container */}
      <div className="relative md:hidden flex border-b mb-4">
        <input
          type="text"
          className="mx-2 px-2 pb-1 w-full h-10 bg-stone-100 rounded-md focus:shadow-md border-none md:w-80 
          placeholder:font-thin focus:outline-none"
          placeholder="Search"
        />
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute w-8 text-gray-300 duration-200 hover:scale-110 right-4 bottom-1"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <circle cx="10" cy="10" r="7" />
            <line x1="21" y1="21" x2="15" y2="15" />
          </svg>
        </button>
      </div>
      <div className="flex overflow-x-auto whitespace-nowrap space-x-2 md:space-x-6 md:ml-16">
        {/* Tag Items */}
        <TagItem name="pizza" deg="200" />
        <TagItem name="cheese" />
        <TagItem name="pasta" />
        <TagItem name="meat" />
        <TagItem name="fish" />
        <TagItem name="veggies" />
        <TagItem name="fruit" />
        <TagItem name="salad" />
      </div>

      <h5 className="text-3xl font-bold text-black md:text-stone-300 mt-12 mb-8 pl-3 md:ml-16 md:mt-24 md:mb-0">
        Recommended
      </h5>

      <div className="flex overflow-x-auto whitespace-nowrap mb-16 md:flex-row md:flex-wrap md:ml-28">
        {randomArr.map((val, index) => (
          <div key={index}>
            {data.data[val] ? (
              <div
                className={`group relative px-2 w-60 mb-4 md:flex md:flex-row md:flex-wrap md:px-20 md:pt-5 md:w-full md:h-full md:mb-8  ${
                  index > 5 ? "md:hidden" : ""
                }`}
              >
                <Link
                  to={`recipes/${data.data[val]._id}`}
                  key={index}
                  className=""
                >
                  <div className="hidden md:flex flex-col w-96 h-full items-center rounded-2xl bg-slate-50">
                    {/* Desktop Image */}
                    <img
                      src={`https://culinaryapp.onrender.com/imagesSmall/${data.data[val].img}`}
                      alt="img"
                      className="hidden object-cover rounded-2xl md:block pt-3 md:w-11/12 md:h-48 duration-200 group-hover:scale-105"
                    />
                    <h5 className="text-wrap text-xl text-stone-600 font-bold self-start pl-4 pt-2 group-hover:text-black">
                      {data.data[val].name}
                    </h5>
                    <div className="flex flex-row w-full justify-between pl-4 pr-2">
                      <div className="flex flex-row items-center space-x-3 pt-2">
                        <FontAwesomeIcon className="" icon={faClock} />
                        <strong className="pr-3 text-stone-600 group-hover:text-black">{`${data.data[val].averageTime} mins`}</strong>
                      </div>
                      <div className="flex flex-row items-center space-x-3 pt-2">
                        <FontAwesomeIcon className="" icon={faStar} />
                        <strong className="pr-3 text-stone-600 group-hover:text-black">{`${data.data[val].averageRating}`}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Image */}
                  <img
                    src={`https://culinaryapp.onrender.com/imagesSmall/${data.data[val].img}`}
                    alt="img"
                    className="md:hidden object-cover h-80 rounded-xl"
                  />

                  {/* Item Gradient */}
                  <div
                    className={`hidden md:block absolute top-[29px] bottom-0 right-[95px] rounded-2xl
            bg-gradient-to-b from-transparent to-gray-900  w-[355px] h-[185px] md:opacity-10
            group-hover:from-gray-50 group-hover:to-white group-hover:scale-105
            group-hover:opacity-70`}
                  ></div>
                </Link>
              </div>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
      {/* Div to add some space */}
      <div className="h-8"></div>
    </>
  );
}

export default Home;
