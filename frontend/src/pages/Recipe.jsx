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
          className="w-full h-64 object-cover md:w-1/2 md:h-96 md:mt-24 md:rounded-3xl"
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

        <div className="flex flex-col h-full grow pt-4 md:w-1/2 md:rounded-3xl space-y-3 bg-[#f5ebe0] bg-opacity-70">
          <h2 className="text-2xl font-bold px-8 text-black text-center">
            {recipeData.data.name}
          </h2>
          <div className="flex flex-row justify-between items-center px-6">
            <div className="flex flex-col  items-center">
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
            <div className="flex flex-col items-center">
              <strong>Rating</strong>
              <p>{recipeData.data.averageRating}</p>
            </div>
            <div className="flex flex-col">
              <FontAwesomeIcon className="mb-1" icon={faClock} />
              <p>{`${recipeData.data.averageTime} mins`}</p>
            </div>
          </div>

          {/* Horizontal Line */}
          <div className="w-11/12 border-b border-zinc-400 opacity-50 mx-auto"></div>

          {/* Description and igredients div */}

          <div className="flex flex-col pt-2 px-6 space-y-1 items-start">
            <p className="text-xl font-bold pb-2">Description</p>
            <p className="font-thin text-black text-center overflow-y-auto md:px-32">
              {recipeData.data.instructions}
            </p>
            <p className="text-xl py-2 font-bold">Ingredients:</p>
            {Object.entries(recipeData.data.ingredients).map(
              ([ingredient, value], index) => (
                <p className="text-black" key={index}>
                  <strong>{ingredient}:</strong> {value}
                </p>
              )
            )}
          </div>
          {/* Div to add some space */}
          <div className="h-8 mb-24 md:mb-2"></div>
        </div>
      </div>
    </>
  ) : (
    ""
  );
}

export default Recipe;
