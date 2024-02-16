import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Recipe from "./pages/Recipe";
import Recipes from "./pages/Recipes";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <Router>
        <div className="container">
          {/* <Header /> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipes/:recipeId" element={<Recipe />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/forgot-password" element={<SignIn />} />
          </Routes>
          <Navbar />
        </div>
      </Router>
    </>
  );
}

export default App;
