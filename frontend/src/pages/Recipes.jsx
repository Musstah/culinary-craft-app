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
        <h5 className="pl-3 mt-12 mb-8 font-serif text-5xl font-bold tracking-wide md:text-8xl md:ml-16 md:mt-20 md:mb-12 dark:text-stone-100">
          Explore recipes
        </h5>
        <div className="relative border-b w-80 h-8 mb-4 md:ml-16 md:mt-1.5">
          <input
            type="text"
            className="w-full h-10 px-2 pb-1 mx-2 border-none rounded-md bg-stone-100 focus:shadow-md md:w-80 placeholder:font-thin focus:outline-none"
            placeholder="Search"
            onChange={(e) => {
              onChange(e.target.value);
            }}
          />
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-0 right-0 w-8 text-gray-300 duration-200 hover:scale-110"
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
        <div className="relative flex mb-4 border-b"></div>
        <div className="flex space-x-2 overflow-x-auto whitespace-nowrap md:space-x-6 md:ml-16">
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
      {/* <div className="relative flex mb-4 border-b md:hidden">
        <input
          type="text"
          className="w-full h-10 px-2 pb-1 mx-2 border-none rounded-md bg-stone-100 focus:shadow-md md:w-80 placeholder:font-thin focus:outline-none"
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

      <div className="flex flex-row flex-wrap self-end justify-start p-2 mb-4 text-gray-900 bg-opacity-50 bg-slate-200 md:bg-transparent md:mt-4 md:max-h-fit">
        {data.count > 0 ? (
          data.data.map((recipe, index) => (
            // item
            <div
              className={`group relative overflow-hidden px-2 w-1/2 mb-4 md:w-1/4 md:px-12 ${
                index === data.count - 1 ? "pb-20" : ""
              }`}
            >
              <Link to={`${recipe._id}`} key={index} className="">
                <div className="flex-col items-center hidden h-full md:flex w-96 rounded-2xl bg-slate-50 dark:bg-black">
                  {/* Desktop Image */}
                  <img
                    src={`/imagesSmall/${recipe.img}`}
                    alt="img"
                    className="hidden object-cover pt-3 duration-200 rounded-2xl md:block md:w-11/12 md:h-48 group-hover:scale-105"
                  />
                  <a className="self-start pt-2 pl-4 font-sans text-lg font-bold leading-relaxed text-wrap text-stone-600 dark:text-stone-100 ">
                    {recipe.name}
                  </a>
                  <div className="flex flex-row justify-between w-full pb-8 pl-4 pr-2">
                    <div className="flex flex-row items-center pt-2 space-x-3 font-sans leading-relaxed">
                      <FontAwesomeIcon
                        className="dark:text-stone-100"
                        icon={faClock}
                      />
                      <strong className="pr-3 text-stone-600 dark:text-stone-100 ">{`${recipe.averageTime} mins`}</strong>
                    </div>
                    <div className="flex flex-row items-center pt-2 space-x-3 font-sans leading-relaxed">
                      <FontAwesomeIcon
                        className="text-amber-300"
                        icon={faStar}
                      />
                      <strong className="pr-3 text-stone-600 dark:text-stone-100 ">{`${recipe.averageRating}`}</strong>
                    </div>
                  </div>
                </div>

                {/* Mobile Image */}
                <img
                  src={`/imagesSmall/${recipe.img}`}
                  alt="img"
                  className="object-cover w-40 h-40 md:hidden rounded-xl"
                />
                {/* Info Container */}
                <div className="flex flex-row justify-between w-11/12 mt-2 mb-4 md:hidden">
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
                  className="absolute top-0 bottom-0 left-0 right-0 hidden md:block bg-gradient-to-b from-transparent to-gray-900 group-hover:from-gray-50 group-hover:to-white group-hover:opacity-70"
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
