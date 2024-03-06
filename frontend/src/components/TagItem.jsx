import { useContext } from "react";
import RecipeContext from "../context/Recipes/RecipeContext";
import { useNavigate, useSearchParams, Link } from "react-router-dom";

function TagItem(props) {
  const { data, fetchRecipies } = useContext(RecipeContext);
  // const [searchParams, setSearchParams] = useSearchParams();
  const rotate = `rotate-[${props.deg}deg]`;

  const navigate = useNavigate();

  // setSearchParams({ tags: "Pizza" });

  return (
    <Link
      to={{
        pathname: "/recipes",
        search: "?tags=Pizza",
      }}
      className="relative flex flex-col justify-end flex-grow-0 flex-shrink-0 flex-basis-0 w-24 h-24 rounded-2xl 
    bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 my-6 mx-2 shadow-md
    text-center duration-200 hover:scale-110 hover:shadow-slate-500/50"
    >
      <img
        src={`/imagesSmall/${props.name}Tag.png`}
        alt="img"
        className={`absolute object-cover ${rotate} rounded-xl w-4/6 h-4/6 -right-1 -top-1 `}
      />
      <strong className="self-bottom pb-2 capitalize">{props.name}</strong>
    </Link>
  );
}

export default TagItem;
