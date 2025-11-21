import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import AddTaskModal from "./components/AddTaskModal";
import EditTaskModal from "./components/EditTaskModal";

function App() {
  const [tasks, setTasks] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const [statusFilter, setStatusFilter] = useState("Tất cả");

  const itemsPerPage = 6; 
  const [currentPage, setCurrentPage] = useState(1);

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5123/api/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5123/api/tasks/${id}`);
    fetchTasks();
  };

  const openEditModal = (task) => {
    setSelectedTask(task);
    setShowEditModal(true);
  };

  const filteredTasks =
    statusFilter === "Tất cả"
      ? tasks
      : tasks.filter((t) => t.status === statusFilter);

  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);
  const currentTasks = filteredTasks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const gotoPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="container">
      <h1>Quản lý Task cá nhân</h1>

      <button className="add-btn" onClick={() => setShowAddModal(true)}>
        Thêm Task
      </button>

      {/* Bộ lọc */}
      <div className="filter-box">
        <label>Trạng thái:</label>
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1); // reset về trang 1 khi lọc
          }}
        >
          <option value="Tất cả">Tất cả</option>
          <option value="Đang làm">Đang làm</option>
          <option value="Hoàn thành">Hoàn thành</option>
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Tên Task</th>
            <th>Deadline</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>

        <tbody>
          {currentTasks.map((t) => (
            <tr key={t.id}>
              <td>{t.title}</td>
              <td>{new Date(t.dueDate).toLocaleDateString("vi-VN")}</td>
              <td>{t.status}</td>
              <td>
                {t.status === "Đang làm" ? (
                  <button className="edit" onClick={() => openEditModal(t)}>
                    Sửa
                  </button>
                ) : (
                  <button className="delete" onClick={() => deleteTask(t.id)}>
                    Xóa
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={() => gotoPage(currentPage - 1)}>{"<"}</button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={currentPage === i + 1 ? "active" : ""}
            onClick={() => gotoPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button onClick={() => gotoPage(currentPage + 1)}>{">"}</button>
      </div>

      {showAddModal && (
        <AddTaskModal close={() => setShowAddModal(false)} reload={fetchTasks} />
      )}

      {showEditModal && (
        <EditTaskModal
          close={() => setShowEditModal(false)}
          reload={fetchTasks}
          task={selectedTask}
        />
      )}
    </div>
  );
}

export default App;
