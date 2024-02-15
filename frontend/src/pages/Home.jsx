import { useState, useEffect } from "react";

function Home() {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch("/api/v1/recipes");
        // setData(response.json());
        const json = await response.json();
        setData(json);
        // console.log(json.data[1].name);
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
          ? data.data.map((recipe, index) => <p key={index}>{recipe.name}</p>)
          : ""}
      </div>
    </>
  );
}

export default Home;
