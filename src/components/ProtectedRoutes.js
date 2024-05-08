import React, { useEffect, useState } from "react";
import { message } from "antd";
import { getUserInfo } from "../apicalls/users";
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "../redux/usersSlice";
import { useNavigate } from "react-router-dom";
import { HideLoading, ShowLoading } from "../redux/loaderSlice";

function ProtectedRoutes({ children }) {
  const { user } = useSelector((state) => state.users);
  const [menu, setMenu] = useState([]);
  const [collasped, setCollasped] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userMenu = [
    {
      title: "Home",
      paths: ["/"],
      icons: <i className="ri-home-line"></i>,
      onclick: () => navigate("/"),
    },
    {
      title: "Reports",
      paths: ["/user/reports"],
      icons: <i className="ri-bar-chart-line"></i>,
      onclick: () => navigate("/user/reports"),
    },
    {
      title: "Profile",
      paths: ["/user/profile"],
      icons: <i className="ri-user-line"></i>,
      onclick: () => navigate("/user/profile"),
    },
    {
      title: "Logout",
      paths: ["/logout"],
      icons: <i className="ri-logout-box-line"></i>,
      onclick: () => {
        localStorage.removeItem("token");
        navigate("/login");
      },
    },
  ];
  const adminMenu = [
    {
      title: "Dashboard",
      paths: ["/"],
      icons: <i className="ri-home-line"></i>,
      onclick: () => navigate("/"),
    },
    {
      title: "Subjects",
      paths: ["/admin/exams", "/admin/exams/add", "/admin/exams/edit/:id"],
      icons: <i className="ri-file-list-line"></i>,
      onclick: () => navigate("/admin/exams"),
    },
    {
      title: "Questions",
      paths: ["/admin/questions", "/admin/questions/add", "/admin/questions/edit/:id"],
      icons: <i class="ri-questionnaire-fill"></i>,
      onclick: () => navigate("/admin/questions"),
    },
    {
      title: "Universities",
      paths: ["/admin/universities", "/admin/university/add","/admin/university/edit/:id"],
      icons: <i class="ri-school-fill"></i>,
      onclick: () => navigate("/admin/universities"),
    },
    {
      title: "Courses",
      paths: [
        "/admin/courses",
        "/admin/courses/add",
        "/admin/courses/edit/:id",
      ],
      icons: <i className="ri-book-marked-line"></i>,
      onclick: () => navigate("/admin/courses"),
    },
    {
      title: "Reports",
      paths: ["/admin/reports"],
      icons: <i className="ri-bar-chart-line"></i>,
      onclick: () => navigate("/admin/reports"),
    },
    {
      title: "Profiles",
      paths: ["/admin/profiles", "/admin/profiles/:id"],
      icons: <i className="ri-user-line"></i>,
      onclick: () => navigate("/admin/profiles"),
    },
    {
      title: "Logout",
      paths: ["/logout"],
      icons: <i className="ri-logout-box-line"></i>,
      onclick: () => {
        localStorage.removeItem("token");
        navigate("/login");
      },
    },
  ];

  const getUserData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getUserInfo();
      dispatch(HideLoading());
      if (response.success) {
        // message.success(response.message);
        dispatch(SetUser(response.data));
        if (response.data.isAdmin) {
          setMenu(adminMenu);
        } else {
          setMenu(userMenu);
        }
      } else {
        message.error(response.message);
      }
    } catch (error) {
      navigate("/login");
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
  
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUserData();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const activeRoute = window.location.pathname;
  const getIsActiveorNot = (paths) => {
    if (paths.includes(activeRoute)) {
      return true;
    } else {
      if (
        (activeRoute.includes("/admin/exams/edit") &&
          paths.includes("/admin/exams"))
      ) {
        return true;
      }
      return false;
    }
  };


  return (
    <div className="layout">
      <div className="flex gap-1 h-96">
        <div className="sidebar">
          <div className="menu">
            {menu.map((item, index) => {
              return (
                <div
                  className={`menu-item ${
                    getIsActiveorNot(item.paths) && "active-item-menu"
                  }`}
                  key={index}
                  onClick={item.onclick}
                >
                  {item.icons}

                  {!collasped && (
                    <span className="text-white">{item.title}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="body">
          <div className="header flex justify-between items-center">
            {!collasped && (
              <i
                className="ri-close-fill"
                onClick={() => setCollasped(true)}
              ></i>
            )}
            {collasped && (
              <i
                className="ri-menu-fill"
                onClick={() => setCollasped(false)}
              ></i>
            )}
            <h1 className="text-xl">QUIZ APPLICATION</h1>
            <div>
              <div className="flex gap-1 items-center">
                <i className="ri-user-line"></i>
                <div className="flex flex-col">
                  <span className="text-md" title={user?.name.toUpperCase()}>{user?.name.toUpperCase()}</span>
                  <span className="text-xm">
                    Role : {user?.isAdmin ? "Admin" : "User"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="content">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default ProtectedRoutes;
