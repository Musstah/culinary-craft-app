import { useContext, useEffect } from "react";
import RecipeContext from "../context/Recipes/RecipeContext";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import TagItem from "../components/TagItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faClock } from "@fortawesome/free-solid-svg-icons";

function Recipies() {
  const { data, isLoading, fetchRecipies, fetchRecipiesByQuery } =
    useContext(RecipeContext);

  const onChange = (value) => {
    const query = `name=${value}`;
    fetchRecipiesByQuery(query);
  };

  useEffect(() => {
    if (Object.keys(data).length === 0) {
      fetchRecipies();
    }
  }, []);

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <section className="">
        <h5 className="text-5xl md:text-7xl mt-12 mb-8 pl-3 md:ml-16 md:mt-24 md:mb-8">
          Explore recipes
        </h5>
        <div className="relative border-b w-80 h-8 mb-4 md:ml-16 md:mt-1.5">
          <input
            type="text"
            className="mx-2 px-2 pb-1 w-full h-10 bg-stone-100 rounded-md focus:shadow-md border-none md:w-80 
          placeholder:font-thin focus:outline-none"
            placeholder="Search"
            onChange={(e) => {
              onChange(e.target.value);
            }}
          />
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute w-8 text-gray-300 duration-200 hover:scale-110 right-0 top-0"
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
        {/* Input and SVG Container */}
        <div className="relative flex border-b mb-4"></div>
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
      </section>
      {/* Input and SVG Container */}
      {/* <div className="relative md:hidden flex border-b mb-4">
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
      </div> */}

      <div className="flex flex-row flex-wrap self-end justify-start bg-slate-200 bg-opacity-50 md:bg-transparent p-2 mb-4 md:mt-4 text-gray-900 md:max-h-fit">
        {data.count > 0 ? (
          data.data.map((recipe, index) => (
            // item
            <div
              className={`group relative overflow-hidden px-2 w-1/2 mb-4 md:w-1/4 md:px-12 ${
                index === data.count - 1 ? "pb-20" : ""
              }`}
            >
              <Link to={`${recipe._id}`} key={index} className="">
                <div className="hidden md:flex flex-col w-96 h-full items-center rounded-2xl bg-slate-50">
                  {/* Desktop Image */}
                  <img
                    src={`/imagesSmall/${recipe.img}`}
                    alt="img"
                    className="hidden object-cover rounded-2xl md:block pt-3 md:w-11/12 md:h-48 duration-200 group-hover:scale-105"
                  />
                  <h5 className="text-wrap text-xl text-stone-600 font-bold self-start pl-4 pt-2 group-hover:text-black">
                    {recipe.name}
                  </h5>
                  <div className="flex flex-row w-full justify-between pl-4 pr-2 pb-8">
                    <div className="flex flex-row items-center space-x-3 pt-2">
                      <FontAwesomeIcon className="" icon={faClock} />
                      <strong className="pr-3 text-stone-600 group-hover:text-black">{`${recipe.averageTime} mins`}</strong>
                    </div>
                    <div className="flex flex-row items-center space-x-3 pt-2">
                      <FontAwesomeIcon
                        className="text-amber-300"
                        icon={faStar}
                      />
                      <strong className="pr-3 text-stone-600 group-hover:text-black">{`${recipe.averageRating}`}</strong>
                    </div>
                  </div>
                </div>

                {/* Mobile Image */}
                <img
                  src={`/imagesSmall/${recipe.img}`}
                  alt="img"
                  className="md:hidden w-40 h-40 rounded-xl object-cover"
                />
                {/* Info Container */}
                <div className="flex md:hidden flex-row w-11/12 mt-2 mb-4 justify-between">
                  <div
                    className="flex flex-row items-center space-x-2 bg-slate-50 px-3 
                py-0.5 rounded-xl bg-opacity-70"
                  >
                    <FontAwesomeIcon icon={faStar} />
                    <p className="font-bold">{recipe.averageRating}</p>
                  </div>
                  <strong className="pr-3">{`${recipe.averageTime} mins`}</strong>
                </div>

                {/* Item Gradient */}
                {/* <div
                  className="hidden md:block absolute top-0 bottom-0 right-0 left-0 
                bg-gradient-to-b from-transparent to-gray-900
                group-hover:from-gray-50 group-hover:to-white
                group-hover:opacity-70"
                ></div> */}
              </Link>
            </div>
          ))
        ) : (
          <Spinner />
        )}
      </div>
      {/* Div to add some space */}
    </>
  );
}

export default Recipies;
