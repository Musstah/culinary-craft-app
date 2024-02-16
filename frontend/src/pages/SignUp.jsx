import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <>
      <div className="page-container">
        <header>
          <p>Welcome Back!</p>
        </header>
        <main>
          <form>
            <input
              type="text"
              className="name"
              placeholder="Name"
              id="name"
              value={name}
              onChange={onChange}
            />
            <input
              type="email"
              className="email"
              placeholder="Email"
              id="email"
              value={email}
              onChange={onChange}
            />
            <div className="password-input-din">
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
              <p className="sign-in-text">Sign Up</p>
              <button></button>
            </div>
            <Link to="/sign-in">Sign In</Link>
          </form>
        </main>
      </div>
    </>
  );
}

export default SignUp;
