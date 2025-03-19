import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./page/home.jsx";
import Pdf from "./page/pdf.jsx";
import Login from "./page/Login";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/generate" element={<Pdf />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
}
export default App;
