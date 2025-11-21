import { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";

function EditTaskModal({ close, reload, task }) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const today = new Date().toISOString().split("T")[0]; 

  useEffect(() => {
    setTitle(task.title);
    setDueDate(task.dueDate ? task.dueDate.split("T")[0] : "");
    setStatus(task.status);
  }, [task]);

  const handleUpdate = async () => {
    if (!title.trim() || !dueDate) {
      setError("Tên task và deadline không được để trống");
      return;
    }

    try {
      await axios.put(`http://localhost:5123/api/tasks/${task.id}`, {
        ...task,
        title: title.trim(),
        dueDate,
        status,
      });

      setError("");
      reload();
      close();
    } catch (err) {
      console.error(err);
      setError("Không thể cập nhật task. Vui lòng thử lại.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Sửa Task</h3>

        <input value={title} onChange={(e) => setTitle(e.target.value)} />

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          min={today} 
        />

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Đang làm">Đang làm</option>
          <option value="Hoàn thành">Hoàn thành</option>
        </select>

        {error && <p className="error">{error}</p>}

        <div className="modal-actions">
          <button className="cancel-btn" onClick={close}>Hủy</button>
          <button className="save" onClick={handleUpdate}>Cập nhật</button>
        </div>
      </div>
    </div>
  );
}

export default EditTaskModal;
