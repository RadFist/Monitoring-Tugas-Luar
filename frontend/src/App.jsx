import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/layout.jsx";
import Home from "./page/home.jsx";
import Pdf from "./page/pdf.jsx";
import Login from "./page/login.jsx";
import Regist from "./page/registration.jsx";
import About from "./page/about.jsx";
import NotFound from "./page/notFound.jsx";
import UserManagement from "./page/userManagment.jsx";
import ListTugasLuar from "./page/listTugasLuar.jsx";
import InputTugasLuar from "./page/inputTugasLuar.jsx";
import { PrivateWraper as PrivateRoute } from "./components/logic/PrivateWarperAuth.jsx";
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
            path="User-Managemet"
            element={
              <PrivateRoute>
                <UserManagement />
              </PrivateRoute>
            }
          />
          <Route
            path="Tugas-Luar"
            element={
              <PrivateRoute>
                <ListTugasLuar title="Tugas Luar" />
              </PrivateRoute>
            }
          />
          <Route
            path="Input-Tugas"
            element={
              <PrivateRoute>
                <InputTugasLuar title="Input Tugas Luar" />
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
        <Route path="/SignIn" element={<Regist />} />
        <Route path="/generate" element={<Pdf />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
export default App;
