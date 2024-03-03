import { createContext, useReducer } from "react";
import recipeReducer from "./RecipeReducer";

const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  const initialState = {
    data: {},
    randomArr: [],
    isLoading: true,
  };

  const [state, dispatch] = useReducer(recipeReducer, initialState);
  const fetchRecipies = async (url = "/api/v1/recipes") => {
    try {
      const response = await fetch(url);
      const json = await response.json();

      dispatch({
        type: "SET_RECIPES",
        payload: json,
      });
      //   setData(json);
      //   setIsLoading(false);
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <RecipeContext.Provider
      value={{
        data: state.data,
        randomArr: state.randomArr,
        isLoading: state.isLoading,
        fetchRecipies,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export default RecipeContext;
