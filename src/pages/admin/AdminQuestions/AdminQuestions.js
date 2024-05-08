import PageTitle from "../../../components/PageTitle";
import React, { useEffect, useState } from "react";
import { message, Table, Button } from "antd";
// // import { Layout, Card, Row, Col, message, Table } from "antd";
// import "antd/dist/antd.min.js";
import { getAllQuestion } from "../../../apicalls/exams";
import { getAllQuestions } from "../../../redux/questionSlice";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
import { UploadOutlined } from "@ant-design/icons";
import Papa from "papaparse"; // Import the papaparse library

function AdminQuestions() {
  const dispatch = useDispatch();
  const [questions, setQuestions] = useState([]);
  const [search, setSearch] = useState("");
  let initialfilters = {
    text: "",
  };

  const [filters, setFilters] = useState(initialfilters);
  const { allQuestions } = useSelector((state) => state.questions);

  console.log("The all questions list is: ", allQuestions);
  useEffect(() => {
    dispatch(ShowLoading());
    dispatch(getAllQuestions({
      searchText: filters.text
    }));
    setQuestions(allQuestions);
    dispatch(HideLoading());
  }, []);

  const handlefilterchange = (e) => {
    const { value, name } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  console.log("The filter Value is:", filters.text);

  const questionColumn = [
    {
      title: "Question",
      dataIndex: "name",
      render: (text, record) => {
        return `${record?.name}`;
      },
    },
    {
      title: "Subject",
      dataIndex: "exam",
      render: (text, record) => {
        return `${record.exam?.name}`;
      },
    },
    {
      title: "Level",
      dataIndex: "level",
      render: (text, record) => {
        return `${record.level}`;
      },
    },
    {
      title: "Options",
      dataIndex: "options",
      render: (text, record) => {
        return Object.keys(record.options).map((key) => {
          return (
            <div>
              {key}: {record.options[key]}
            </div>
          );
        });
      },
    },
    {
      title: "Correct Option",
      dataIndex: "correctOption",
      render: (text, record) => {
        return `${record.correctOption} : ${
          record.options[record.correctOption]
        }`;
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div className="flex gap-2">
          <i
            className="ri-pencil-line"
            onClick={() => {
              console.log(record._id);
            }}
          ></i>
          <i
            className="ri-delete-bin-line"
            onClick={() => {
              console.log("Click on bin");
            }}
          ></i>
        </div>
      ),
    },
  ];

  // const questionsData = async () => {
  //   try {
  //     dispatch(ShowLoading());
  //     const response = await getAllQuestion(search);
  //     if (response.success) {
  //       // message.success(response.message);
  //       setQuestions(response.data);
  //     } else {
  //       message.error(response.message);
  //     }
  //     dispatch(HideLoading());
  //   } catch (error) {
  //     dispatch(HideLoading());
  //     message.error(error.message);
  //   }
  // };

  const handleExportCSV = () => {
    const csvData = questions.map((question) => ({
      Question: question.name,
      Subject: question.exam.name,
      Level: question.level,
      Options: Object.keys(question.options)
        .map((key) => `${key}: ${question.options[key]}`)
        .join(", "),
      "Correct Option": `${question.correctOption}: ${
        question.options[question.correctOption]
      }`,
    }));

    const csv = Papa.unparse(csvData);

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "questions_export.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // useEffect(() => {
  //   questionsData();
  //   //eslint-disable-next-line
  // }, [search]);

  // console.log(questions.exam?.name);

  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title="Admin Questions Panel" />
        <Button
          className="primary-contained-btn flex items-center"
          icon={<UploadOutlined />}
          onClick={handleExportCSV}
        >
          Export to CSV
        </Button>
      </div>
      <div className="divider"></div>
      <div className="flex gap-1 ">
        <input
          name="text"
          type="text"
          placeholder="Enter Question Name or Level"
          value={filters.text}
          onChange={handlefilterchange}
        />
        <button
          className="primary-outlined-btn w-25"
          onClick={() => {
            setSearch("");
            dispatch(getAllQuestions());
          }}
        >
          Clear Filters
        </button>
        <button
          className="primary-contained-btn"
          onClick={() => dispatch(getAllQuestions(filters.text))}
        >
          Search
        </button>
      </div>
      <div
        style={{
          overflowY: "auto",
          overflowX: "hidden",
          maxHeight: "394px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          padding: "8px",
          marginTop: "10px",
        }}
      >
        {/* <Layout style={{ borderRadius: "5px" }}>
          <Content>
            <Row gutter={[16, 16]}>
              <Col span={6}>
                <Card
                  className="dashboardComponent"
                  style={{
                    backgroundColor: "#e55353",
                  }}
                  onClick={() => navigate("/admin/questions")}
                >
                  <div className="flex justify-between items-center">
                    <h1 className="text-md">Total Questions</h1>
                    <i class="ri-survey-fill"></i>
                  </div>
                  <h1 className="text-md">{questions.length}</h1>
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
                    <h1 className="text-md">Easy Questions</h1>
                    <i class="ri-git-repository-line"></i>
                  </div>
                  <h1 className="text-md">{questions.length}</h1>
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
                    <h1 className="text-md">Medium Questions</h1>
                    <i class="ri-user-3-fill"></i>
                  </div>
                  <h1 className="text-md">{questions.length}</h1>
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
                    <h1 className="text-md">Hard Questions</h1>
                    <i class="ri-question-fill"></i>
                  </div>
                  <h1 className="text-md">{questions.length}</h1>
                </Card>
              </Col>
            </Row>
          </Content>
        </Layout> */}
        <Table columns={questionColumn} dataSource={allQuestions} />
      </div>
    </div>
  );
}

export default AdminQuestions;
