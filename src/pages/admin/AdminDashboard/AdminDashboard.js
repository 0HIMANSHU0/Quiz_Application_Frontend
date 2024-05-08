import React, { useEffect, useState } from "react";
import {
  Layout,
  Card,
  Row,
  Col,
  Button,
  Typography,
  message,
  Progress,
  Space,
} from "antd";
import "antd/dist/antd.min.js";
import PageTitle from "../../../components/PageTitle";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllExams, getAllQuestion } from "../../../apicalls/exams";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
import { getAllUserInfo } from "../../../apicalls/users";
import { getAllCourse } from "../../../apicalls/courses";
import Search from "antd/es/input/Search";

function AdminDashboard() {
  const { Title } = Typography;
  const { Content } = Layout;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [totalExams, setTotalExams] = useState([]);
  const [totalCourses, setTotalCourses] = useState([]);
  const [totalUsers, setTotalUsers] = useState([]);
  const [totalQuestions, setTotalQuestions] = useState([]);

  const getExamsData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getAllExams();
      dispatch(HideLoading());
      if (response.success) {
        // message.success(response.message);
        setTotalExams(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const getUsersData = async () => {
    try {
      const response = await getAllUserInfo();
      if (response.success) {
        // message.success(response.message);
        setTotalUsers(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const getCoursesData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getAllCourse();
      if (response.success) {
        setTotalCourses(response.data);
      } else {
        message.error(response.error);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const getQuestionsData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getAllQuestion(Search);
      if (response.success) {
        setTotalQuestions(response.data);
      } else {
        message.success(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getCoursesData();
    getExamsData();
    getUsersData();
    getQuestionsData(Search);
    // eslint-disable-next-line
  }, []);

  const QuestionUI = () => {
    const options1 = ["A. London", "B. Paris", "C. Berlin", "D. Madrid"];

    return (
      <Card title="Question UI">
        <div className="flex gap-2 justify-between">
          <div className="flex flex-col">
            <Title level={4}>What is the capital of France?</Title>
            <div
              style={{
                margin: "-8px",
              }}
            >
              {options1.map((option) => (
                <Button key={option} style={{ margin: "8px" }}>
                  {option}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex">
            <Space>
              <Progress
                type="circle"
                percent={75}
                format={(percent) => `${percent} User`}
              />
            </Space>
          </div>
          <div className="flex ">
            <div style={{ width: 300 }}>
              <Progress percent={30} size="small" />
              <Progress percent={50} size="small" status="active" />
              <Progress percent={70} size="small" status="exception" />
              <Progress percent={100} size="small" />
            </div>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div>
      <PageTitle title="Dashboard" />
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
        <Layout style={{ borderRadius: "5px" }}>
          <Content>
            <Row gutter={[16, 16]}>
              <Col span={6}>
                <Card
                  className="dashboardComponent"
                  style={{
                    backgroundColor: "#e55353",
                  }}
                  onClick={() => navigate("/admin/exams")}
                >
                  <div className="flex justify-between items-center">
                    <h1 className="text-lg">Total Subjects</h1>
                    <i class="ri-survey-fill"></i>
                  </div>
                  <h1 className="text-lg">{totalExams.length}</h1>
                </Card>
              </Col>

              <Col span={6}>
                <Card
                  onClick={() => {
                    navigate("/admin/courses");
                  }}
                  className="dashboardComponent"
                  style={{
                    backgroundColor: "#3399ff",
                  }}
                >
                  <div className="flex justify-between items-center">
                    <h1 className="text-lg">Total Course</h1>
                    <i class="ri-git-repository-line"></i>
                  </div>
                  <h1 className="text-lg">{totalCourses.length}</h1>
                </Card>
              </Col>

              <Col span={6}>
                <Card
                  onClick={() => navigate("/admin/profiles")}
                  className="dashboardComponent"
                  style={{
                    backgroundColor: "#f9b115",
                  }}
                >
                  <div className="flex justify-between items-center">
                    <h1 className="text-lg">Total User</h1>
                    <i class="ri-user-3-fill"></i>
                  </div>
                  <h1 className="text-lg">{totalUsers.length}</h1>
                </Card>
              </Col>
              <Col span={6}>
                <Card
                  onClick={() => navigate("/admin/exams")}
                  className="dashboardComponent"
                  style={{
                    backgroundColor: "#321fdb",
                  }}
                >
                  <div className="flex justify-between items-center">
                    <h1 className="text-lg">Total Question</h1>
                    <i class="ri-question-fill"></i>
                  </div>
                  <h1 className="text-lg">{totalQuestions.length}</h1>
                </Card>
              </Col>
            </Row>

            <div className="mt-2">
              <QuestionUI />
            </div>
          </Content>
        </Layout>
      </div>
    </div>
  );
}

export default AdminDashboard;
