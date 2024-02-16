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

  const pathMatchRoute = (route) => {
    if (route === location.pathname) {
      return true;
    }
  };

  return (
    <footer className="fixed bottom-8 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
      <nav>
        <ul className="grid h-full max-w-lg grid-cols-3 mx-auto font-medium">
          <li
            className={
              pathMatchRoute("/")
                ? "m-5 mb-15 items-center flex flex-col text-neutral-400"
                : "m-5 mb-15 items-center flex flex-col"
            }
            onClick={() => navigate("/")}
          >
            {" "}
            <FontAwesomeIcon
              icon={faHouse}
              className={
                pathMatchRoute("/")
                  ? "text-2xl w-10 text-neutral-400"
                  : "text-2xl w-10"
              }
            />
            <p>Main Page</p>
          </li>
          <li
            className={
              pathMatchRoute("/recipes")
                ? "m-5 mb-15 items-center flex flex-col text-neutral-400"
                : "m-5 mb-15 items-center flex flex-col"
            }
            onClick={() => navigate("/recipes")}
          >
            {" "}
            <FontAwesomeIcon
              icon={faBowlFood}
              className={
                pathMatchRoute("/recipes")
                  ? "text-2xl w-10 text-neutral-400"
                  : "text-2xl w-10"
              }
            />
            <p>Recipes</p>
          </li>
          <li
            className={
              pathMatchRoute("/profile") ||
              pathMatchRoute("/sign-in") ||
              pathMatchRoute("/sign-up")
                ? "m-5 mb-15 items-center flex flex-col text-neutral-400"
                : "m-5 mb-15 items-center flex flex-col"
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
                  ? "text-2xl w-10 text-neutral-400"
                  : "text-2xl w-10"
              }
            />
            <p>Profile</p>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

export default Navbar;
