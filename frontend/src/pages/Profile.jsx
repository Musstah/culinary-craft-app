import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function Profile() {
  const { currentUser } = useContext(AuthContext);

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
        </>
      ) : (
        "No User"
      )}
    </>
  );
}

export default Profile;
