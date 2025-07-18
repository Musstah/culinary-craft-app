import { useContext, useEffect, useState, useRef } from "react";
import RecipeContext from "../context/Recipes/RecipeContext";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faClock } from "@fortawesome/free-solid-svg-icons";
import {
  faTwitter,
  faFacebook,
  faInstagram,
  faYoutube,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

function Home() {
  const { data, randomArr, isLoading, fetchRecipies } =
    useContext(RecipeContext);

  const hasRunOnce = useRef(false);

  const [highestRated, setHighestRated] = useState({});

  function runTypingEffect() {
    const text = "Lose Your Calories With Me...";
    const typingElement = document.querySelector(".typing-text");
    const typingDelay = 100;

    typeText(text, typingElement, typingDelay);
  }

  function typeText(text, typingElement, delay) {
    for (let i = 0; i < text.length; i++) {
      setTimeout(() => {
        typingElement.textContent += text.charAt(i);
      }, delay * i);
    }
  }

  function findHighestRated(data) {
    let highestRating = 0;
    let highestRatingIndex = 0;
    data.data.map((row, index) => {
      if (row["averageRating"] > highestRating) {
        highestRating = row["averageRating"];
        highestRatingIndex = index;
      }
    });
    // console.log(highestRating);
    // console.log(highestRatingIndex);
    setHighestRated(data.data[highestRatingIndex]);
  }

  useEffect(() => {
    if (!hasRunOnce.current) {
      fetchRecipies();

      const typingTextElement = document.querySelector(".typing-text");
      if (typingTextElement) {
        typingTextElement.textContent = "";
        runTypingEffect();
      }
      hasRunOnce.current = true;
    }
  }, []);

  useEffect(() => {
    if (!isLoading) {
      findHighestRated(data);
    }
  }, [isLoading]);

  return (
    <>
      <header className="header relative h-[100vh] flex flex-col md:justify-center gap-4 pl-4 xl:pl-[11rem] 2xl:pl-[22rem]">
        <h1 className="text-4xl mt-32 md:mt-0 md:text-5xl xl:text-6xl text-[#00afb9]">
          Dom's Cullinary
        </h1>

        <p className="text-xl font-bold typing-text md:text-3xl xl:text-4xl dark:text-gray-300"></p>

        <div className="social flex absolute gap-4 md:gap-7 bottom-8 md:bottom-12 left-1/2 -translate-x-[50%] dark:text-gray-100">
          <a href="#">
            <FontAwesomeIcon className="" icon={faTwitter} />
          </a>
          <a href="#">
            <FontAwesomeIcon className="" icon={faInstagram} />
          </a>
          <a href="#">
            <FontAwesomeIcon className="" icon={faFacebook} />
          </a>
          <a href="#">
            <FontAwesomeIcon className="" icon={faYoutube} />
          </a>
          <a href="#">
            <FontAwesomeIcon className="" icon={faGithub} />
          </a>
        </div>
      </header>

      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className="w-screen px-24 container-2xl">
            <section className="main-page-recipes-section">
              <div className="flex justify-between mt-20 mb-4">
                <a className="pl-4 font-serif text-3xl font-bold tracking-wide md:text-5xl dark:text-stone-100">
                  Recommended
                </a>
                <a
                  href="/recipes"
                  className="hidden md:block text-2xl pr-20 dark:text-gray-100 hover:text-[#00afb9] dark:hover:text-[#00afb9] "
                >
                  View all recipes
                </a>
              </div>

              <div className="flex gap-6 overflow-x-auto whitespace-nowrap md:overflow-hidden md:flex-row md:flex-wrap">
                {randomArr.map((val, index) => (
                  <div key={index}>
                    {data.data[val] ? (
                      <div
                        className={`group relative px-2 w-60 mb-4 md:flex md:flex-row md:flex-wrap md:pt-5 md:w-full md:h-full md:mb-8`}
                      >
                        <Link
                          to={`recipes/${data.data[val]._id}`}
                          key={index}
                          className=""
                        >
                          <div className="flex-col items-center hidden h-full bg-white dark:bg-black md:flex w-96 rounded-2xl">
                            {/* Desktop Image */}
                            <img
                              src={`/imagesSmall/${data.data[val].img}`}
                              alt="img"
                              className="hidden object-cover pt-3 duration-200 rounded-2xl md:block md:w-11/12 md:h-48 group-hover:scale-105"
                            />
                            <h4 className="self-start pt-2 pl-4 font-sans text-lg font-bold leading-relaxed text-wrap text-stone-600 dark:text-stone-100 ">
                              {data.data[val].name}
                            </h4>
                            <div className="flex flex-row justify-between w-full pl-4 pr-2 font-bold leading-relaxed text-wrap text-stone-600 dark:text-stone-100">
                              <div className="flex flex-row items-center pt-2 space-x-3">
                                <FontAwesomeIcon className="" icon={faClock} />
                                <strong className="pr-3 text-stone-600 dark:text-gray-100 ">{`${data.data[val].averageTime} mins`}</strong>
                              </div>
                              <div className="flex flex-row items-center pt-2 space-x-3 font-sans leading-relaxed">
                                <FontAwesomeIcon
                                  className="text-amber-300"
                                  icon={faStar}
                                />
                                <strong className="pr-3 text-stone-600 dark:text-gray-100 ">{`${data.data[val].averageRating}`}</strong>
                              </div>
                            </div>
                          </div>

                          {/* Mobile Image */}
                          <img
                            src={`/imagesSmall/${data.data[val].img}`}
                            alt="img"
                            className="object-cover md:hidden h-80 rounded-xl"
                          />

                          {/* Item Gradient */}
                          <div
                            className={`hidden dark:hidden md:block absolute top-[0px] right-[0px] rounded-2xl
            bg-gradient-to-b from-transparent to-gray-900  w-[100%] h-[185px] md:opacity-10
            group-hover:from-gray-50 group-hover:to-white group-hover:scale-105
            group-hover:opacity-70`}
                          ></div>
                        </Link>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                ))}
              </div>
            </section>

            <section className="my-12 highest-rated-section md:my-32 md:mb-10">
              <div className="flex flex-col justify-between md:flex-row md:items-center">
                <div className="flex flex-col w-1/3 space-y-8">
                  <div className="flex flex-row items-center space-x-8">
                    <h5 className="font-serif text-5xl font-bold tracking-wide dark:text-stone-100">
                      Highest rated!
                    </h5>
                    <div className="flex flex-row items-center space-x-3 text-wrap">
                      <FontAwesomeIcon
                        className="h-8 text-amber-300"
                        icon={faStar}
                      />
                      <strong className="font-serif font-bold tracking-wide md:text-5xl dark:text-stone-100">
                        {highestRated["averageRating"]}
                      </strong>
                    </div>
                  </div>

                  <a className="font-serif text-3xl font-bold tracking-wide md:text-5xl dark:text-stone-100">
                    {highestRated["name"]}
                  </a>
                  <p className="overflow-y-auto font-sans text-lg leading-relaxed text-justify md:text-2xl dark:text-stone-300 md:pr-32">
                    {highestRated["instructions"]}
                  </p>
                  {/* Mobile img */}
                  <img
                    className="object-cover h-64 rounded-lg md:hidden w-96"
                    src={highestRated["img"]}
                    alt=""
                  />
                  <Link
                    to={`recipes/${highestRated["_id"]}`}
                    type="button"
                    className="bg-gradient-to-r from-[#e3d5ca] via-[#e3d5ca] to-[#d6ccc2]
    hover:from-[#d6ccc2] hover:via-[#cdbba7] hover:to-[#b6a48a]
    hover:shadow-lg hover:shadow-[#bfae9b]/60
    transition-all duration-300 ease-in-out
    hover:scale-105
    font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-4 w-1/4"
                  >
                    View Recipe
                  </Link>
                </div>

                {/* Desktop img */}
                <div className="items-center justify-center hidden md:flex w-[50%]">
                  <img
                    className="object-cover rounded-full aspect-square"
                    src={highestRated["img"]}
                    alt=""
                  />
                </div>
              </div>
            </section>
            <div className="h-40 md:hidden"></div>
          </div>
        </>
      )}
    </>
  );
}

export default Home;
