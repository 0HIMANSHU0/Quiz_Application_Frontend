import React, { useEffect, useState } from "react";
import PageTitle from "../../../components/PageTitle";
import { Table, message } from "antd";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
import { getAllReportsByUser } from "../../../apicalls/reports";
import moment from "moment";

function UserReport() {
  const [reportsUserData, setReportsUserData] = useState([]);
  const dispatch = useDispatch();
  
  const getUserReportData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getAllReportsByUser();
      if (response.success) {
        message.success(response.message);
        setReportsUserData(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Exam Name",
      dataIndex: "name",
      render: (text, record) => <>{record.course.name}</>,
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      render: (text, record) => (
        <>{moment(record.createdAt).format("DD-MM-YYYY hh:mm:ss")}</>
      ),
    },

    {
      title: "Total Marks",
      dataIndex: "totalMarks",
      render: (text, record) => <>{record.course.totalMarks}</>,
    },
    {
      title: "Passing Marks",
      dataIndex: "passingMarks",
      render: (text, record) => <>{record.course.passingMarks}</>,
    },
    {
      title: "Obtained Marks",
      dataIndex: "correctAnswers",
      render: (text, record) => <>{record.result.correctAnswers.length}</>,
    },
    {
      title: "Wrong Answers",
      dataIndex: "wrongAnswers",
      render: (text, record) => <>{record.result.wrongAnswers.length}</>,
    },
    {
      title: "Result",
      dataIndex: "verdict",
      render: (text, record) => <>{record.result.verdict}</>,
    },
  ];

  // console.log(reportsUserData)
  useEffect(() => {
    getUserReportData();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <PageTitle title="User Reports" />
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
        <Table columns={columns} dataSource={reportsUserData} pagination={false} />
      </div>
    </div>
  );
}

export default UserReport;
