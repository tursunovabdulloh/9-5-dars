import { Outlet } from "react-router-dom";
import Header from "../pages/Header/Header";
import Footer from "../pages/Footer/Footer";

export default function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
