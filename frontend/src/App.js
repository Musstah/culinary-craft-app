import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Recipe from "./pages/Recipe";
import Recipies from "./pages/Recipies";

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipies/:recipeId" element={<Recipe />} />
            <Route path="/recipies" element={<Recipies />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
