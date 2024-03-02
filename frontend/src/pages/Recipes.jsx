import { useContext, useEffect } from "react";
import RecipeContext from "../context/Recipes/RecipeContext";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function Recipies() {
  const { data, isLoading, fetchRecipies } = useContext(RecipeContext);

  useEffect(() => {
    fetchRecipies();
  }, []);

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <h2 className="mb-4 text-4xl font-bold my-6 text-cyan-700 text-center">
        Explore Recipes
      </h2>
      <div className="flex flex-row flex-wrap self-end justify-start h-full p-2 mb-24 text-gray-900">
        {data.count > 0 ? (
          data.data.map((recipe, index) => (
            // item
            <div className="group relative overflow-hidden px-2 w-1/2 mb-4 md:px-8">
              <Link to={`${recipe._id}`} key={index} className="">
                {/* Desktop Image */}
                <img
                  src={`/${recipe.img}`}
                  alt="img"
                  className="hidden h-1/2 w-full object-cover md:block duration-200 group-hover:scale-110"
                />

                {/* Mobile Image */}
                <img
                  src={`/${recipe.img}`}
                  alt="img"
                  className="md:hidden w-40 h-40 rounded-xl object-cover"
                />
                {/* Info Container */}
                <div className="flex flex-row w-11/12 mt-2 mb-4 justify-between">
                  <div
                    className="flex flex-row items-center space-x-2 bg-cyan-400 px-3 
                py-0.5 rounded-xl bg-opacity-70"
                  >
                    <FontAwesomeIcon icon={faStar} />
                    <p className="font-bold">{recipe.averageRating}</p>
                  </div>
                  <strong className="pr-3">{`${recipe.averageTime} mins`}</strong>
                </div>

                {/* Item Gradient */}
                <div
                  className="hidden md:block absolute top-0 bottom-0 right-0 left-0 
                bg-gradient-to-b from-transparent to-gray-900
                group-hover:from-gray-50 group-hover:to-white
                group-hover:opacity-70"
                ></div>

                {/* Item text */}
                <h5
                  className="hidden absolute duration-200 md:block md:bottom-8
                  text-center text-cyan-700 font-bold 
                md:px-10 group-hover:scale-110 group-hover:text-black"
                >
                  {recipe.name}
                </h5>
              </Link>
            </div>
          ))
        ) : (
          <Spinner />
        )}
      </div>
    </>
  );
}

export default Recipies;
