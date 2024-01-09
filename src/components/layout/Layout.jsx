import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div
      className="mt-5  mx-auto bg-info p-4 rounded g-3"
      style={{
        backdropFilter: "blur(30px)",
        "--bs-bg-opacity": "0.7",
        maxWidth: "500px",
      }}
      data-bs-theme="dark"
    >
      <Outlet />
    </div>
  );
};

export default Layout;
