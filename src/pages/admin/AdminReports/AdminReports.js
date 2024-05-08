import React, { useEffect, useRef, useState } from "react";
import PageTitle from "../../../components/PageTitle";
import { Table, message, Button } from "antd";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
import { getAllReports } from "../../../apicalls/reports";
import moment from "moment";
import { DownloadOutlined } from "@ant-design/icons";
// import { useReactToPrint } from "react-to-print";
// import html2pdf from "html2pdf.js";

function AdminReports() {
  const [reportsData, setReportsData] = useState([]);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const tableRef = useRef();

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getAllReports(search);
      if (response.success) {
        // message.success(response.message);
        setReportsData(response.data);
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
      title: "Course Name",
      dataIndex: "name",
      render: (text, record) => <>{record.course.name}</>,
    },
    {
      title: "User Name",
      dataIndex: "name",
      render: (text, record) => <>{record.user.name}</>,
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

  const printTable = () => {
    const content = document.getElementById("reportsTable"); // Replace "reportsTable" with the actual ID of your table container
    const printWindow = window.open("", "_blank");

    // Add custom styles for the print layout
    // Add custom styles for the print layout
    printWindow.document.write(`
    <html>
      <head>
        <style>
          body {
            font-family: 'Arial, sans-serif';
            background-color: #f8f9fa;
            color: #495057;
            padding: 20px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
          }
          th, td {
            border: 1px solid #ced4da;
            padding: 12px;
            text-align: left;
          }
          th {
            background-color: #347baf;
            color: #ffffff;
          }
          tr:nth-child(even) {
            background-color: #f2f2f2;
          }
        </style>
      </head>
      <body>
        ${content.innerHTML}
      </body>
    </html>
  `);

    printWindow.document.close();
    printWindow.print();
  };

  // const handleDownloadPDF = () => {
  //   const element = tableRef.current;
  //   html2pdf(element);
  // };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, [search]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title="User Reports" />
        <div>
          <Button
            className="primary-contained-btn addQuestion"
            icon={<DownloadOutlined />}
            onClick={printTable}
          >
            Print Results
          </Button>
        </div>
      </div>
      <div className="divider"></div>
      <div className="flex gap-1 ">
        <input
          type="text"
          placeholder="User Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="primary-outlined-btn w-25"
          onClick={() => {
            setSearch("");
            getData();
          }}
        >
          Clear Filters
        </button>
        <button
          className="primary-contained-btn"
          onClick={() => getData(search)}
        >
          Search
        </button>
      </div>
      <div
        id="reportsTable"
        style={{
          overflowY: "auto",
          overflowX: "hidden",
          maxHeight: "338px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          padding: "8px",
          marginTop: "10px",
        }}
      >
        <Table
          columns={columns}
          dataSource={reportsData}
          pagination={false}
          ref={tableRef}
        />
      </div>
    </div>
  );
}

export default AdminReports;
