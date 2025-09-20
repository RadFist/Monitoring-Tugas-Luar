import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/layout.jsx";
import Home from "./page/home.jsx";
import Pdf from "./page/pdf/pdfDisposisi.jsx";
import PdfArsipDokumen from "./page/pdf/pdfArsipDokumen.jsx";
import PdfSuratTugas from "./page/pdf/pdfSuratTugas.jsx";
import PdfLaporan from "./page/pdf/pdfLaporan.jsx";
import Login from "./page/login.jsx";
import Regist from "./page/registration.jsx";
import About from "./page/about.jsx";
import NotFound from "./page/notFound.jsx";
import UserManagement from "./page/userManagment";
import ManagJabat from "./page/ManagementJabatan.jsx";
import ListTugasLuar from "./page/listTugasLuar.jsx";
import Detail from "./page/detailPenugasan.jsx";
import InputTugasLuar from "./page/inputTugasLuar.jsx";
import { PrivateWraper as PrivateRoute } from "./components/logic/PrivateWarperAuth.jsx";
import LaporanDetail from "./page/laporanDetail.jsx";
import ArsipDokumen from "./page/arsipDokumen.jsx";
import { Buffer } from "buffer";
import Profile from "./page/profile.jsx";

function App() {
  if (typeof window !== "undefined") {
    window.Buffer = Buffer;
  }
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
            path="User-Management"
            element={
              <PrivateRoute allowedLevels={["admin"]}>
                <UserManagement />
              </PrivateRoute>
            }
          />
          <Route
            path="Input-Tugas/Edit/:id"
            element={
              <PrivateRoute allowedLevels={["admin"]}>
                <InputTugasLuar title="Input Tugas Luar" />
              </PrivateRoute>
            }
          />
          <Route
            path="Jabatan-Management"
            element={
              <ManagJabat allowedLevels={["admin"]}>
                <UserManagement />
              </ManagJabat>
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
            path="arsip"
            element={
              <PrivateRoute>
                <ArsipDokumen title="Arsip Dukomen" />
              </PrivateRoute>
            }
          />
          <Route
            path="profile"
            element={
              <PrivateRoute>
                <Profile title="Profile" />
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

        {/* refactor later */}
        <Route
          path="/Tugas-Luar/Detail-Penugasan/:idDetail"
          element={<Detail />}
        />
        <Route path="/Detail-Penugasan/:idDetail" element={<Detail />} />
        <Route
          path="/Laporan-Penugasan/:idDetail"
          element={<LaporanDetail />}
        />
        <Route path="/arsip/dokumen/:id" element={<PdfArsipDokumen />} />
        <Route path="/SignIn" element={<Regist />} />
        <Route path="/generate" element={<Pdf />} />
        <Route path="/generate/pdf/SPD/:id" element={<PdfSuratTugas />} />
        <Route path="/generate/pdf/laporan/:id" element={<PdfLaporan />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
export default App;
