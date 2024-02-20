import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";

function Recipies() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecipies = async () => {
      try {
        const response = await fetch("/api/v1/recipes");
        const json = await response.json();
        setData(json);
        setIsLoading(false);
        // console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRecipies();
  }, []);

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <h1 className="mb-4 text-4xl font-extrabold leading-none dark:text-white text-center">
        Explore Recipes
      </h1>
      <div>
        {data.count > 0
          ? data.data.map((recipe, index) => (
              <Link to={`${recipe._id}`} key={index}>
                {recipe.name}
              </Link>
            ))
          : ""}
      </div>
    </>
  );
}

export default Recipies;
