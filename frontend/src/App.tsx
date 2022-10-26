import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import HomePage from "./home/pages/HomePage";
import ListingPage from "./listings/pages/ListingPage";

function App() {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/listing/:lid" element={<ListingPage />} />
          <Route path="/login" element={<h1>Login</h1>} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
