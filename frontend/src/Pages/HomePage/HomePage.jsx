/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import lodash from "lodash";
import { Button, ConfigProvider, Space, Input, Select, message } from "antd";
import { MdOutlinePostAdd } from "react-icons/md";
import { css } from "@emotion/css";
import { Navbar } from "../../Components/Navbar/Navbar";
import TaskModal from "../TaskModel/TaskModel";
import { TaskPage } from "../TaskPage/TaskPage";
import { Loader } from "../../Components/Loader/Loader";
import "./HomePage.css";

const { Option } = Select;

const HomePage = () => {
  const token = localStorage.getItem("userToken");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("all");
  const [taskFilters, setTaskFilters] = useState({
    inProgress: undefined,
    isCompleted: undefined,
  });
  const [loading, setLoading] = useState(true);
  const [taskData, setTaskData] = useState([]);

  useEffect(() => {
    fetchUserInfo();
  }, [token]);

  useEffect(() => {
    fetchTaskData();
  }, [search, sortBy, taskFilters]);

  const fetchUserInfo = async () => {
    if (!token) return;

    try {
      setLoading(true);
      const response = await axios.get(
        "https://taskify-track-your-tasks.onrender.com/user/info",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      localStorage.setItem("userData", JSON.stringify(response?.data?.user));
    } catch (error) {
      console.error("Failed to fetch user info", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTaskData = () => {
    const params = buildFetchParams();
    setLoading(true);

    axios
      .get("https://taskify-track-your-tasks.onrender.com/task/all", {
        params,
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setTaskData(res?.data);
      })
      .catch(() => {
        message.error("OOPS! Something Went Wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const buildFetchParams = () => {
    const params = {};
    if (search) params.search = search;
    if (sortBy && sortBy !== "all") params.sortBy = sortBy;
    if (taskFilters.inProgress !== undefined)
      params.in_progress = taskFilters.inProgress;
    if (taskFilters.isCompleted !== undefined)
      params.is_completed = taskFilters.isCompleted;
    return params;
  };

  const handleSearchChange = lodash.debounce((value) => {
    setSearch(value);
  }, 300);

  const handleSortChange = (value) => {
    setSortBy(value);
    setTaskFilters({
      inProgress: value === "in_progress" ? true : undefined,
      isCompleted: value === "is_completed" ? true : undefined,
    });
  };

  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const rootPrefixCls = getPrefixCls();
  const linearGradientButton = css`
    &.${rootPrefixCls}-btn-primary:not([disabled]):not(
        .${rootPrefixCls}-btn-dangerous
      ) {
      border-width: 0;

      > span {
        position: relative;
      }

      &::before {
        content: "";
        background: linear-gradient(135deg, #6253e1, #04befe);
        position: absolute;
        inset: 0;
        opacity: 1;
        transition: all 0.3s;
        border-radius: inherit;
      }

      &:hover::before {
        opacity: 0;
      }
    }
  `;

  if (!token) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="homepage-container">
        <ConfigProvider button={{ className: linearGradientButton }}>
          <Space style={{ marginLeft: "10rem" }}>
            <Button
              type="primary"
              size="large"
              icon={<MdOutlinePostAdd />}
              onClick={() => setIsModalVisible(true)}
            >
              Add Task
            </Button>
          </Space>
        </ConfigProvider>

        <div className="filter-parent">
          <div className="search-filter-container">
            <div className="search-bar">
              <label>Search</label>
              <Input
                placeholder="Search..."
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>
            <div className="filter-select">
              <label>Sort By</label>
              <Select
                defaultValue="all"
                style={{ width: 140 }}
                onChange={handleSortChange}
              >
                <Option value="all">All</Option>
                <Option value="createdAt_asc">Recent</Option>
                <Option value="createdAt_desc">Oldest</Option>
                <Option value="in_progress">In Progress</Option>
                <Option value="is_completed">Completed</Option>
              </Select>
            </div>
          </div>
        </div>

        {loading ? (
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
          <TaskPage
            taskData={taskData}
            setTaskData={setTaskData}
            fetchTaskData={fetchTaskData}
          />
        )}

        <TaskModal
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          fetchTaskData={fetchTaskData}
        />
      </div>
    </div>
  );
};

export default HomePage;
