import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faClock,
  faTrash,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import AuthContext from "../context/AuthContext";

function Recipe() {
  const { recipeId } = useParams();
  const [recipeData, setRecipeData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`/api/v1/recipes/${recipeId}`);
        const json = await response.json();
        setRecipeData(json);
        setIsLoading(false);
        // console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRecipe();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return recipeData ? (
    <>
      <div className="relative flex flex-col items-center mb-2">
        <img
          src={`/${recipeData.data.img}`}
          alt="img"
          className="object-cover w-full h-64 md:w-1/2 md:h-96 md:mt-24 md:rounded-3xl"
        />
        <div className="absolute flex flex-row space-x-2 top-2 right-2 md:top-28 md:right-1/4 md:mr-4">
          <button
            type="button"
            class={`${
              currentUser === null || currentUser.data.role !== "admin"
                ? "hidden"
                : ""
            } text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 
            focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-3.5 
            py-1 text-center me-2 mb-2`}
            onClick={() => {
              console.log(
                `User: ${currentUser.data.name} is deleting: ${recipeData.data.name}`
              );
            }}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
          <button
            type="button"
            class={`${
              currentUser === null || currentUser.data.role !== "admin"
                ? "hidden"
                : ""
            } text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 
            focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm 
            px-3.5 py-1 text-center me-2 mb-2`}
            onClick={() => {
              console.log(
                `User: ${currentUser.data.name} is editting: ${recipeData.data.name}`
              );
            }}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </div>
        {/* <img
          src="/backgroundFoodAround.png"
          alt="img"
          className="absolute top-80 w-full h-full object-cover md:w-1/2 md:mt-24 md:rounded-3xl rounded-t-[30px]"
        /> */}

        <div className="flex flex-col w-full h-full pt-4 space-y-3 grow md:w-1/2 md:rounded-3xl">
          <h2 className="w-full font-serif text-4xl font-bold tracking-wide text-center md:w-4/6 md:text-start md:text-5xl dark:text-stone-300">
            {recipeData.data.name}
          </h2>
          <div className="flex flex-row items-center justify-between font-sans text-lg md:text-xl dark:text-gray-300">
            <div className="flex items-center space-x-2">
              {recipeData.data.level === "Expert" ? (
                <div className="flex flex-row mb-1">
                  <FontAwesomeIcon className="text-amber-300" icon={faStar} />
                  <FontAwesomeIcon className="text-amber-300" icon={faStar} />
                  <FontAwesomeIcon className="text-amber-300" icon={faStar} />
                </div>
              ) : recipeData.data.level === "Intermediate" ? (
                <div className="flex flex-row mb-1">
                  <FontAwesomeIcon className="text-amber-300" icon={faStar} />
                  <FontAwesomeIcon className="text-amber-300" icon={faStar} />
                </div>
              ) : (
                <div className="flex flex-row mb-1">
                  <FontAwesomeIcon className="text-amber-300" icon={faStar} />
                </div>
              )}

              <p>{recipeData.data.level}</p>
            </div>
            <div className="flex items-center space-x-2 md:space-x-0 md:flex-col">
              <strong>Rating</strong>
              <p>{recipeData.data.averageRating}</p>
            </div>
            <div className="flex items-center space-x-2 ">
              <FontAwesomeIcon className="" icon={faClock} />
              <p>{`${recipeData.data.averageTime} mins`}</p>
            </div>
          </div>

          {/* Horizontal Line */}
          <div className="w-11/12 mx-auto border-b opacity-50 border-zinc-400 dark:border-gray-100"></div>

          {/* Description and igredients div */}

          <div className="flex flex-col justify-around gap-6 pt-8 text-center md:flex-row dark:text-stone-300">
            {/* INGREDIENTS */}
            <div className="md:w-1/2">
              <p className="py-4 font-serif text-4xl font-bold tracking-wide dark:text-stone-300">
                Ingredients
              </p>
              <ul className="px-8 space-y-2 font-sans text-lg text-left list-disc list-inside md:text-xl dark:text-stone-300">
                {Object.entries(recipeData.data.ingredients).map(
                  ([ingredient, value], index) => (
                    <li key={index}>
                      <strong className="capitalize dark:text-stone-300">
                        {ingredient}
                      </strong>
                      : {value}
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* INSTRUCTIONS */}
            <div className="md:w-1/2">
              <p className="pb-4 font-serif text-4xl font-bold tracking-wide dark:text-stone-300 ">
                Instructions
              </p>
              <p className="px-4 overflow-y-auto font-sans text-lg leading-relaxed text-justify md:text-2xl dark:text-stone-300 md:px-12">
                {recipeData.data.instructions}
              </p>
            </div>
          </div>
          {/* Div to add some space */}
          <div className="h-8 mb-24 md:mb-2"></div>
        </div>
      </div>
      <div className="h-20 md:hidden"></div>
    </>
  ) : (
    ""
  );
}

export default Recipe;
