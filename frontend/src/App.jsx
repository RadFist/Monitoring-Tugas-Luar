import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout.jsx";
import Home from "./page/home.jsx";
import Pdf from "./page/pdf.jsx";
import Login from "./page/login.jsx";
import About from "./page/about.jsx";
import NotFound from "./page/notFound.jsx";
import UserManagement from "./page/userManagment.jsx";
import PrivateRoute from "./components/logic/PrivateWarperAuth.jsx";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <PrivateRoute>
                <Home title="dashboard" />
              </PrivateRoute>
            }
          />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home title="dashboard" />
              </PrivateRoute>
            }
          />
          <Route
            path="UserManagemet"
            element={
              <PrivateRoute>
                <UserManagement />
              </PrivateRoute>
            }
          />
          <Route
            path="about"
            element={
              <PrivateRoute>
                <About title="about" />
              </PrivateRoute>
            }
          />
        </Route>

        <Route path="/Login" element={<Login />} />
        <Route path="/generate" element={<Pdf />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
export default App;
