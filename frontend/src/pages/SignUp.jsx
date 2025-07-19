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
    await fetch("/api/v1/auth/register", {
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
      <div className="flex flex-col items-center w-full mx-auto">
        <main className=" bg-slate-50 dark:bg-neutral-950 border border-gray-300 dark:border-gray-700 md:w-1/5 md:mt-[5%]">
          <header>
            <h2 className="my-12 font-serif text-4xl font-bold text-center md:my-6 text-stone-600 dark:text-stone-300 md:mt-20">
              Register!
            </h2>
          </header>

          <form onSubmit={onSubmit} className="">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-5/6">
                <input
                  type="text"
                  className="form-input"
                  placeholder="Name"
                  id="name"
                  value={name}
                  onChange={onChange}
                />
              </div>
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
                  className="absolute right-3 top-3 dark:text-white"
                />
              </div>
            </div>

            <div className="flex flex-col items-center space-y-2 md:mt-4 md:mb-4">
              <button
                type="submit"
                className="w-5/6 px-5 py-3 text-sm font-medium bg-white border border-gray-300 dark:border-0
                hover:bg-gray-100  focus:ring-gray-100
                text-center dark:text-white dark:bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none 
                focus:ring-[#24292F]/50  rounded-lg 
                dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 hover:-translate-y-0.5"
              >
                Sign Up
              </button>

              <Link
                to="/sign-in"
                className="w-5/6 px-5 py-3 mb-8 text-sm font-medium bg-white border border-gray-300 dark:border-0
                hover:bg-gray-100  focus:ring-gray-100 text-center dark:text-white 
                dark:bg-[#1f1f1f] hover:bg-[#24292F]/90 
                  focus:ring-4 focus:outline-none 
                focus:ring-[#2a2a2a]/50 rounded-lg  
                dark:focus:ring-[#2a2a2a]/50 dark:hover:bg-[#2a2a2a]/30 hover:-translate-y-0.5"
              >
                Back To Sign In
              </Link>
            </div>
          </form>
          {/* Horizontal Line */}
          <div className="w-11/12 mx-auto mt-4 border-b border-gray-300 dark:opacity-90 dark:border-gray-700 md:mt-4"></div>
          <p className="mt-6 mb-2 font-serif tracking-wide text-center text-stone-600 dark:text-stone-300">
            or log in with
          </p>
          <div className="flex flex-col items-center mx-6 mt-4 space-y-6 md:space-x-2 md:space-y-0 md:flex-row md:mb-6">
            <button
              className="w-full md:w-1/2 flex items-center justify-center py-2 space-x-3 border bg-white dark:bg-black 
              border-gray-300 dark:border-gray-700 rounded shadow-sm
                hover:bg-opacity-30 hover:shadow-lg hover:-translate-y-0.5"
            >
              <img src="/facebook.png" alt="" className="w-5" />
              <span className="text-black dark:text-stone-300">Facebook</span>
            </button>
            <button
              className="w-full md:w-1/2 flex items-center justify-center py-2 space-x-3 bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded shadow-sm
                hover:bg-opacity-30 hover:shadow-lg hover:-translate-y-0.5 "
            >
              <img src="/google.png" alt="" className="w-5" />
              <span className="text-black dark:text-stone-300">Google</span>
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
