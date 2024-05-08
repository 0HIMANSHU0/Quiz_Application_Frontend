import "./stylesheets/theme.css";
import "./stylesheets/alignments.css";
import "./stylesheets/textelements.css";
import "./stylesheets/custom-components.css";
import "./stylesheets/form-elements.css";
import "./stylesheets/layout.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/common/Login/Login";
import Register from "./pages/common/Register/Register";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Loader from "./components/Loader";
import Home from "./pages/common/Home/Home";
import Exams from "./pages/admin/Exams/Exams";
import AddEditExams from "./pages/admin/Exams/AddEditExams";
import { useSelector } from "react-redux";
import WriteExam from "./pages/user/WriteExam/WriteExam";
import AdminReports from "./pages/admin/AdminReports/AdminReports";
import AdminProfiles from "./pages/admin/AdminProfiles/AdminProfiles";
import UserProfile from "./pages/user/UserProfile/UserProfile";
import UserReport from "./pages/user/UserReports/UserReport";
import AdminDashboard from "./pages/admin/AdminDashboard/AdminDashboard";
import AdminCourse from "./pages/admin/AdminCourse/AdminCourse";
import AddEditCourse from "./pages/admin/AdminCourse/AddEditCourse";
import AdminUniversity from "./pages/admin/AdminUniversity/AdminUniversity";
import AdminQuestions from "./pages/admin/AdminQuestions/AdminQuestions";
import AddEditUniversity from "./pages/admin/AdminUniversity/AddEditUniversity";

function App() {
  const { loading } = useSelector((state) => state.loader);

  return (
    <>
      {loading && <Loader />}
      <BrowserRouter>
        <Routes>
          {/* {Comman Authentication Routes} */}
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          {/* {User Routes} */}
          <Route
            path="/"
            element={
              <ProtectedRoutes>
                <Home />
              </ProtectedRoutes>
            }
          ></Route>
          <Route
            path="/user/write-exam/:id"
            element={
              <ProtectedRoutes>
                <WriteExam />
              </ProtectedRoutes>
            }
          ></Route>
          <Route
            path="/user/reports"
            element={
              <ProtectedRoutes>
                <UserReport />
              </ProtectedRoutes>
            }
          ></Route>
          <Route
            path="/user/profile"
            element={
              <ProtectedRoutes>
                <UserProfile />
              </ProtectedRoutes>
            }
          ></Route>
          {/* {Admin Routes} */}
          <Route
            path="/"
            element={
              <ProtectedRoutes>
                <AdminDashboard />
              </ProtectedRoutes>
            }
          ></Route>
          <Route
            path="/admin/exams"
            element={
              <ProtectedRoutes>
                <Exams />
              </ProtectedRoutes>
            }
          ></Route>
          <Route
            path="/admin/exams/add"
            element={
              <ProtectedRoutes>
                <AddEditExams />
              </ProtectedRoutes>
            }
          ></Route>
          <Route
            path="/admin/exams/edit/:id"
            element={
              <ProtectedRoutes>
                <AddEditExams />
              </ProtectedRoutes>
            }
          ></Route>
          <Route
            path="/admin/courses"
            element={
              <ProtectedRoutes>
                <AdminCourse />
              </ProtectedRoutes>
            }
          ></Route>
          <Route
            path="/admin/courses/add"
            element={
              <ProtectedRoutes>
                <AddEditCourse />
              </ProtectedRoutes>
            }
          ></Route>
          <Route
            path="/admin/courses/edit/:id"
            element={
              <ProtectedRoutes>
                <AddEditCourse />
              </ProtectedRoutes>
            }
          ></Route>
          <Route
            path="/admin/questions"
            element={
              <ProtectedRoutes>
                <AdminQuestions />
              </ProtectedRoutes>
            }
          ></Route>
          <Route
            path="/admin/universities"
            element={
              <ProtectedRoutes>
                <AdminUniversity />
              </ProtectedRoutes>
            }
          ></Route>
          <Route
            path="/admin/university/add"
            element={
              <ProtectedRoutes>
                <AddEditUniversity />
              </ProtectedRoutes>
            }
          ></Route>
          <Route
            path="/admin/university/edit/:id"
            element={
              <ProtectedRoutes>
                <AddEditUniversity />
              </ProtectedRoutes>
            }
          ></Route>
          <Route
            path="/admin/reports"
            element={
              <ProtectedRoutes>
                <AdminReports />
              </ProtectedRoutes>
            }
          ></Route>
          <Route
            path="/admin/profiles"
            element={
              <ProtectedRoutes>
                <AdminProfiles />
              </ProtectedRoutes>
            }
          ></Route>
          <Route
            path="/admin/profiles/:id"
            element={
              <ProtectedRoutes>
                <UserProfile />
              </ProtectedRoutes>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
