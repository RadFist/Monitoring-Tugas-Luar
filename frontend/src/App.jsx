import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/layout.jsx";
import Home from "./page/home.jsx";
import Pdf from "./page/pdf.jsx";
import Login from "./page/Login";
import About from "./page/About.jsx";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
        </Route>

        <Route path="/Login" element={<Login />} />

        <Route path="/generate" element={<Pdf />} />
      </Routes>
    </Router>
  );
}
export default App;
