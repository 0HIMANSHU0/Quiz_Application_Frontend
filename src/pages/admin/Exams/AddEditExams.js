import React, { useEffect, useRef, useState } from "react";
import PageTitle from "../../../components/PageTitle";
import { Col, Form, Row, Table, Tabs, message, Button } from "antd";
import {
  addExam,
  deleteQuestionById,
  editExamById,
  getExamById,
  importQuestionToExam,
} from "../../../apicalls/exams";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
import TabPane from "antd/es/tabs/TabPane";
import AddEditQuestion from "./AddEditQuestion";
import Papa from "papaparse";
import { DownloadOutlined, UploadOutlined } from "@ant-design/icons";

function AddEditExams() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [examData, setExamData] = useState(null);
  const [showAddEditQuestionModel, setShowAddEditQuestionModel] =
    useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const fileInputRef = useRef(null); // Use the useRef hook

  const questionColumn = [
    {
      title: "Question",
      dataIndex: "name",
    },
    {
      title: "Level",
      dataIndex: "level",
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
              setSelectedQuestion(record);
              setShowAddEditQuestionModel(true);
            }}
          ></i>
          <i
            className="ri-delete-bin-line"
            onClick={() => {
              deleteQuestion(record._id);
            }}
          ></i>
        </div>
      ),
    },
  ];

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      let response;
      if (params.id) {
        response = await editExamById({ examId: params.id, ...values });
      } else {
        response = await addExam(values);
      }
      dispatch(HideLoading());
      if (response.success) {
        navigate("/admin/exams");
        return message.success(response.message);
      } else {
        return message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      return message.error(error.message);
    }
  };

  const getExamData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getExamById({ examId: params.id });
      dispatch(HideLoading());
      if (response.success) {
        // message.success(response.message);
        setExamData(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const deleteQuestion = async (questionId) => {
    try {
      dispatch(ShowLoading());
      const response = await deleteQuestionById({
        questionId,
        examId: params.id,
      });
      if (response.success) {
        message.success(response.message);
        getExamData();
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const handleExportCSV = () => {
    if (!examData || !examData.questions) {
      message.warning("No questions available for export.");
      return;
    }

    const csvData = examData.questions.map((question) => ({
      Question: question.name,
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

  const handleImportCSV = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      message.warning("Please select a CSV file for import.");
      return;
    }
    try {
      dispatch(ShowLoading());
      const response = await importQuestionToExam({
        file,
        exam: params.id, // Replace with the actual selected exam ID
      });
      if (response.success) {
        message.success(response.message);
        getExamData();
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error("Error during CSV import. Please try again.");
    }
  };

  // console.log(examData?.questions);
  useEffect(() => {
    if (params.id) {
      getExamData();
    }
    // eslint-disable-next-line
  }, []);

  // console.log(examData)

  return (
    <div>
      <PageTitle title={params.id ? "Edit Subject" : "Add Subject"} />
      <div className="divider"></div>
      {(examData || !params.id) && (
        <Form layout="vertical" onFinish={onFinish} initialValues={examData}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Subject-Details" key="1">
              {" "}
              <Row gutter={[10, 10]}>
                <Col span={13}>
                  <Form.Item name="name" label="Subject Name">
                    <input type="text"></input>
                  </Form.Item>
                </Col>
                <Col span={13}>
                  <Form.Item name="description" label="Subject Description">
                    <textarea
                      name="text"
                      id=""
                      rows="10"
                      placeholder="Enter you subject descripiton here...."
                    ></textarea>
                  </Form.Item>
                </Col>
              </Row>
              <div className="flex justify-end gap-2">
                <button
                  className="primary-outlined-btn"
                  type="button"
                  onClick={() => navigate("/admin/exams")}
                >
                  Cancel
                </button>
                <button className="primary-contained-btn savebtn" type="submit">
                  Save
                </button>
              </div>
            </TabPane>
            {params.id && (
              <TabPane tab="Questions" key="2">
                <div className="flex justify-end items-center gap-1">
                  <button
                    className="primary-outlined-btn addQuestion"
                    type="button"
                    onClick={() => setShowAddEditQuestionModel(true)}
                  >
                    Add Questions
                  </button>
                  <Button
                    className="primary-contained-btn addQuestion"
                    icon={<UploadOutlined />}
                    onClick={handleExportCSV}
                  >
                    Export to CSV
                  </Button>
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleImportCSV}
                    style={{ display: "none" }}
                    ref={fileInputRef}
                  />
                  <Button
                    className="primary-contained-btn addQuestion"
                    icon={<DownloadOutlined />}
                    onClick={() => fileInputRef.current.click()}
                  >
                    Import from CSV
                  </Button>
                </div>
                <div
                  style={{
                    overflowY: "auto",
                    overflowX: "hidden",
                    height: "325px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    padding: "8px",
                  }}
                >
                  <Table
                    columns={questionColumn}
                    dataSource={examData?.questions || []}
                    pagination={false}
                  />
                </div>
              </TabPane>
            )}
          </Tabs>
        </Form>
      )}

      {showAddEditQuestionModel && (
        <AddEditQuestion
          setShowAddEditQuestionModel={setShowAddEditQuestionModel}
          showAddEditQuestionModel={showAddEditQuestionModel}
          examId={params.id}
          refreshData={getExamData}
          selectedQuestion={selectedQuestion}
          setSelectedQuestion={setSelectedQuestion}
        />
      )}
    </div>
  );
}

export default AddEditExams;
