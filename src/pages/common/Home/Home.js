import React, { useEffect, useState } from "react";
import PageTitle from "../../../components/PageTitle";
// import { getAllExams } from "../../../apicalls/exams";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
import { Col, Row, message } from "antd";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "../../admin/AdminDashboard/AdminDashboard";
import { getAllCourse } from "../../../apicalls/courses";

function Home() {
  const [exams, setExams] = useState([]);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const getCourses = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getAllCourse();
      if (response.success) {
        setExams(response.data);
        // message.success(response.message);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getCourses();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {user?.isAdmin ? (
        <>
          <AdminDashboard />
        </>
      ) : (
        <>
          <PageTitle
            title={`Hello! ${user?.name}, Welcome to the Online Quiz Portal`}
          />
          <div className="divider"></div>
          <div
            style={{
              overflowY: "auto",
              overflowX: "hidden",
              maxHeight: "408px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "8px",
            }}
          >
            <Row gutter={[16, 16]}>
              {exams.map((exam) => (
                <Col span={6} key={exam._id}>
                  <div className="card-lg flex flex-col gap-2 p-1">
                    <h1 className="text-md">{exam?.name.toUpperCase()}</h1>
                    <span className="text-sm">Category : {exam.level}</span>
                    <span className="text-sm">
                      Total Marks : {exam.totalMarks}
                    </span>
                    <span className="text-sm">
                      Passing Marks : {exam.passingMarks}
                    </span>
                    <span className="text-sm">
                      Duration : {exam.questions.length} mins
                    </span>
                    <button
                      className="primary-outlined-btn"
                      onClick={() => {
                        navigate(`/user/write-exam/${exam._id}`);
                      }}
                    >
                      Start Exam
                    </button>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </>
      )}
    </>
  );
}

export default Home;
