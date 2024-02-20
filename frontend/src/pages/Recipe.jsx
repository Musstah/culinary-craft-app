import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

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
      <p>Recipe with ID : {recipeId}</p>
      <p>Name : {recipeData.data.name}</p>
      <img
        src={`/${recipeData.data.img}`}
        alt="img"
        width="256px"
        height="256px"
      />
      {Object.entries(recipeData.data.ingredients).map(
        ([ingredient, value], index) => (
          <p key={index}>
            <strong>{ingredient}:</strong> {value}
          </p>
        )
      )}

      <h2>{recipeData.data.instructions}</h2>
    </>
  ) : (
    ""
  );
}

export default Recipe;
