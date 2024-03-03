import { useContext, useEffect } from "react";
import RecipeContext from "../context/Recipes/RecipeContext";
import Spinner from "../components/Spinner";
import TagItem from "../components/TagItem";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

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
      <h1 className="mb-8 text-4xl font-bold my-6 text-cyan-700 text-center">
        Dom's Cullinary Craft
      </h1>
      {/* Input and SVG Container */}
      <div className="relative flex border-b mb-4">
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
      <div className="flex overflow-x-auto whitespace-nowrap space-x-2">
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

      <h5 className="text-3xl font-bold mt-12 mb-8 text-cyan-700 pl-3">
        Recommended
      </h5>

      <div className="flex overflow-x-auto whitespace-nowrap md:flex-row md:flex-wrap">
        {randomArr.map((val, index) => (
          <div key={index}>
            {data.data[val] ? (
              <div className="group relative overflow-hidden px-2 w-60 mb-4 md:flex md:flex-row md:flex-wrap md:px-8 md:w-96 md:h-80 md:mb-40">
                <Link
                  to={`recipes/${data.data[val]._id}`}
                  key={index}
                  className=""
                >
                  {/* Desktop Image */}
                  <img
                    src={`/${data.data[val].img}`}
                    alt="img"
                    className="hidden w-full h-full object-cover md:block duration-200 group-hover:scale-110"
                  />

                  {/* Mobile Image */}
                  <img
                    src={`/${data.data[val].img}`}
                    alt="img"
                    className="md:hidden object-cover h-80 rounded-xl"
                  />
                  {/* Info Container */}
                  <div className="flex flex-row w-11/12 mt-2 mb-4 justify-between">
                    <strong className="pr-3">{`${data.data[val].averageTime} mins`}</strong>
                  </div>

                  {/* Item Gradient */}
                  <div
                    className="hidden md:block absolute top-0 bottom-0 right-0 left-0 
            bg-gradient-to-b from-transparent to-gray-900
            group-hover:from-gray-50 group-hover:to-white
            group-hover:opacity-70"
                  ></div>

                  {/* Item text */}
                  <h5
                    className="hidden absolute duration-200 md:block md:bottom-8
              text-center text-cyan-700 font-bold 
            md:px-10 group-hover:scale-110 group-hover:text-black"
                  >
                    {data.data[val].name}
                  </h5>
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
