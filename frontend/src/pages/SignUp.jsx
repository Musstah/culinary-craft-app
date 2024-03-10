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

  const onSubmit = async (e) => {
    e.preventDefault();
    await fetch("https://culinaryapp.onrender.com/api/v1/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success", result);
        navigate("/sign-in");
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <header>
          <p className="text-4xl font-bold my-12 md:my-6 text-black md:mt-20">
            Register
          </p>
        </header>
        <main>
          {/* Horizontal Line */}
          <div className="w-11/12 border-b border-zinc-300"></div>
          <form onSubmit={onSubmit}>
            <div className="flex flex-row pt-6 pb-2 space-x-2">
              <input
                type="text"
                className="form-input"
                placeholder="Name"
                id="name"
                value={name}
                onChange={onChange}
              />
              <input
                type="email"
                className="form-input"
                placeholder="Email"
                id="email"
                value={email}
                onChange={onChange}
              />
            </div>
            <div className="relative my-2">
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
                className="absolute right-48 top-3"
              />
            </div>

            <div className="text-center mb-4">
              <Link to="/forgot-password" className="font-thin text-sky-500">
                Forgot Password
              </Link>
            </div>

            <div className="flex flex-col items-center space-y-8 mt-6">
              <button
                type="submit"
                className="w-5/6 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 
                to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 
                dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 
                font-medium rounded-lg text-sm px-5 py-3 text-center me-2"
              >
                Sign Up
              </button>

              <Link
                to="/sign-in"
                className="w-5/6 text-white bg-gradient-to-r from-teal-400 via-teal-500
                 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300
                  dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 
                  font-medium rounded-lg text-sm px-5 py-3 text-center me-2 mb-8"
              >
                Back To Sign In
              </Link>
            </div>
          </form>
          {/* Horizontal Line */}
          <div className="w-11/12 border-b border-zinc-400 opacity-50 mt-12 md:mt-20 mx-auto"></div>
          <p className="font-thin text-black text-center mt-6 mb-2">
            or sign up with
          </p>
          <div className="flex flex-col space-x-0 space-y-6 mt-4 items-center mx-6">
            <button
              className="w-full flex items-center justify-center py-2 space-x-3 border border-gray-300 rounded shadow-sm
                hover:bg-opacity-30 hover:shadow-lg hover:-translate-y-0.5"
            >
              <img src="/facebook.png" alt="" className="w-9" />
              <span className="font-thin">Facebook</span>
            </button>
            <button
              className="w-full flex items-center justify-center py-2 space-x-3 border border-gray-300 rounded shadow-sm
                hover:bg-opacity-30 hover:shadow-lg hover:-translate-y-0.5"
            >
              <img src="/google.png" alt="" className="w-9" />
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

export default SignUp;
