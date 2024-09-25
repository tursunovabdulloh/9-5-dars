import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export default function Footer() {
  const theme = useSelector((state: RootState) => state.theme.theme);

  return (
    <div
      className={theme === "light" ? "bg-blue-50" : "bg-gray-800 text-white"}
    >
      <div className="container">
        <footer className="footer footer-center text-base-content p-4">
          <aside>
            <p>
              Copyright © {new Date().getFullYear()} - All rights reserved by
              ACME Industries Ltd
            </p>
          </aside>
        </footer>
      </div>
    </div>
  );
}
