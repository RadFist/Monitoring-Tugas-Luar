import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import "../../style/layout.css";
const Layout = () => {
  return (
    <div className="container">
      <Sidebar />
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
};
export default Layout;
