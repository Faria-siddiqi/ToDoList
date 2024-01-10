import "./App.css";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [item, setItem] = useState("");
  const [tasks, setTasks] = useState([]);
  const [updateItem, setUpdateItem] = useState(null);

  const handleKey = (event) => {
    if (event.key === "Enter") {
      handleAction();
    }
  };
  const handleAction = () => {
    const notify = () => toast.success("Updated successfully");

    if (updateItem !== null) {
      updateTask();
      return notify();
    } else {
      addTask();
    }
  };

  const addTask = () => {
    const notify = () => toast.error("Please Enter any task");
    if (!item) return notify();
    if (item.trim() !== "") {
      setTasks([...tasks, item]);
      setItem(" ");
    }
  };

  const deleteTask = (index) => {
    const notify = () => toast.success("Task Deleted");

    const newTask = [...tasks];
    newTask.splice(index, 1);
    setTasks(newTask);
    return notify();
  };
  const updateTask = () => {
    if (updateItem !== null && item.trim() !== "") {
      const editTask = [...tasks];
      editTask[updateItem] = item;
      setTasks(editTask);
      setUpdateItem(null);
      setItem("");
    }
  };

  const editing = (index) => {
    setUpdateItem(index);
    setItem(tasks[index]);
  };

  return (
    <div className="Container">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <div className="content">
        <h1>
          Br<span className="first">ig</span>
          <span className="second">h</span><span className="third">t </span>
          <span className="forth">Task</span>
        </h1>
        <h2>To Do List</h2>
        <input
          type="text"
          onChange={(e) => setItem(e.target.value)}
          onKeyDown={handleKey}
          value={item}
          placeholder="Enter any task"
        />
        <button className="btn" onClick={addTask}>
          Add Task
        </button>

        <TodoList tasks={tasks} deleteTask={deleteTask} editing={editing} />
      </div>
    </div>
  );
}

const TodoList = ({ tasks, deleteTask, editing }) => {
  return (
    <div className="listContainer">
      {tasks.map((task, index) => (
        <div key={index} className="card">
          <span>{task}</span>
          <div className="btns">
            <button onClick={() => editing(index)}>update</button>
            <button onClick={() => deleteTask(index)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
