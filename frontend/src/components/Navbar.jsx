import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useContext } from "react";
import RecipeContext from "../context/Recipes/RecipeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUsers,
  faBowlFood,
} from "@fortawesome/free-solid-svg-icons";

import React from "react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const { fetchRecipiesByQuery } = useContext(RecipeContext);

  const currentPath = window.location.pathname;

  // User Scroll For Navbar
  function userScroll() {
    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        navbar.classList.add("bg-[#e5e5e5]");
        navbar.classList.add("bg-opacity-70");
      } else {
        navbar.classList.remove("bg-[#e5e5e5]");
        navbar.classList.remove("bg-opacity-70");
      }
    });
  }

  const pathMatchRoute = (route) => {
    if (route === location.pathname) {
      return true;
    }
  };

  const onChange = (value) => {
    const query = `name=${value}`;
    fetchRecipiesByQuery(query);
  };

  useEffect(() => {
    userScroll();
  }, []);

  return (
    <footer
      className="navbar transition-all duration-500 fixed bottom-0 right-0 z-50 mx-auto w-full h-20
    md:mx-0 md:top-0 md:right-0"
    >
      <nav className="flex justify-end md:mt-2">
        <ul
          className={`grid max-w-lg gap-12 grid-cols-3 md:mr-28 ${
            currentPath.endsWith("/recipes") ? "md:grid-cols-4" : ""
          } font-medium justify-center`}
        >
          <li
            className={
              pathMatchRoute("/")
                ? "navigate-btn text-[#0081a7]"
                : "navigate-btn"
            }
            onClick={() => navigate("/")}
          >
            {" "}
            <FontAwesomeIcon
              icon={faHouse}
              className={
                pathMatchRoute("/")
                  ? "navigate-icon text-[#0081a7]"
                  : "navigate-icon"
              }
            />
            <p>Main Page</p>
          </li>
          <li
            className={
              currentPath.startsWith("/recipes")
                ? "navigate-btn text-[#0081a7]"
                : "navigate-btn"
            }
            onClick={() => navigate("/recipes")}
          >
            {" "}
            <FontAwesomeIcon
              icon={faBowlFood}
              className={
                currentPath.startsWith("/recipes")
                  ? "navigate-icon text-neutral-400"
                  : "navigate-icon"
              }
            />
            <p>Recipes</p>
          </li>
          <li
            className={
              pathMatchRoute("/profile") ||
              pathMatchRoute("/sign-in") ||
              pathMatchRoute("/sign-up")
                ? "navigate-btn text-neutral-400"
                : "navigate-btn"
            }
            onClick={() => navigate("/profile")}
          >
            {" "}
            <FontAwesomeIcon
              icon={faUsers}
              className={
                pathMatchRoute("/profile") ||
                pathMatchRoute("/sign-in") ||
                pathMatchRoute("/sign-up")
                  ? "navigate-icon text-neutral-400"
                  : "navigate-icon"
              }
            />
            <p>Profile</p>
          </li>
          <li>
            <div
              className={`relative hidden ${
                currentPath.endsWith("/recipes") ? "md:flex" : ""
              }  border-b mb-4 md:mt-1.5`}
            >
              <input
                type="text"
                className="mx-2 px-2 pb-1 w-full h-10 bg-stone-100 rounded-md focus:shadow-md border-none md:w-80 
          placeholder:font-thin focus:outline-none"
                placeholder="Search"
                onChange={(e) => {
                  onChange(e.target.value);
                }}
              />
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute w-8 text-gray-300 duration-200 hover:scale-110 right-4 bottom-1 md:left-44"
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
          </li>
        </ul>
      </nav>
    </footer>
  );
}

export default Navbar;
