import React, { useEffect, useState } from "react";
import PageTitle from "../../../components/PageTitle";
import { Table, message } from "antd";
import { Link } from "react-router-dom";
import { getAllUserInfo } from "../../../apicalls/users";
import moment from "moment";

function AdminProfiles() {
  const [user, setUser] = useState([]);

  const getUsersData = async () => {
    try {
      const response = await getAllUserInfo();
      if (response.success) {
        // message.success(response.message);
        setUser(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const userProfilesColumns = [
    {
      title: "User Name",
      dataIndex: "name",
    },
    {
      title: "Email Name",
      dataIndex: "email",
    },
    {
      title: "Mobile No:",
      dataIndex: "number",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (text, record) => (
        <>{moment(record.createdAt).format("DD-MM-YYYY hh:mm:ss")}</>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <>
          <div className="flex gap-2 items-center">
            <Link to={`/admin/profiles/${record._id}`}>
            <div className="flex gap-1 items-center viewProfile">
              <i className="ri-eye-line"></i>
              View Profile
            </div>
            </Link>
            <i
              className="ri-pencil-line"
              onClick={() => {
                console.log("Edit Profile");
              }}
            ></i>
            <i
              className="ri-delete-bin-line"
              onClick={() => {
                console.log("Delete Profile");
              }}
            ></i>
          </div>
        </>
      ),
    },
  ];

  useEffect(() => {
    getUsersData();
  }, []);

  return (
    <div>
      <PageTitle title="User Profiles" />
      <div className="divider"></div>
      <div
        style={{
          overflowY: "auto",
          overflowX: "hidden",
          height: "388px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          padding: "8px",
        }}
      >
        <Table
          columns={userProfilesColumns}
          dataSource={user}
          pagination={false}
        />
      </div>
    </div>
  );
}

export default AdminProfiles;
