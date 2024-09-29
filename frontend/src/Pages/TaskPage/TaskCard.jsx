/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";
import { Draggable } from 'react-beautiful-dnd';
import { format } from "date-fns";
import { Button, Modal, Form, Input, message, Popconfirm } from "antd";
import { FaRegEye } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import "./TaskPage.css";

export const TaskCard = ({ taskData, fetchTaskData }) => {
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const token = localStorage.getItem("userToken");

  const validateNotEmpty = (rule, value) => {
    if (!value || value.trim() === "") {
      return Promise.reject("This field cannot be empty or whitespace only!");
    }
    return Promise.resolve();
  };

  const showViewModal = (task) => {
    setSelectedTask(task);
    setViewModalVisible(true);
  };

  const showEditModal = (task) => {
    setSelectedTask(task);
    setEditModalVisible(true);
  };

  const handleViewModalClose = () => {
    setViewModalVisible(false);
    setSelectedTask(null);
  };

  const handleEditModalClose = () => {
    setEditModalVisible(false);
    setSelectedTask(null);
  };

  const handleEditSubmit = (values) => {
    axios
      .patch(
        `https://voosh-assignment-4zan.onrender.com/task/edit/${selectedTask?._id}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        message.success("Task Updated Successfully");
        fetchTaskData();
        setEditModalVisible(false);
      })
      .catch(() => {
        message.error("Oops! Something went wrong!");
        setEditModalVisible(false);
      });
  };

  const DeleteTask = (taskId) => {
    return () => {
      axios
        .delete(`https://voosh-assignment-4zan.onrender.com/task/delete/${taskId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          message.success("Task Deleted Successfully");
          fetchTaskData();
        })
        .catch(() => {
          message.error("Oops! Something went wrong while deleting the task.");
        });
    };
  };

  const cancel = () => {
    message.error("Click on No");
  };

  const tasks = taskData || [];

  return (
    <div className="task-column">
      {tasks?.length > 0 ? (
        tasks?.map((ele, index) => (
          <Draggable draggableId={ele._id} index={index} key={ele._id}>
            {(provided) => (
              <div
                className="task-card"
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <p>{ele.title}</p>
                <p>{ele.description}</p>
                <p>
                  Created at: {format(new Date(ele.createdAt), "dd/MM/yyyy HH:mm")}
                </p>
                <div className="task-buttons">
                  <Popconfirm
                    title="Delete the task"
                    description="Are you sure to delete this task?"
                    onConfirm={DeleteTask(ele._id)}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button icon={<MdDelete />} className="delete-button">
                      Delete
                    </Button>
                  </Popconfirm>
                  <Button
                    icon={<CiEdit />}
                    className="edit-button"
                    onClick={() => showEditModal(ele)}
                  >
                    Edit
                  </Button>
                  <Button
                    icon={<FaRegEye />}
                    className="details-button"
                    onClick={() => showViewModal(ele)}
                  >
                    View Details
                  </Button>
                </div>

                <Modal
                  title="Task Details"
                  open={viewModalVisible}
                  onOk={handleViewModalClose}
                  onCancel={handleViewModalClose}
                >
                  {selectedTask && (
                    <>
                      <p>
                        <strong>Title:</strong> {selectedTask.title}
                      </p>
                      <p>
                        <strong>Description:</strong> {selectedTask.description}
                      </p>
                      <p>
                        <strong>Created at:</strong>{" "}
                        {format(new Date(selectedTask.createdAt), "dd/MM/yyyy HH:mm")}
                      </p>
                    </>
                  )}
                </Modal>

                <Modal
                  title="Edit Task"
                  open={editModalVisible}
                  onCancel={handleEditModalClose}
                  footer={null}
                >
                  <Form
                    layout="vertical"
                    initialValues={selectedTask}
                    onFinish={handleEditSubmit}
                  >
                    <Form.Item
                      name="title"
                      label="Title"
                      rules={[
                        { required: true, message: "Task title is required!" },
                        { validator: validateNotEmpty },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name="description"
                      label="Description"
                      rules={[
                        {
                          required: true,
                          message: "Task description is required!",
                        },
                        { validator: validateNotEmpty },
                      ]}
                    >
                      <Input.TextArea rows={4} />
                    </Form.Item>
                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        Save Changes
                      </Button>
                    </Form.Item>
                  </Form>
                </Modal>
              </div>
            )}
          </Draggable>
        ))
      ) : (
        <p style={{textAlign:"center"}}>No Task Added</p>
      )}
    </div>
  );
};
