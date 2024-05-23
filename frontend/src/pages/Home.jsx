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
      <header className="header relative h-[100vh] flex flex-col justify-center gap-4 pl-4 xl:pl-[11rem] 2xl:pl-[22rem]">
        <h1 className="text-5xl xl:text-6xl text-[#00afb9]">Dom's Cullinary</h1>
        <p className="typing-text text-3xl xl:text-4xl font-bold"></p>

        {/* Input and SVG Container */}
        <div className="relative md:hidden flex border-b mb-4">
          <input
            type="text"
            className="mx-2 px-2 pb-1 w-full h-10 bg-stone-100 rounded-md focus:shadow-md border-none md:w-80 
      placeholder:font-thin focus:outline-none"
            placeholder="Search"
          />
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute w-8 text-gray-300 duration-200 hover:scale-110 right-4 bottom-1"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <circle cx="10" cy="10" r="7" />
              <line x1="21" y1="21" x2="15" y2="15" />
            </svg>
          </button>
        </div>

        <div className="social flex absolute gap-7 bottom-24 md:bottom-12 left-1/2 -translate-x-[50%]">
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
        <section className="main-page-recipes-section">
          <div className="flex justify-between mb-12">
            <h5 className="text-6xl mt-12 mb-8 pl-3 md:ml-44 md:mt-24 md:mb-0">
              Recommended
            </h5>
            <a
              href="/recipes"
              className="text-2xl mt-12 mb-8 pl-3 md:mr-64 md:mt-24 md:mb-0 hover:text-[#00afb9]"
            >
              View all recipes
            </a>
          </div>

          <div className="flex whitespace-nowrap mb-16 md:flex-row md:flex-wrap md:ml-28">
            {randomArr.map((val, index) => (
              <div key={index}>
                {data.data[val] ? (
                  <div
                    className={`group relative px-2 w-60 mb-4 md:flex md:flex-row md:flex-wrap md:px-20 md:pt-5 md:w-full md:h-full md:mb-8  ${
                      index > 5 ? "md:hidden" : ""
                    }`}
                  >
                    <Link
                      to={`recipes/${data.data[val]._id}`}
                      key={index}
                      className=""
                    >
                      <div className="hidden md:flex flex-col w-96 h-full items-center rounded-2xl bg-white">
                        {/* Desktop Image */}
                        <img
                          src={`/imagesSmall/${data.data[val].img}`}
                          alt="img"
                          className="hidden object-cover rounded-2xl md:block pt-3 md:w-11/12 md:h-48 duration-200 group-hover:scale-105"
                        />
                        <h4 className="text-wrap text-xl text-stone-600 font-bold self-start pl-4 pt-2 group-hover:text-black">
                          {data.data[val].name}
                        </h4>
                        <div className="flex flex-row w-full justify-between pl-4 pr-2">
                          <div className="flex flex-row items-center space-x-3 pt-2">
                            <FontAwesomeIcon className="" icon={faClock} />
                            <strong className="pr-3 text-stone-600 group-hover:text-black">{`${data.data[val].averageTime} mins`}</strong>
                          </div>
                          <div className="flex flex-row items-center space-x-3 pt-2">
                            <FontAwesomeIcon
                              className="text-amber-300"
                              icon={faStar}
                            />
                            <strong className="pr-3 text-stone-600 group-hover:text-black">{`${data.data[val].averageRating}`}</strong>
                          </div>
                        </div>
                      </div>

                      {/* Mobile Image */}
                      <img
                        src={`/imagesSmall/${data.data[val].img}`}
                        alt="img"
                        className="md:hidden object-cover h-80 rounded-xl"
                      />

                      {/* Item Gradient */}
                      <div
                        className={`hidden md:block absolute top-[29px] bottom-0 right-[95px] rounded-2xl
            bg-gradient-to-b from-transparent to-gray-900  w-[355px] h-[185px] md:opacity-10
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
      )}
      <section className="highest-rated-section mb-20">
        <a
          href={`recipes/${highestRated["_id"]}`}
          className="group flex md:flex-row justify-center items-center space-x-20"
        >
          <div className="flex flex-col max-w-md group-hover:text-stone-400">
            <h5 className="text-6xl mt-12 pl-3 md:mt-24">Highest rated!</h5>
            <div className="flex flex-row text-wrap items-center space-x-3 pt-2  md:pt-8">
              <FontAwesomeIcon className="text-amber-300 h-8" icon={faStar} />
              <strong className="pr-3">{highestRated["averageRating"]}</strong>
            </div>
            <h5 className="text-4xl my-4 pl-3 ">{highestRated["name"]}</h5>
            <p className="">{highestRated["instructions"]}</p>
          </div>
          <div>
            <img
              className="md:w-72 md:h-72 rounded-full"
              src={highestRated["img"]}
              alt=""
            />
          </div>
        </a>
      </section>
    </>
  );
}

export default Home;
