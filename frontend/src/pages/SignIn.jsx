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

  const { fetchCurrentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify(formData));
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
      <div className="flex flex-col items-center">
        <header>
          <h2 className="text-4xl font-bold my-12 md:my-6 text-black md:mt-20">
            Welcome Back!
          </h2>
        </header>
        <main>
          {/* Horizontal Line */}
          <div className="w-11/12 border-b border-zinc-300"></div>
          <form onSubmit={onSubmit}>
            <div className="flex flex-row pt-6 pb-2 space-x-2">
              <input
                type="email"
                className="form-input"
                placeholder="Email"
                id="email"
                value={email}
                onChange={onChange}
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-input"
                  placeholder="Password"
                  id="password"
                  value={password}
                  onChange={onChange}
                />
                <FontAwesomeIcon
                  icon={showPassword ? faEye : faEyeSlash}
                  onClick={() => setShowPassword((prevState) => !prevState)}
                  className="absolute right-3 top-3"
                />
              </div>
            </div>
            <div className="text-center mb-4">
              <Link to="/forgot-password" className="font-thin text-sky-500">
                Forgot Password
              </Link>
            </div>

            <div className="flex flex-col items-center space-y-8 mt-20">
              <button
                type="submit"
                className="w-5/6 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 
                to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 
                dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 
                font-medium rounded-lg text-sm px-5 py-3 text-center me-2"
              >
                Sign In
              </button>

              <Link
                to="/sign-up"
                className="w-5/6 text-white bg-gradient-to-r from-teal-400 via-teal-500
                 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300
                  dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 
                  font-medium rounded-lg text-sm px-5 py-3 text-center me-2 mb-8"
              >
                Sign Up Instead
              </Link>
            </div>
          </form>
          {/* Horizontal Line */}
          <div className="w-11/12 border-b border-zinc-400 opacity-50 mt-12 md:mt-20 mx-auto"></div>
          <p className="font-thin text-black text-center mt-6 mb-2">
            or log in with
          </p>
          <div className="flex flex-col space-x-0 space-y-6 mt-4 items-center mx-6">
            <button
              className="w-full flex items-center justify-center py-2 space-x-3 border border-gray-300 rounded shadow-sm
                hover:bg-opacity-30 hover:shadow-lg hover:-translate-y-0.5"
            >
              <img
                src="https://culinaryapp.onrender.com/facebook.png"
                alt=""
                className="w-9"
              />
              <span className="font-thin">Facebook</span>
            </button>
            <button
              className="w-full flex items-center justify-center py-2 space-x-3 border border-gray-300 rounded shadow-sm
                hover:bg-opacity-30 hover:shadow-lg hover:-translate-y-0.5"
            >
              <img
                src="https://culinaryapp.onrender.com/google.png"
                alt=""
                className="w-9"
              />
              <span className="font-thin">Google</span>
            </button>
          </div>
        </main>
      </div>
      {/* Div to add some space */}
      <div className="h-24 md:hidden"></div>
    </>
  );
}

export default SignIn;
