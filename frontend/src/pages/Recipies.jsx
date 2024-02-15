import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Recipies() {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch("/api/v1/recipes");
        const json = await response.json();
        setData(json);
        // console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRecipe();
  }, []);

  return (
    <>
      <h1 className="mb-4 text-4xl font-extrabold leading-none dark:text-white text-center">
        Dom's Cullinary Craft
      </h1>
      <div>
        {data.count > 0
          ? data.data.map((recipe, index) => (
              <Link to={`/api/v1/recipes/${recipe._id}`} key={index}>
                {recipe.name}
              </Link>
            ))
          : ""}
      </div>
    </>
  );
}

export default Recipies;
