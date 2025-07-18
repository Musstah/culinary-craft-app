import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FiMoon, FiSun } from "react-icons/fi";
import {
  faHouse,
  faUsers,
  faBowlFood,
} from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = window.location.pathname;

  const [darkMode, setDarkMode] = useState(false);

  // Check if we're on md breakpoint
  function isGreaterThanMd() {
    const breakpointDetector = document.getElementById("breakpoint-detector");
    return breakpointDetector.offsetParent !== null;
  }

  // User Scroll For Navbar
  function userScroll() {
    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {
      if (isGreaterThanMd() && window.scrollY > 850) {
        navbar.classList.add("bg-[#d6ccc2]");
        navbar.classList.add("bg-opacity-80");
        navbar.classList.add("dark:bg-opacity-80");
        navbar.classList.add("dark:bg-[#060606]");
      } else if (isGreaterThanMd() && window.scrollY < 850) {
        navbar.classList.remove("bg-[#d6ccc2]");
        navbar.classList.remove("bg-opacity-80");
        navbar.classList.remove("dark:bg-opacity-80");
        navbar.classList.remove("dark:bg-[#060606]");
      }
    });

    if (!isGreaterThanMd()) {
      navbar.classList.add("bg-slate-50");
    } else {
      navbar.classList.remove("bg-slate-50");
    }
  }

  const pathMatchRoute = (route) => {
    if (route === location.pathname) {
      return true;
    }
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    userScroll();
  }, []);

  return (
    <footer className="fixed bottom-0 right-0 z-50 w-full h-20 mx-auto transition-all duration-500 navbar md:mx-0 md:top-0 md:right-0">
      <div id="breakpoint-detector" class="hidden md:block"></div>
      <nav className="flex justify-center md:justify-end md:mt-2 dark:text-gray-100">
        <ul
          className={`grid max-w-lg gap-12 grid-cols-3 md:mr-28 font-medium justify-center`}
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
                  ? "navigate-icon text-[#0081a7]"
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
                ? "navigate-btn text-[#0081a7]"
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
                  ? "navigate-icon text-[#0081a7]"
                  : "navigate-icon"
              }
            />
            <p>Profile</p>
          </li>
          <li>
            <button onClick={() => setDarkMode(!darkMode)}>
              {/* {darkMode ? (
                <FiSun className="relative z-10 text-lg md:text-sm" />
              ) : (
                <FiMoon className="relative z-10 text-lg md:text-sm" />
              )} */}
            </button>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

export default Navbar;
