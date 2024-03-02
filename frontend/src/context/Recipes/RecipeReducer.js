const recipeReducer = (state, action) => {
  switch (action.type) {
    case "SET_RECIPES":
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default recipeReducer;
