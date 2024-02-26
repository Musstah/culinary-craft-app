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

  const { dispatch, fetchCurrentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    fetchCurrentUser();
    const result = await response.json();

    if (response.ok) {
      localStorage.setItem("userLogged", "true");
      navigate("/profile");
    }
  };

  return (
    <>
      <div>
        <header></header>
        <main className="page-container flex flex-col items-center justify-center">
          <h2>Welcome Back!</h2>
          <form onSubmit={onSubmit}>
            <div className="flex flex-row items-center mb-12 mt-4">
              <input
                type="email"
                className="p-2 border border-gray-300 rounded-md"
                placeholder="Email"
                id="email"
                value={email}
                onChange={onChange}
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="p-2 border border-gray-300 rounded-md"
                  placeholder="Password"
                  id="password"
                  value={password}
                  onChange={onChange}
                />
                <FontAwesomeIcon
                  icon={showPassword ? faEye : faEyeSlash}
                  onClick={() => setShowPassword((prevState) => !prevState)}
                  className="absolute right-2 top-3 cursor-pointer"
                />
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <Link to="/forgot-password">Forgot Password</Link>
            </div>

            <div className="flex flex-col items-center justify-center">
              <div className="flex flex-col absolute top-60">
                <button type="submit">Sign In Button</button>

                <buttorn to="/sign-up" className="my-4">
                  Sign Up Instead
                </buttorn>
              </div>
            </div>
          </form>
        </main>
      </div>
    </>
  );
}

export default SignIn;
