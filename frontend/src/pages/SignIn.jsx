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
      <div className="flex flex-col items-center w-full mx-auto">
        <main className="bg-opacity-20 bg-slate-50 dark:bg-neutral-950 border border-gray-300 dark:border-gray-700 md:w-1/5 md:mt-[5%]">
          <header>
            <h2 className="my-12 text-4xl font-bold text-center md:my-6 text-stone-600 dark:text-stone-300 md:mt-20">
              Welcome Back!
            </h2>
          </header>

          <form onSubmit={onSubmit} className="">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-5/6">
                <input
                  type="email"
                  className="form-input"
                  placeholder="Email"
                  id="email"
                  value={email}
                  onChange={onChange}
                />
              </div>
              <div className="relative w-5/6">
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
            <div className="mt-4 text-center">
              <Link to="/forgot-password" className="font-thin text-sky-500">
                Forgot Password
              </Link>
            </div>

            <div className="flex flex-col items-center space-y-8 md:mt-4">
              <button
                type="submit"
                className="w-5/6 px-5 py-3 text-sm font-medium text-center text-white rounded-lg shadow-lg bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 me-2"
              >
                Sign In
              </button>

              <Link
                to="/sign-up"
                className="w-5/6 px-5 py-3 mb-8 text-sm font-medium text-center text-white rounded-lg shadow-lg bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 me-2"
              >
                Sign Up Instead
              </Link>
            </div>
          </form>
          {/* Horizontal Line */}
          <div className="w-11/12 mx-auto mt-4 border-b border-gray-300 dark:opacity-90 dark:border-gray-700 md:mt-4"></div>
          <p className="mt-6 mb-2 font-thin text-center text-stone-600 dark:text-stone-300">
            or log in with
          </p>
          <div className="flex flex-col items-center mx-6 mt-4 space-x-0 space-y-6 md:mb-6">
            <button
              className="w-full flex items-center justify-center py-2 space-x-3 border bg-white dark:bg-black border-gray-300 dark:border-gray-700 rounded shadow-sm
                hover:bg-opacity-30 hover:shadow-lg hover:-translate-y-0.5"
            >
              <img src="/facebook.png" alt="" className="w-9" />
              <span className="font-thin text-stone-600 dark:text-stone-300">
                Facebook
              </span>
            </button>
            <button
              className="w-full flex items-center justify-center py-2 space-x-3 bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded shadow-sm
                hover:bg-opacity-30 hover:shadow-lg hover:-translate-y-0.5 "
            >
              <img src="/google.png" alt="" className="w-9" />
              <span className="font-thin text-stone-600 dark:text-stone-300">
                Google
              </span>
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
