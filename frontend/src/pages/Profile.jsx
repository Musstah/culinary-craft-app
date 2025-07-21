import { useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Spinner from "../components/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBowlFood } from "@fortawesome/free-solid-svg-icons";

function Profile() {
  const { currentUser, logOutUser, fetchCurrentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCurrentUser();
    if (
      !localStorage.getItem("userLogged") ||
      localStorage.getItem("userLogged") === "false"
    ) {
      navigate("/sign-in");
    }
  }, []);

  const logOut = () => {
    logOutUser();
    navigate("/sign-in");
  };

  return (
    <>
      {currentUser ? (
        // Container Div
        <div className="flex flex-col items-center mx-2">
          <div className="flex flex-row items-center justify-between w-full md:my-10 md:ml-24 md:relative ">
            <h2 className="font-serif text-5xl font-bold tracking-wide text-stone-600 dark:text-stone-300">
              My Profile
            </h2>
          </div>

          {/* Horizontal Line */}
          <div className="w-11/12 mt-4 border-b opacity-50 border-zinc-500 md:mt-12 md:mb-14"></div>
          <div className="flex  min-w-[300px] min-h-[520px] flex-col items-center w-full mt-8 space-y-6 text-center border border-gray-300 md:w-1/4 bg-slate-50 dark:bg-neutral-950 dark:border-gray-700">
            <img
              className="object-cover w-48 h-48 mt-6 rounded-full"
              src={currentUser.data.image || "/avatar.jpg"}
              alt=""
            />

            <p className="mt-2 font-serif text-3xl font-bold tracking-wide md:mt-6 md:text-5xl text-stone-600 dark:text-stone-300">
              {currentUser.data.name}
            </p>
            <p className="font-serif text-xl font-bold tracking-wide md:text-2xl text-stone-600 dark:text-stone-300">
              {currentUser.data.email}
            </p>

            <div className="flex flex-col items-center w-5/6 space-y-6">
              <Link
                to="#"
                className="w-5/6 px-5 py-3 text-sm font-medium bg-white border border-gray-300 dark:border-0
                hover:bg-gray-100  focus:ring-gray-100 text-center dark:text-white 
          dark:bg-[#1f1f1f] hover:bg-[#24292F]/90
            focus:ring-4 focus:outline-none 
          focus:ring-[#2a2a2a]/50 rounded-lg  
          dark:focus:ring-[#2a2a2a]/50 dark:hover:bg-[#2a2a2a]/30 hover:-translate-y-0.5"
              >
                Edit Profile
              </Link>
              <Link
                to="#"
                className=" w-5/6 px-5 py-3 text-sm font-medium bg-white border border-gray-300 dark:border-0
                hover:bg-gray-100  focus:ring-gray-100 text-center dark:text-white 
          dark:bg-[#1f1f1f] hover:bg-[#24292F]/90
            focus:ring-4 focus:outline-none 
          focus:ring-[#2a2a2a]/50 rounded-lg  
          dark:focus:ring-[#2a2a2a]/50 dark:hover:bg-[#2a2a2a]/30 hover:-translate-y-0.5"
              >
                Add New Recipe
              </Link>
              <button
                onClick={logOut}
                to="/sign-up"
                className="w-5/6 px-5 py-3  text-sm font-medium bg-white border border-gray-300 dark:border-0
                hover:bg-gray-100  focus:ring-gray-100 text-center dark:text-white 
          dark:bg-[#1f1f1f] hover:bg-[#24292F]/90
            focus:ring-4 focus:outline-none 
          focus:ring-[#2a2a2a]/50 rounded-lg  
          dark:focus:ring-[#2a2a2a]/50 dark:hover:bg-[#2a2a2a]/30 hover:-translate-y-0.5"
              >
                Logout
              </button>
              {/* This div is to add margin on bottom */}
              <div className="h-2"></div>
            </div>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
}

export default Profile;
