import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import AuthContext from "../context/AuthContext";

function Profile() {
  const { currentUser, logOutUser } = useContext(AuthContext);

  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const logOut = () => {
    localStorage.removeItem("token");
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
