import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import AuthContext from "../context/AuthContext";

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const { dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((result) => {
        // console.log("Success", result);
        dispatch({ type: "SET_TOKEN", payload: result.token });
        localStorage.setItem("token", result.token);
        navigate("/profile");
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  return (
    <>
      <div className="page-container">
        <header>
          <p>Welcome Back!</p>
        </header>
        <main>
          <form onSubmit={onSubmit}>
            <input
              type="email"
              className="email"
              placeholder="Email"
              id="email"
              value={email}
              onChange={onChange}
            />
            <div className="password-input-div">
              <input
                type={showPassword ? "text" : "password"}
                className="password-input"
                placeholder="Password"
                id="password"
                value={password}
                onChange={onChange}
              />
              <FontAwesomeIcon
                icon={showPassword ? faEye : faEyeSlash}
                onClick={() => setShowPassword((prevState) => !prevState)}
              />
            </div>

            <Link to="/forgot-password">Forgot Password</Link>

            <div className="sign-in-bar">
              <button type="submit">Sign In Button</button>
            </div>
            <Link to="/sign-up">Sign Up</Link>
          </form>
        </main>
      </div>
    </>
  );
}

export default SignIn;
