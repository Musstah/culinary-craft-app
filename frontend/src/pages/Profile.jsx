import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function Profile() {
  const { currentUser, logOutUser, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/sign-in");
    }
  }, [localStorage.getItem("token")]);

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch({ type: "SET_TOKEN", payload: null });
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
        "No User"
      )}
    </>
  );
}

export default Profile;
