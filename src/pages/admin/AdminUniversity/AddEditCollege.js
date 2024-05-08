import React from "react";
import { Form, Modal, Select, message } from "antd";
import {
  addCollegeToUniversity,
  editCollegeToUniversity,
} from "../../../apicalls/university";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";

function AddEditCollege({
  showAddEditCollegeModel,
  setShowAddEditCollegeModel,
  universityId,
  refreshData,
  selectedCollege,
  setSelectedCollege,
}) {
  console.log(selectedCollege);
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    // console.log(values);
    try {
      dispatch(ShowLoading());
      const requiredPayload = {
        name: values.name,
        programs: values.programs,
        address: values.address,
        person: values.person,
        number: values.number,
        email: values.email,
        website: values.website,
        university: universityId,
      };
      let response;
      if (selectedCollege) {
        response = await editCollegeToUniversity({
          ...requiredPayload,
          collegeId: selectedCollege._id,
        });
      } else {
        response = await addCollegeToUniversity(requiredPayload);
      }
      if (response.success) {
        message.success(response.message);
        refreshData();
        setShowAddEditCollegeModel(false);
      } else {
        message.error(response.message);
      }
      setSelectedCollege(null);
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <div>
      <Modal
        title={"Add College"}
        visible={showAddEditCollegeModel}
        footer={false}
        onCancel={() => {
          setSelectedCollege(null);
          setShowAddEditCollegeModel(false);
        }}
      >
        <Form
          onFinish={onFinish}
          layout="vertical"
          initialValues={{
            name: selectedCollege?.name,
            programs: selectedCollege?.programs,
            person: selectedCollege?.person,
            number: selectedCollege?.number,
            email: selectedCollege?.email,
            website: selectedCollege?.website,
            address: selectedCollege?.address,
          }}
        >
          <Form.Item name="name" label="College Name">
            <input type="text" />
          </Form.Item>
          <Form.Item name="programs" label="Program List">
            <Select mode="multiple">
              <Select.Option value="MCA">MCA</Select.Option>
              <Select.Option value="MBA">MBA</Select.Option>
              <Select.Option value="M.Com">M.Com</Select.Option>
              <Select.Option value="M.A">M.A</Select.Option>
              <Select.Option value="M.Sc">M.Sc</Select.Option>
              <Select.Option value="M.Tech">M.Tech</Select.Option>
              <Select.Option value="B.Tech">B.Tech</Select.Option>
              <Select.Option value="BCA">BCA</Select.Option>
              <Select.Option value="B.Sc">B.Sc</Select.Option>
              <Select.Option value="BBA">BBA</Select.Option>
              <Select.Option value="B.A">B.A</Select.Option>
              <Select.Option value="B.Com">B.Com</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="address" label="Location">
            <input type="text" />
          </Form.Item>
          <Form.Item name="person" label="Person">
            <input type="text" />
          </Form.Item>
          <Form.Item name="number" label="Contact No:">
            <input type="text" />
          </Form.Item>
          <Form.Item name="email" label="Email ID">
            <input type="email" />
          </Form.Item>
          <Form.Item name="website" label="Website Link">
            <input type="text" />
          </Form.Item>

          <div className="flex justify-end gap-1 padding-right-addquestion">
            <button
              className="primary-outlined-btn"
              type="button"
              onClick={() => setShowAddEditCollegeModel(false)}
            >
              Cancel
            </button>
            <button className="primary-contained-btn">Save</button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}

export default AddEditCollege;
