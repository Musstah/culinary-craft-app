import { useContext } from "react";
import RecipeContext from "../context/Recipes/RecipeContext";
import { useNavigate } from "react-router-dom";

function TagItem(props) {
  const { data, fetchRecipies } = useContext(RecipeContext);
  const rotate = `rotate-[${props.deg}deg]`;

  const navigate = useNavigate();

  const onClick = () => {
    // fetchRecipies(`{{URL}}/api/v1/recipes?tags=Pizza` ``)
    navigate("/recipes");
  };

  return (
    <button
      className="relative flex flex-col justify-end flex-grow-0 flex-shrink-0 flex-basis-0 w-24 h-24 rounded-2xl 
    bg-gradient-to-br from-stone-50 via-stone-200 to-stone-100 my-6 mx-2 shadow-lg
    text-center"
      onClick={onClick}
    >
      <img
        src={`/${props.name}Tag.png`}
        alt="img"
        className={`absolute md:hidden object-cover ${rotate} rounded-xl w-4/6 h-4/6 -right-1 -top-1`}
      />
      <strong className="self-bottom pb-2 capitalize">{props.name}</strong>
    </button>
  );
}

export default TagItem;
