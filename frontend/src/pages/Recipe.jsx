import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Recipe() {
  const { recipeId } = useParams();
  const [recipeData, setRecipeData] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`/api/v1/recipes/${recipeId}`);
        const json = await response.json();
        setRecipeData(json);
        // console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRecipe();
  }, []);

  return (
    <>
      <p>Recipe with ID : {recipeData ? recipeId : ""}</p>
      <p>Name : {recipeData ? recipeData.data.name : ""}</p>
    </>
  );
}

export default Recipe;
