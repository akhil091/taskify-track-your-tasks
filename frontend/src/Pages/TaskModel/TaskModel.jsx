/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";
import { Modal, Input, Button, Form, message } from "antd";
import { Loader } from "../../Components/Loader/Loader";

const TaskModal = ({ visible, onClose, fetchTaskData }) => {
  const [form] = Form.useForm();
  const [load, setLoad] = useState(false);

  const validateNotEmpty = (rule, value) => {
    if (!value || value.trim() === "") {
      return Promise.reject("This field cannot be empty or whitespace only!");
    }
    return Promise.resolve();
  };

  const handleSubmit = (values) => {
    const token = localStorage.getItem("userToken");

    if (!token) {
      message.error("User is not authenticated!");
      return;
    }
    setLoad(true);
    axios
      .post(
        "https://taskify-track-your-tasks.onrender.com/task/add",
        {
          ...values,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        message.success("Task Added Successfully!");
        onClose();
        fetchTaskData();
        form.resetFields();
        setLoad(false);
      })
      .catch(() => {
        message.error("OOPS! Something Went Wrong!!");
        setLoad(false);
      });
  };

  return (
    <>
      {load ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <Loader />
        </div>
      ) : (
        <Modal
          title="Add New Task"
          open={visible}
          onCancel={onClose}
          footer={null}
          centered
        >
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              name="title"
              label="Title"
              rules={[
                { required: true, message: "Task title is required!" },
                { validator: validateNotEmpty },
              ]}
            >
              <Input placeholder="Task Title" />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                { required: true, message: "Task description is required!" },
                { validator: validateNotEmpty },
              ]}
            >
              <Input.TextArea rows={4} placeholder="Task Description" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button style={{ marginLeft: "10px" }} onClick={onClose}>
                Cancel
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      )}
    </>
  );
};

export default TaskModal;
