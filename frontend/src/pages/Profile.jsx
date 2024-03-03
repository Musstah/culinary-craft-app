import { useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Spinner from "../components/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBowlFood } from "@fortawesome/free-solid-svg-icons";

function Profile() {
  const { currentUser, dispatch, logOutUser } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
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
          <div className="flex flex-row justify-between items-center w-full">
            <h2 className="mb-4 text-4xl font-bold my-6 text-cyan-700 text-center">
              My Profile
            </h2>
            <button
              className="h-10 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 
                to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 
                dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 
                font-medium rounded-lg text-sm px-5 mt-2 text-center me-2"
              onClick={logOut}
            >
              Logout
            </button>
          </div>

          {/* Horizontal Line */}
          <div className="w-11/12 border-b border-zinc-400 opacity-50 mt-8"></div>
          <div className="flex flex-row w-full justify-between items-center my-2">
            <p className="font-thin text-zinc-600 text-left pl-2">
              Personal Details
            </p>
            <Link to="#" className="font-thin text-sky-500 opacity-70 pr-5">
              Change
            </Link>
          </div>
          <div className="flex flex-col justify-center px-4 py-2 h-20 w-full rounded-2xl bg-sky-100">
            <p className="py-1 font-bold">{currentUser.data.name}</p>
            <p className="font-bold">{currentUser.data.email}</p>
          </div>
          <div className="flex flex-row mx-auto justify-center w-full mt-12">
            <Link
              to="#"
              className="flex items-center w-5/6 text-white bg-gradient-to-r from-teal-400 via-teal-500
                 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300
                  dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 
                  font-medium rounded-lg text-sm px-2 py-3 text-center me-2 mb-8"
            >
              <FontAwesomeIcon icon={faBowlFood} className="w-5 h-5" />
              <span className="flex-1 pr-4">Add a New Recipe</span>
            </Link>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
}

export default Profile;
