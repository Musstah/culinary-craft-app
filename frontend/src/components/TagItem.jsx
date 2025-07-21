import { useContext } from "react";
import RecipeContext from "../context/Recipes/RecipeContext";
import { useNavigate } from "react-router-dom";

function TagItem(props) {
  const { fetchRecipiesByQuery } = useContext(RecipeContext);
  // const [searchParams, setSearchParams] = useSearchParams();
  const rotate = `rotate-[${props.deg}deg]`;

  const navigate = useNavigate();

  const onCLick = () => {
    const tag = props.name[0].toUpperCase() + props.name.slice(1);
    const query = `tags=${tag}`;
    fetchRecipiesByQuery(query);
    navigate("/recipes");
  };

  return (
    <button
      className="relative flex flex-col justify-end flex-grow-0 flex-shrink-0 w-24 h-24 mx-2 my-6 text-center duration-200 shadow-md dark:text-stone-300 dark:text- bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 dark:from-stone-800 dark:via-stone-900 dark:to-stone-800 flex-basis-0 rounded-2xl hover:scale-110 hover:shadow-slate-500/50"
      onClick={() => {
        onCLick();
      }}
    >
      <img
        src={`/imagesSmall/${props.name}Tag.png`}
        alt="img"
        className={`absolute object-cover ${rotate} rounded-xl w-4/6 h-4/6 -right-1 -top-1 `}
      />
      <strong className="pb-2 capitalize self-bottom">{props.name}</strong>
    </button>
  );
}

export default TagItem;
