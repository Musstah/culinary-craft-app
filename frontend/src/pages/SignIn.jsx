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
        <main>
          <div className="">
            <h2 className="">Welcome Back!</h2>
            <form onSubmit={onSubmit}>
              <div className="">
                <input
                  type="email"
                  className=""
                  placeholder="Email"
                  id="email"
                  value={email}
                  onChange={onChange}
                />
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className=""
                    placeholder="Password"
                    id="password"
                    value={password}
                    onChange={onChange}
                  />
                  <FontAwesomeIcon
                    icon={showPassword ? faEye : faEyeSlash}
                    onClick={() => setShowPassword((prevState) => !prevState)}
                    className=""
                  />
                </div>
              </div>
              <div className="">
                <Link to="/forgot-password" className="">
                  Forgot Password
                </Link>
              </div>

              <div className="">
                <button type="submit" className="">
                  Sign In
                </button>

                <Link to="/sign-up" className="">
                  Sign Up Instead
                </Link>
              </div>
            </form>
            <div className="">
              <button className="">
                <img src="/facebook.png" alt="" className="w-9" />
                <span className="font-thin">Facebook</span>
              </button>
              <button className="">
                <img src="/google.png" alt="" className="w-9" />
                <span className="font-thin">Google</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default SignIn;
