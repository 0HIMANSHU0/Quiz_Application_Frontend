import React, { useState, useEffect } from "react";
import PageTitle from "../../../components/PageTitle";
import { useNavigate } from "react-router-dom";
import { Table, message } from "antd";
import { deleteCourseById, getAllCourse } from "../../../apicalls/courses";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
import moment from "moment";

function AdminCourse() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [courseData, setCourseData] = useState(null);



  const getCourseData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getAllCourse();
      if (response.success) {
        // message.success(response.message);
        setCourseData(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const deleteCourse = async (courseId) => {
    try {
      const response = await deleteCourseById({ courseId });
      if (response.success) {
        message.success(response.message);
        getCourseData();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const courseColumns = [
    {
      title: "Course Name",
      dataIndex: "name",
      render: (text, record) => <>{record.name}</>,
    },
    {
      title: "Course Description",
      dataIndex: "descripiton",
      render: (text, record) => <>{record.description}</>,
    },
    {
      title: "Subjects",
      dataIndex: "exams",
      render: (text, record) => {
        return Object.keys(record.exams).map((_id, index) => {
          return (
            <div key={_id}>
              {" "}
              {/* Add a key attribute for each rendered div */}
              {index + 1}:{record.exams[_id].name}
            </div>
          );
        });
      },
    },
    {
      title: "Scheduled Date and Time",
      dataIndex: "scheduledDate",
      render: (text, record) => (
        <>{moment(record.scheduledDate).format("DD-MM-YYYY hh:mm:ss")}</>
      ),
    },
    {
      title: "Level",
      dataIndex: "level",
      render: (text, record) => <>{record.level}</>,
    },
    {
      title: "Questions",
      dataIndex: "numberOfQuestions",
      render: (text, record) => <>{record.numberOfQuestions}</>,
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div className="flex gap-2">
          <i
            className="ri-pencil-line"
            onClick={() => navigate(`/admin/courses/edit/${record._id}`)}
          ></i>
          <i
            className="ri-delete-bin-line"
            onClick={() => {
              deleteCourse(record._id);
            }}
          ></i>
        </div>
      ),
    },
  ];
  // console.log(courseData);

  useEffect(() => {
    getCourseData();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title="Courses" />
        <button
          className="primary-outlined-btn flex items-center"
          onClick={() => navigate("/admin/courses/add")}
        >
          <i className="ri-add-line"></i>
          Create Course
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
        <Table
          columns={courseColumns}
          dataSource={courseData}
          pagination={false}
        />
      </div>
    </div>
  );
}

export default AdminCourse;
