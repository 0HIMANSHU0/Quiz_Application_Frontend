import React, { useEffect, useState } from "react";
import PageTitle from "../../../components/PageTitle";
import { Col, Form, Row, message, Tabs, Table } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import { useNavigate, useParams } from "react-router-dom";
import AddEditCollege from "./AddEditCollege";
import {
  addUniversity,
  deleteCollegeById,
  editUniversityById,
  getSingleUniversity,
} from "../../../apicalls/university";
import { useDispatch } from "react-redux";
import { ShowLoading, HideLoading } from "../../../redux/loaderSlice";

function AddEditUniversity() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const [universityData, setUniversityData] = useState(null);
  const [showAddEditCollegeModel, setShowAddEditCollegeModel] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState(null);

  const onFinish = async (values) => {
    try {
      const requiredPayload = {
        name: values.name,
        person: values.person,
        number: values.number,
        email: values.email,
        link: values.link,
        address: values.address,
      };
      let response;
      if (params.id) {
        response = await editUniversityById({
          universityId: params.id,
          ...requiredPayload,
        });
      } else {
        response = await addUniversity(requiredPayload);
      }
      if (response.success) {
        // message.success(response.message);
        navigate("/admin/universities");
        setUniversityData(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const getUniversityData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getSingleUniversity({ universityId: params.id });
      if (response.success) {
        // message.success(response.message);
        setUniversityData(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const deleteCollegeToUniversity = async (collegeId) => {
    try {
      const response = await deleteCollegeById({
        collegeId,
        universityId: params.id,
      });
      if (response.success) {
        message.success(response.message);
        getUniversityData();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const collegeColumn = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Programs",
      dataIndex: "programs",
      render: (text, record) => (
        <div>
          {record.programs.map((program, index) => (
            <div key={index}>{program}</div>
          ))}
        </div>
      ),
    },
    {
      title: "Location",
      dataIndex: "address",
    },
    {
      title: "Website",
      dataIndex: "website",
      render: (text, record) => (
        <a
          href={`http://${record.link}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {record.website}
        </a>
      ),
    },
    {
      title: "Email ID",
      dataIndex: "email",
      render: (text, record) => (
        <a href={`mailto:${record.email}`}>{record.email}</a>
      ),
    },
    {
      title: "Contact",
      dataIndex: "number",
      render: (text, record) => (
        <a href={`tel:${record.number}`}>{record.number}</a>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div className="flex gap-2">
          <i
            className="ri-pencil-line"
            onClick={() => {
              setSelectedCollege(record);
              setShowAddEditCollegeModel(true);
            }}
          ></i>
          <i
            className="ri-delete-bin-line"
            onClick={() => deleteCollegeToUniversity(record._id)}
          ></i>
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (params.id) {
      getUniversityData();
    }
    //eslint-disable-next-line
  }, [params.id]);

  return (
    <div>
      <PageTitle
        title={params.id ? "Edit University Details" : "Add Univeristy Details"}
      />
      <div className="divider"></div>
      <div>
        {(universityData || !params.id) && (
          <Form
            layout="vertical"
            onFinish={onFinish}
            initialValues={universityData}
          >
            <Tabs defaultActiveKey="1">
              <TabPane tab="University-Details" key="1">
                {" "}
                <Row gutter={[10, 10]}>
                  <Col span={8}>
                    <Form.Item name="name" label="University Name">
                      <input type="text" />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item name="person" label="Contact Person">
                      <input type="text" />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item name="number" label="Contact No:">
                      <input type="text" />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item name="email" label="Email Id">
                      <input type="email" />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item name="link" label="Website Link">
                      <input type="text" />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item name="address" label="University Address">
                      <input type="text" />
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
                  <button
                    className="primary-contained-btn savebtn"
                    type="submit"
                  >
                    Save
                  </button>
                </div>
              </TabPane>
              {params.id && (
                <TabPane tab="Colleges" key="2">
                  <div className="flex justify-end items-center gap-1">
                    <button
                      className="primary-outlined-btn addQuestion"
                      type="button"
                      onClick={() => setShowAddEditCollegeModel(true)}
                    >
                      Add Colleges
                    </button>
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
                      columns={collegeColumn}
                      dataSource={universityData?.colleges || []}
                    />
                  </div>
                </TabPane>
              )}
            </Tabs>
          </Form>
        )}
        {showAddEditCollegeModel && (
          <AddEditCollege
            showAddEditCollegeModel={showAddEditCollegeModel}
            setShowAddEditCollegeModel={setShowAddEditCollegeModel}
            universityId={params.id}
            refreshData={getUniversityData}
            selectedCollege={selectedCollege}
            setSelectedCollege={setSelectedCollege}
          />
        )}
      </div>
    </div>
  );
}

export default AddEditUniversity;
