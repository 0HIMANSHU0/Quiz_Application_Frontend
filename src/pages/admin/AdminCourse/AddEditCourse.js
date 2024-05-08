import React, { useState } from "react";
import PageTitle from "../../../components/PageTitle";
import { Col, Form, Row, Select, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { getAllExams } from "../../../apicalls/exams";
import { useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  addCourse,
  editCourseById,
  getSingleCourseById,
} from "../../../apicalls/courses";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";

function AddEditCourse() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const [exams, setExams] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [scheduledDate, setScheduledDate] = useState(new Date());

  const handleDateChange = (date) => {
    setScheduledDate(date);
  };

  const getExams = async () => {
    try {
      const response = await getAllExams();
      if (response.success) {
        setExams(response.data);
        // message.success(response.message);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  // Get the Single Course for the Edit
  const getSingleCourse = async () => {
    try {
      const response = await getSingleCourseById({ courseId: params.id });
      if (response.success) {
        // message.success(response.message);
        setSelectedCourse(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const onFinish = async (values) => {
    console.log("values", values)
    try {
      dispatch(ShowLoading());
      const requiredPayload = {
        name: values.name,
        description: values.description,
        exams: values.exams,
        level: values.level,
        numberOfQuestions: values.numberOfQuestions,
        passingMarks: values.passingMarks,
        totalMarks: values.totalMarks,
        scheduledDate: values.scheduledDate,
      };
      // console.log("requiredPayload", requiredPayload)
      let response;
      if (params.id) {
        response = await editCourseById({courseId: params.id, ...requiredPayload});
      } else {
        response = await addCourse(requiredPayload);
      }
      if (response.success) {
        // console.log(response);
        // message.success(response.message);
        navigate("/admin/courses");
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
    getExams();
    if (params.id) {
      getSingleCourse();
    }
    // eslint-disable-next-line
  }, []);

  // console.log(selectedCourse);
  return (
    <div>
      <PageTitle title={params.id ? "Edit Course" : "Create Course"} />
      <div className="divider"></div>
      {(selectedCourse || !params.id) && (
        <div>
          <Form
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              ...selectedCourse,
              exams: selectedCourse?.exams.map((exam) => exam._id) || [],
            }}
          >
            <Row gutter={[10, 10]}>
              <Col span={8}>
                <Form.Item name="name" label="Course Name">
                  <input type="text"></input>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="description" label="Course Description">
                  <input type="text"></input>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="exams" label="Exam List">
                  <Select
                    mode="multiple"
                    placeholder="Select Exams"
                    style={{ width: "100%", marginBottom: "16px" }}
                  >
                    {exams.map((exam) => (
                      <Select.Option key={exam._id} value={exam?._id}>
                        {exam?.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="numberOfQuestions" label="No: of Questions">
                  <input type="number"></input>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="totalMarks" label="Total Marks">
                  <input type="number"></input>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="passingMarks" label="Passing Marks">
                  <input type="number"></input>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="scheduledDate" label="Scheduled Date and Time">
                  <DatePicker
                    selected={scheduledDate}
                    onChange={handleDateChange}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="MMMM d, yyyy h:mm aa"
                    id="scheduledDate"
                    name="scheduledDate"
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="level" label="Difficulty level of Questions">
                  <Select>
                    <Select.Option value="Easy">Easy</Select.Option>
                    <Select.Option value="Medium">Medium</Select.Option>
                    <Select.Option value="Hard">Hard</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <div className="flex justify-end gap-2">
              <button
                className="primary-outlined-btn"
                type="button"
                onClick={() => navigate("/admin/courses")}
              >
                Cancel
              </button>
              <button className="primary-contained-btn savebtn" type="submit">
                Save
              </button>
            </div>
          </Form>
        </div>
      )}
    </div>
  );
}

export default AddEditCourse;
