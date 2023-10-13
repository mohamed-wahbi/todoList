import React, { useEffect, useState } from 'react';
import { AiOutlineDelete, AiOutlineCheck } from 'react-icons/ai';
import './App.css';

const App = () => {
  const [allTodos, setAllTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescrip, setNewDescrip] = useState("");
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [completedTodo, setCompletedTodo] = useState([]);

  useEffect(() => {
    let todoSaved = JSON.parse(localStorage.getItem("todolist"));
    let savedCompletedTodo = JSON.parse(localStorage.getItem("completedTodos"));

    if (todoSaved) {
      setAllTodos(todoSaved);
    }

    if (savedCompletedTodo) {
      setCompletedTodo(savedCompletedTodo);
    }
  }, []);

  const addTodo = () => {
    if (newTitle && newDescrip) {
      let newTodos = {
        title: newTitle,
        description: newDescrip
      };

      let updatedTodos = [...allTodos, newTodos];
      setAllTodos(updatedTodos);

      localStorage.setItem('todolist', JSON.stringify(updatedTodos));
      setNewTitle("");
      setNewDescrip("");
    }
  };

  const removeTodo = (index) => {
    let updatedTodos = [...allTodos];
    updatedTodos.splice(index, 1);
    localStorage.setItem("todolist", JSON.stringify(updatedTodos));
    setAllTodos(updatedTodos);
  };

  const handleComplete = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let fullTimeGet = `${dd}-${mm}-${yyyy} at ${h}:${m}:${s}`;

    let filteredItem = {
      ...allTodos[index],
      fullTimeGet: fullTimeGet
    };

    let updatedCompleteArr = [...completedTodo, filteredItem];
    setCompletedTodo(updatedCompleteArr);
    removeTodo(index);
    localStorage.setItem('completedTodos', JSON.stringify(updatedCompleteArr));
  };

  const removeComplitedTodo = (index) => {
    let updatedTodos = [...completedTodo];
    updatedTodos.splice(index, 1);
    localStorage.setItem("completedTodos", JSON.stringify(updatedTodos));
    setCompletedTodo(updatedTodos);
  }

  return (
    <div className='App'>
      <h1 className='title'>To Do List</h1>
      <div className='todoWrapper'>
        <div className='todoInput'>
          <label>Title :</label>
          <input type='text' placeholder="What's the task title?" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
        </div>
        <div className='todoInput'>
          <label>Description :</label>
          <input type='text' placeholder="What's the task description?" value={newDescrip} onChange={(e) => setNewDescrip(e.target.value)} />
        </div>
        <div className='todoInputBtn'>
          <button type='button' className='primaryBtn' onClick={addTodo}>Add</button>
        </div>
      </div>
      <hr style={{ color: "gray", width: "100%" }} />
      <div className='btnArea'>
        <button type='button' className={`secondaryBtn ${!isCompleteScreen && "active"}`} onClick={() => setIsCompleteScreen(false)}>Todo</button>
        <button type='button' className={`secondaryBtn ${isCompleteScreen && "active"}`} onClick={() => setIsCompleteScreen(true)}>Completed</button>
      </div>
      {isCompleteScreen === false && allTodos.map((item, index) => (
        <div className='todoList' key={index}>
          <div className='todoListItem'>
            <h1>{item.title}</h1>
            <p>{item.description}</p>
          </div>
          <div className='todoListIcon'>
            <AiOutlineDelete className='deleteIcon' onClick={() => removeTodo(index)} />
            <AiOutlineCheck className='checkIcon' title='completed?' onClick={() => handleComplete(index)} />
          </div>
        </div>
      ))}
      {isCompleteScreen === true && completedTodo.map((item, index) => (
        <div className='todoList' key={index}>
          <div className='todoListItem'>
            <h1>{item.title}</h1>
            <p>{item.description}</p>
            <p><small>Completed on: {item.fullTimeGet}</small></p>
          </div>
          <div className='todoListIcon'>
            <AiOutlineDelete className='deleteIcon' onClick={() => removeComplitedTodo(index)} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;