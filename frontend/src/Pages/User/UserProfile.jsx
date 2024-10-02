import axios from "axios";
import { useState } from "react";
import {
  Form,
  Input,
  Button,
  Upload,
  Avatar,
  Descriptions,
  message,
} from "antd";
import {
  UserOutlined,
  UploadOutlined,
  EditOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { TiCancelOutline } from "react-icons/ti";
import { Loader } from "../../Components/Loader/Loader";
import { Navbar } from "../../Components/Navbar/Navbar";
import "./UserProfile.css";

const UserProfile = () => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );
  const token = localStorage.getItem("userToken");
  const [load, setLoad] = useState(false);

  const fetchUserInfo = async () => {
    if (token) {
      try {
        setLoad(true);
        const response = await axios.get(
          "https://taskify-track-your-tasks.onrender.com/user/info",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        localStorage.setItem("userData", JSON.stringify(response?.data?.user));
        setLoad(false);
      } catch (error) {
        console.error("Failed to fetch user info", error);
        setLoad(false);
      }
    }
  };

  const handleUpload = async (info) => {
    const formData = new FormData();
    formData.append("userId", profile?._id);
    formData.append("image", info.file);

    try {
      setLoad(true);
      const response = await axios.post(
        "https://taskify-track-your-tasks.onrender.com/upload/avatar",
        formData
      );
      if (response) {
        fetchUserInfo();
        setImageUrl(response?.data?.user?.avatar);
        setLoad(false);
        message.success("Avatar uploaded successfully");
      }
    } catch (error) {
      message.error("OOPS! Something went wrong");
      setLoad(false);
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    form.setFieldsValue(profile);
  };

  const onFinish = async (values) => {
    setProfile({
      ...values,
      avatar: imageUrl || profile.avatar,
    });
    try {
      setLoad(true);
      const response = await axios.patch(
        "https://taskify-track-your-tasks.onrender.com/user/update",
        {
          userId: profile?._id,
          firstName: values?.firstName,
          lastName: values?.lastName,
          email: values?.email,
        }
      );
      if (response) {
        fetchUserInfo();
        message.success("Profile updated successfully!");
        setLoad(false);
      }
    } catch (error) {
      message.error("OOPS! Something went wrong");
      setLoad(false);
    }
    setIsEditing(false);
  };

  return (
    <>
      <Navbar />
      <div className="user-profile-container">
        {load ? (
          <Loader />
        ) : (
          <div className="user-profile-content">
            <h2>User Profile</h2>
            <div className="avatar-section">
              <Avatar
                size={100}
                icon={<UserOutlined />}
                src={imageUrl || profile?.avatar}
              />
              {isEditing && (
                <Upload
                  name="avatar"
                  showUploadList={false}
                  beforeUpload={() => false}
                  onChange={handleUpload}
                >
                  <Button icon={<UploadOutlined />}>
                    Upload Profile Picture
                  </Button>
                </Upload>
              )}
            </div>
            {isEditing ? (
              <Form
                form={form}
                name="userProfile"
                onFinish={onFinish}
                layout="vertical"
                className="user-profile-form"
              >
                <Form.Item
                  name="firstName"
                  label="First Name"
                  rules={[
                    {
                      required: true,
                      message: "Please input your first name!",
                    },
                  ]}
                >
                  <Input placeholder="First Name" />
                </Form.Item>
                <Form.Item
                  name="lastName"
                  label="Last Name"
                  rules={[
                    { required: true, message: "Please input your last name!" },
                  ]}
                >
                  <Input placeholder="Last Name" />
                </Form.Item>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                  ]}
                >
                  <Input placeholder="Email" />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={<SaveOutlined />}
                  >
                    Save Profile
                  </Button>
                </Form.Item>
              </Form>
            ) : (
              <Descriptions title="User Info">
                <Descriptions.Item label="First Name">
                  {profile?.firstName}
                </Descriptions.Item>
                <Descriptions.Item label="Last Name">
                  {profile?.lastName}
                </Descriptions.Item>
                <Descriptions.Item label="Email">
                  {profile?.email}
                </Descriptions.Item>
              </Descriptions>
            )}
            <Button
              type="default"
              onClick={toggleEdit}
              icon={isEditing ? <TiCancelOutline /> : <EditOutlined />}
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default UserProfile;
