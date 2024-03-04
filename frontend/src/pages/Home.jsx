import { useContext, useEffect } from "react";
import RecipeContext from "../context/Recipes/RecipeContext";
import Spinner from "../components/Spinner";
import TagItem from "../components/TagItem";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

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
      <h1 className="mb-8 text-4xl font-bold my-6 text-cyan-700 text-center md:text-left md:ml-16">
        Dom's Cullinary Craft
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

      <h5 className="text-3xl font-bold mt-12 mb-8 text-cyan-700 pl-3 md:ml-16 md:mb-0">
        Recommended
      </h5>

      <div className="flex overflow-x-auto whitespace-nowrap md:flex-row md:flex-wrap md:space-x-48">
        {randomArr.map((val, index) => (
          <div key={index}>
            {data.data[val] ? (
              <div
                className={`group relative px-2 w-60 mb-4 md:flex md:flex-row md:flex-wrap md:px-10 md:pt-5 md:w-full md:h-full md:mb-20  ${
                  index === 0 ? "md:ml-48" : ""
                } ${index > 5 ? "md:hidden" : ""}`}
              >
                <Link
                  to={`recipes/${data.data[val]._id}`}
                  key={index}
                  className=""
                >
                  {/* Item Label */}
                  <div
                    className={`hidden md:block absolute top-8 bottom-0 right-12
                    bg-gradient-to-br from-sky-50 via-sky-100 to-sky-200 my-6 mx-2 md:rounded-r-full md:w-96 md:h-44 -z-10 ${
                      index === 0 ? "md:right-60" : ""
                    }`}
                  >
                    {/* Info Container */}
                    <div className="flex flex-col w-11/12  ml-4 mt-2 mb-4 text-left">
                      {/* Item text */}
                      <h5 className="hidden md:block text-wrap text-cyan-700 font-bold pr-48">
                        {data.data[val].name}
                      </h5>
                      <div className="flex flex-row items-center space-x-3">
                        <FontAwesomeIcon className="" icon={faClock} />
                        <strong className="pr-3">{`${data.data[val].averageTime} mins`}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Image */}

                  <img
                    src={`/${data.data[val].img}`}
                    alt="img"
                    className="hidden object-cover md:block md:w-60 md:h-60 md:rounded-full duration-200 group-hover:scale-110"
                  />

                  {/* Mobile Image */}
                  <img
                    src={`/${data.data[val].img}`}
                    alt="img"
                    className="md:hidden object-cover h-80 rounded-xl"
                  />

                  {/* Item Gradient */}
                  <div
                    className={`hidden md:block absolute top-5 bottom-0 right-10
            bg-gradient-to-b from-transparent to-gray-900 md:rounded-full md:w-60 md:h-60 md:opacity-10
            group-hover:from-gray-50 group-hover:to-white group-hover:scale-110
            group-hover:opacity-70 ${index === 0 ? "md:right-[232px]" : ""}`}
                  ></div>
                </Link>
              </div>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
