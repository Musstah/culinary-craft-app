import { useContext, useEffect, useState } from "react";
import RecipeContext from "../context/Recipes/RecipeContext";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function Home() {
  const { data, isLoading, fetchRecipies } = useContext(RecipeContext);
  const [randomArr, setRandomArr] = useState([]);

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

  useEffect(() => {
    fetchRecipies();
    setRandomArr(getRandomArray(data.count));
  }, []);

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <h1 className="mb-4 text-4xl font-bold my-6 text-cyan-700 text-center">
        Dom's Cullinary Craft
      </h1>
      <div className="flex overflow-x-auto whitespace-nowrap space-x-2">
        {/* Tag Item 1 */}
        <div
          className="relative flex flex-col justify-end flex-grow-0 flex-shrink-0 flex-basis-0 w-24 h-24 rounded-2xl 
        bg-gradient-to-br from-stone-50 via-stone-200 to-stone-100 my-6 mx-2 shadow-lg
        text-center"
        >
          <img
            src="/pizzaTag.png"
            alt="img"
            className="absolute md:hidden object-cover rotate-[200deg] rounded-xl w-4/6 h-4/6 -right-1 -top-1"
          />
          <strong className="self-bottom pb-2">Pizza</strong>
        </div>
      </div>

      {/* ------------------------------------------------------- */}

      <div className="flex overflow-x-auto whitespace-nowrap">
        {randomArr.map((val, index) => (
          <div key={index}>
            {data.data[val] ? (
              <div className="group relative overflow-hidden px-2 w-60 mb-4 md:px-8">
                <Link
                  to={`recipes/${data.data[val]._id}`}
                  key={index}
                  className=""
                >
                  {/* Desktop Image */}
                  <img
                    src={`/${data.data[val].img}`}
                    alt="img"
                    className="hidden h-1/2 w-full object-cover md:block duration-200 group-hover:scale-110"
                  />

                  {/* Mobile Image */}
                  <img
                    src={`/${data.data[val].img}`}
                    alt="img"
                    className="md:hidden object-cover h-80 rounded-xl"
                  />
                  {/* Info Container */}
                  <div className="flex flex-row w-11/12 mt-2 mb-4 justify-between">
                    <strong className="pr-3">{`${data.data[val].averageTime} mins`}</strong>
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
                    {data.data[val].name}
                  </h5>
                </Link>
              </div>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
