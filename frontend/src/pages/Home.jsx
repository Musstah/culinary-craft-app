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
    while (randomArr.length < 3) {
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
      <div className="flex flex-row h-32 bg-red-400 mt-12 mb-12"></div>
      <div className="flex flex-row mt-40">
        {randomArr.map((val, index) => (
          <div key={index}>
            {data.data[val] ? (
              <div className="group relative overflow-hidden px-2 w-1/2 mb-4 md:px-8">
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
                    className="md:hidden w-40 h-40 rounded-xl object-cover"
                  />
                  {/* Info Container */}
                  <div className="flex flex-row w-11/12 mt-2 mb-4 justify-between">
                    <div
                      className="flex flex-row items-center space-x-2 bg-cyan-400 px-3 
            py-0.5 rounded-xl bg-opacity-70"
                    >
                      <FontAwesomeIcon icon={faStar} />
                      <p className="font-bold">
                        {data.data[val].averageRating}
                      </p>
                    </div>
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
