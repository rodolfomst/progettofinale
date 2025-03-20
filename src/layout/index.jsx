import { Outlet } from "react-router";
import Navbar from "../pages/home/components/Navbar"; // Percorso corretto
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import "./Markup.css";

export default function Markup() {
  return (
    <div className="container">
      <Navbar /> 
      
      <div className="gridLayout">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
}
