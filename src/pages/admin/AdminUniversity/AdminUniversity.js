import React, { useEffect, useState } from "react";
import PageTitle from "../../../components/PageTitle";
import { Table, message } from "antd";
import { useNavigate } from "react-router-dom";
import {
  deleteUniversityById,
  getAllUniversity,
} from "../../../apicalls/university";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";

function AdminUniversity() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [universityData, setUniversityData] = useState([]);

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getAllUniversity();
      dispatch(HideLoading());
      if (response.success) {
        // message.success(response.message);
        setUniversityData(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  console.log(universityData)
  const deleteUniversity = async (universityId) => {
    try {
      dispatch(ShowLoading());
      const response = await deleteUniversityById(universityId);
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const universitycolumn = [
    {
      title: "University Name",
      dataIndex: "name",
      render: (text, record) => {
        return `${record.name}`;
      },
    },
    {
      title: "College List",
      dataIndex: "colleges",
      render: (text, record) =>  {
        return record.colleges.length === 0 ? "No College " 
        : Object.keys(record.colleges).map((_id, index) => {
          return (
            <div key={_id}>
              {/* Add a key attribute for each rendered div */}
              {record.colleges[_id].name}
            </div>
          );
        });
      },
    },
    // {
    //   title: "Person",
    //   dataIndex: "person",
    //   render: (text, record) => {
    //     return `${record.person}`;
    //   },
    // },
    {
      title: "Contact No:",
      dataIndex: "number",
      render: (text, record) => (
        <a href={`tel:${record.number}`}>{record.number}</a>
      ),
    },
    {
      title: "Address",
      dataIndex: "address",
      render: (text, record) => {
        return `${record.address}`;
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (text, record) => (
        <a href={`mailto:${record.email}`}>{record.email}</a>
      ),
    },
    {
      title: "Website Link",
      dataIndex: "link",
      render: (text, record) => (
        <a
          href={`http://${record.link}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {record.link}
        </a>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div className="flex gap-2">
          <i
            className="ri-pencil-line"
            onClick={() => navigate(`/admin/university/edit/${record._id}`)}
          ></i>
          <i
            className="ri-delete-bin-line"
            onClick={() => deleteUniversity(record._id)}
          ></i>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  // console.log(universityData);
  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title="Admin Universities Details" />
        <button
          className="primary-outlined-btn flex items-center"
          onClick={() => navigate("/admin/university/add")}
        >
          <i className="ri-add-line"></i>
          Add University
        </button>
      </div>
      <div className="divider"></div>
      <div
        style={{
          overflowY: "auto",
          overflowX: "hidden",
          maxHeight: "388px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          padding: "8px",
          marginTop: "10px",
        }}
      >
        <Table columns={universitycolumn} dataSource={universityData} />
      </div>
    </div>
  );
}

export default AdminUniversity;
