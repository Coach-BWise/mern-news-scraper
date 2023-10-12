import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import SavedArticlesPage from "./pages/SavedArticlesPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/saved" element={<SavedArticlesPage />} />
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
