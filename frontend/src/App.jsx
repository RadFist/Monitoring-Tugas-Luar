import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./page/home.jsx";
import Pdf from "./page/pdf.jsx";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generate" element={<Pdf />} />
      </Routes>
    </Router>
  );
}
export default App;
