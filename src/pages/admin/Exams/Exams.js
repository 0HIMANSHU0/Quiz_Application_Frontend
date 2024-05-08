import React, { useEffect, useState } from "react";
import PageTitle from "../../../components/PageTitle";
import { useNavigate } from "react-router-dom";
import { Table, message } from "antd";
import { deleteExamById, getAllExams } from "../../../apicalls/exams";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";

function Exams() {
  const [exams, setExams] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getExamsData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getAllExams();
      dispatch(HideLoading());
      if (response.success) {
        // message.success(response.message);
        setExams(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const deleteExam = async (examId) => {
    try {
      dispatch(ShowLoading());
      const response = await deleteExamById({ examId });
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        getExamsData();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Subject Description",
      dataIndex: "description",
    },
    {
      title: "Questions",
      dataIndex: "questions",
      render: (text, record) => <>{record.questions.length}</>,
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div className="flex gap-2">
          <i
            className="ri-pencil-line"
            onClick={() => navigate(`/admin/exams/edit/${record._id}`)}
          ></i>
          <i
            className="ri-delete-bin-line"
            onClick={() => deleteExam(record._id)}
          ></i>
        </div>
      ),
    },
  ];

  // console.log(exams);
  useEffect(() => {
    getExamsData();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title="Available Subjects" />
        <button
          className="primary-outlined-btn flex items-center"
          onClick={() => navigate("/admin/exams/add")}
        >
          <i className="ri-add-line"></i>
          Add Subject
        </button>
      </div>
      <div className="divider"></div>
      <div
        style={{
          overflowY: "auto",
          overflowX: "hidden",
          height: "387px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          padding: "8px",
        }}
      >
        <Table columns={columns} dataSource={exams} pagination={false} />
      </div>
    </div>
  );
}

export default Exams;
