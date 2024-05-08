import { Form, Modal, Select, message } from "antd";
import React from "react";
import { addQuestionToExam, editQuestionById } from "../../../apicalls/exams";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";

function AddEditQuestion({
  showAddEditQuestionModel,
  setShowAddEditQuestionModel,
  examId,
  refreshData,
  selectedQuestion,
  setSelectedQuestion,
}) {
  // console.log(examId);
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    // console.log(values);
    try {
      dispatch(ShowLoading());
      const requiredPayload = {
        name: values.name,
        level: values.level,
        correctOption: values.correctOption,
        options: {
          A: values.A,
          B: values.B,
          C: values.C,
          D: values.D,
        },
        exam: examId,
      };
      let response;
      if (selectedQuestion) {
        response = await editQuestionById({
          ...requiredPayload,
          questionId: selectedQuestion._id,
        });
      } else {
        response = await addQuestionToExam(requiredPayload);
      }
      if (response.success) {
        refreshData();
        setShowAddEditQuestionModel(false);
        message.success(response.message);
      } else {
        message.error(response.message);
      }
      setSelectedQuestion(null);
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <>
      <Modal
        title={selectedQuestion ? "Edit Question" : "Add Question"}
        visible={showAddEditQuestionModel}
        footer={false}
        onCancel={() => {
          setShowAddEditQuestionModel(false);
          setSelectedQuestion(null);
        }}
      >
        <Form
          onFinish={onFinish}
          layout="vertical"
          initialValues={{
            name: selectedQuestion?.name,
            level: selectedQuestion?.level,
            A: selectedQuestion?.options?.A,
            B: selectedQuestion?.options?.B,
            C: selectedQuestion?.options?.C,
            D: selectedQuestion?.options?.D,
            correctOption: selectedQuestion?.correctOption,
          }}
        >
          <Form.Item name="name" label="Question">
            <input type="text" />
          </Form.Item>
          <Form.Item name="level" label="Level">
            <Select>
              <Select.Option value="Easy">Easy</Select.Option>
              <Select.Option value="Medium">Medium</Select.Option>
              <Select.Option value="Hard">Hard</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="correctOption" label="Correct Option"  className="mt-1">
            <input type="text" />
          </Form.Item>

          <div className="flex gap-4">
            <Form.Item name="A" label="Option A">
              <input type="text" />
            </Form.Item>
            <Form.Item name="B" label="Option B">
              <input type="text" />
            </Form.Item>
          </div>
          <div className="flex gap-4">
            <Form.Item name="C" label="Option C">
              <input type="text" />
            </Form.Item>
            <Form.Item name="D" label="Option D">
              <input type="text" />
            </Form.Item>
          </div>

          <div className="flex justify-end gap-1 padding-right-addquestion">
            <button
              className="primary-outlined-btn"
              type="button"
              onClick={() => setShowAddEditQuestionModel(false)}
            >
              Cancel
            </button>
            <button className="primary-contained-btn">Save</button>
          </div>
        </Form>
      </Modal>
    </>
  );
}

export default AddEditQuestion;
