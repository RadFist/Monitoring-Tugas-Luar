import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout.jsx";
import Home from "./page/home.jsx";
import Pdf from "./page/pdf.jsx";
import Login from "./page/Login";
import About from "./page/About.jsx";
import UserManagement from "./page/userManagment.jsx";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home title="dashboard" />} />
          <Route path="UserManagemet" element={<UserManagement />} />
          <Route path="about" element={<About />} />
        </Route>

        <Route path="/Login" element={<Login />} />

        <Route path="/generate" element={<Pdf />} />
      </Routes>
    </Router>
  );
}
export default App;
