import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Spinner from "../components/Spinner";

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
        <>
          <p>
            {`User ID: ${currentUser.data._id}`}
            <br></br>
          </p>
          <p>
            {`User Name: ${currentUser.data.name}`}
            <br></br>
          </p>
          <p>
            {`User Email: ${currentUser.data.email}`}
            <br></br>
          </p>
          <button onClick={logOut}>LogOut Button</button>
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
}

export default Profile;
