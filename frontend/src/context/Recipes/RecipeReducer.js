const getRandomArray = (max) => {
  const randomArr = [];
  while (randomArr.length < 8) {
    const tempVal = Math.floor(Math.random() * max);
    if (!randomArr.includes(tempVal)) {
      randomArr.push(tempVal);
    }
  }
  return randomArr;
};

const recipeReducer = (state, action) => {
  switch (action.type) {
    case "SET_RECIPES":
      return {
        ...state,
        data: action.payload,
        randomArr: getRandomArray(action.payload.count),
        isLoading: false,
      };
    default:
      return state;
  }
};

export default recipeReducer;
