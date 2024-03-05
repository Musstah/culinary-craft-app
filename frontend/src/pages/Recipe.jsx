import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faClock } from "@fortawesome/free-solid-svg-icons";

function Recipe() {
  const { recipeId } = useParams();
  const [recipeData, setRecipeData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
      <div className="flex flex-col items-center mb-2">
        <img
          src={`/${recipeData.data.img}`}
          alt="img"
          className="w-full h-96 object-cover md:w-1/2 md:mt-24 md:rounded-3xl"
        />

        <div className="flex flex-col pt-4 h-full md:w-1/2 space-y-3">
          <h2 className="text-2xl font-bold px-8 text-gray-900 text-center">
            {recipeData.data.name}
          </h2>
          <div className="flex flex-row justify-between items-center px-6">
            <div className="flex flex-col items-center">
              {recipeData.data.level === "Expert" ? (
                <div className="flex flex-row mb-1">
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                </div>
              ) : recipeData.data.level === "Intermediate" ? (
                <div className="flex flex-row mb-1">
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                </div>
              ) : (
                <div className="flex flex-row mb-1">
                  <FontAwesomeIcon icon={faStar} />
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
          <div className="flex flex-col px-6 space-y-1 items-start">
            {Object.entries(recipeData.data.ingredients).map(
              ([ingredient, value], index) => (
                <p className="text-slate-600" key={index}>
                  <strong>{ingredient}:</strong> {value}
                </p>
              )
            )}
            {/* Horizontal Line */}
            <div className="w-11/12 border-b border-zinc-400 opacity-50 mx-auto"></div>
            <p className="font-thin text-slate-700 text-center overflow-y-auto max-h-[180px]">
              {recipeData.data.instructions}
            </p>
          </div>
        </div>
      </div>
      {/* Div to add some space */}
      <div className="h-8"></div>
    </>
  ) : (
    ""
  );
}

export default Recipe;
