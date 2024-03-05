import { useNavigate, useLocation } from "react-router-dom";
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

  const currentPath = window.location.pathname;

  const pathMatchRoute = (route) => {
    if (route === location.pathname) {
      return true;
    }
  };

  return (
    <footer
      className="fixed bottom-0 right-0 z-50 mx-auto w-full h-20 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600
    md:top-6 md:mx-0 md:w-1/2 md:bg-transparent md:mt-2 md:pr-6"
    >
      <nav>
        <ul className="grid max-w-lg grid-cols-3 md:grid-cols-4 mx-auto font-medium justify-center">
          <li
            className={
              pathMatchRoute("/")
                ? "navigate-btn text-neutral-400"
                : "navigate-btn"
            }
            onClick={() => navigate("/")}
          >
            {" "}
            <FontAwesomeIcon
              icon={faHouse}
              className={
                pathMatchRoute("/")
                  ? "navigate-icon text-neutral-400"
                  : "navigate-icon"
              }
            />
            <p>Main Page</p>
          </li>
          <li
            className={
              currentPath.startsWith("/recipes")
                ? "navigate-btn text-neutral-400"
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
            <div className="relative hidden md:flex border-b mb-4 md:mt-1.5">
              <input
                type="text"
                className="mx-2 px-2 pb-1 w-full h-10 bg-stone-100 rounded-md focus:shadow-md border-none md:w-80 
          placeholder:font-thin focus:outline-none"
                placeholder="Search"
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
