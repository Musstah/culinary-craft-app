import { useState, useEffect } from "react";

function Profile() {
  const [currentUser, setcurrentUser] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await fetch("/api/v1/auth/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OTdmNDI2Y2Q5OTRmYzQ4MmY0ZGQ4ZCIsImlhdCI6MTcwODA5MDQ4NiwiZXhwIjoxNzEwNjgyNDg2fQ.cT22Bb6V1zZeQHeYOE6N-Kz-5yACdcXUyvtB4BHYkW0`,
          },
        });
        const json = await response.json();
        setcurrentUser(json);
        console.log(currentUser);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCurrentUser();
  }, []);

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
