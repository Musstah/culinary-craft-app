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
          <div className="page-container flex flex-col items-center justify-center bg-[url(/bgv1.jpg)]">
            <h2 className="text-5xl font-bold my-8">Welcome Back!</h2>
            <form onSubmit={onSubmit}>
              <div className="flex flex-row items-center mb-8 mt-4 space-x-2">
                <input
                  type="email"
                  className="p-2 w-48 border border-gray-300 rounded-md"
                  placeholder="Email"
                  id="email"
                  value={email}
                  onChange={onChange}
                />
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="p-2 w-48 border border-gray-300 rounded-md"
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
              <div className="flex flex-col items-center justify-center mb-10">
                <Link to="/forgot-password" className="font-thin text-cyan-700">
                  Forgot Password
                </Link>
              </div>

              <div className="flex flex-col items-center justify-center space-y-4">
                <button
                  type="submit"
                  className="w-full flex justify-center items-center p-4 space-x-4 font-bold text-white
                  rounded-full px-9 bg-cyan-700 shadow-cyan-100 hover:bg-opacity-90 shadow-sm"
                >
                  Sign In
                </button>

                <Link
                  to="/sign-up"
                  className="w-full flex justify-center items-center p-4 space-x-4 font-bold text-white
                    rounded-full px-9 bg-sky-700 shadow-sky-100 hover:bg-opacity-90 shadow-sm"
                >
                  Sign Up Instead
                </Link>
              </div>

              <div class="mt-12 border-b border-b-gray-300"></div>

              <p class="py-6 text-small font-thin text-center text-gray-400">
                or log in with
              </p>
            </form>
            <div className="flex flex-col space-x-0 space-y-4 md:flex-row md:space-x-4 md:space-y-0 w-full px-4">
              <button
                className="flex items-center justify-center py-2 space-x-3 border border-gray-300 rounded shadow-sm
                hover:bg-opacity-30 hover:shadow-lg hover:-translate-y-0.5 transition duration-150 md:w-1/2"
              >
                <img src="/facebook.png" alt="" className="w-9" />
                <span className="font-thin">Facebook</span>
              </button>
              <button
                className="flex items-center justify-center py-2 space-x-3 border border-gray-300 rounded shadow-sm
                hover:bg-opacity-30 hover:shadow-lg hover:-translate-y-0.5 transition duration-150 md:w-1/2"
              >
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
