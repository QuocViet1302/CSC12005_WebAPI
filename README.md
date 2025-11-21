# 📄 Hướng Dẫn Chạy Dự Án Task Manager

## 🎯 Tổng Quan Dự Án

Dự án **Task Manager** được cấu trúc thành ba thành phần chính:

* **Backend**: 💻 .NET 8 Web API
* **Frontend**: ⚛️️ React + Vite
* **Database**: 🗄️ SQL Server

### 🔌 Cổng (Port) Mặc Định

* **Backend**: `http://localhost:5123`
* **Frontend**: `http://localhost:5173`

---

## 1️⃣ Yêu Cầu Hệ Thống

Đảm bảo cài đặt các công cụ sau trước khi bắt đầu:

* **Node.js** $\ge 18$
* **.NET 8 SDK**
* **SQL Server Express / Developer**
* **Vite 5**

---

## 2️⃣ Cấu Hình Database (MySql)

### ✔ Tạo Database

Mở **MySql** và chạy lệnh SQL sau để tạo database:

```sql
CREATE DATABASE TaskDb;
```
---
## 3️⃣ Chạy Backend

Trong terminal:


```
cd TaskApi
dotnet run
```


### Backend chạy tại:
### 👉 http://localhost:5123
---
4️⃣ Chạy FE
Trong terminal:

```
cd task-client
npm install
npm run dev
```
### Frontend chạy tại:
### 👉 http://localhost:5173
