import React from "react";
import { useLocation } from "react-router-dom";
import AdminNavbar from "./admin-navbar";
import Footer from "./footer";
import Sidebar from "./sidebar";
import "../../styles/demo.css";
import "../../styles/admin.css";
import sidebarImage from "../../assets/sidebar-3.jpg";
import Dashboard from "../../pages/admin/dashboard";
import UserProfile from "../../pages/admin/user-profile";
import DashboardIcon from "../../icons/dashboard-icon";
import UserProfileIcon from "../../icons/userprofile-icon";
function AdminLayout({ children }) {
  const [image, setImage] = React.useState(sidebarImage);
  const [hasImage, setHasImage] = React.useState(true);
  const location = useLocation();
  const mainPanel = React.useRef(null);

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainPanel.current.scrollTop = 0;
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      var element = document.getElementById("bodyClick");
      element.parentNode.removeChild(element);
    }
  }, [location]);
  return (
    <>
      <div className="wrapper">
        <Sidebar
          color={"#fff"}
          image={hasImage ? image : ""}
          routes={[
            {
              path: "/dashboard",
              name: "Dashboard",
              icon: <DashboardIcon/>,
              component: Dashboard,
              layout: "/admin",
              components: ["assignment", "quizzes"]
            },
            {
              path: "/user-profile",
              name: "User Profile",
              icon: <UserProfileIcon/>,
              component: UserProfile,
              layout: "/admin",
              components: []

            },
           
          ]}
        />
        <div className="main-panel" ref={mainPanel}>
          <AdminNavbar />
          <div className="content">{children}</div>
        </div>
      </div>
    </>
  );
}

export default AdminLayout;
