import { useState } from "react";
import axios from "axios";
import "./style.css";

function AddTaskModal({ close, reload }) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");

  const today = new Date().toISOString().split("T")[0]; 

  const handleAdd = async () => {
    if (!title.trim() || !dueDate) {
      setError("Vui lòng nhập đầy đủ tên task và deadline");
      return;
    }

    try {
      await axios.post("http://localhost:5123/api/tasks", {
        title: title.trim(),
        dueDate,
        status: "Đang làm",
      });

      setError("");
      reload();
      close();
    } catch (err) {
      console.error(err);
      setError("Không thể tạo task. Vui lòng thử lại.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Thêm Task mới</h3>

        <input
          placeholder="Tên task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          min={today}   
        />

        {error && <p className="error">{error}</p>}

        <div className="modal-actions">
          <button className="cancel-btn" onClick={close}>Hủy</button>
          <button className="save" onClick={handleAdd}>Thêm</button>
        </div>
      </div>
    </div>
  );
}

export default AddTaskModal;
