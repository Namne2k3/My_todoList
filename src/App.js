import logo from './logo.svg';
import './App.css';
import React from 'react';

import { useState } from 'react';

function ToDoList () {
  const [inputValue,setInputValue] = useState("");
  const [allTask,setAllTask] = useState([]);
  const [currentIndex,setCurrentIndex] = useState('');
  const [isEdit,setIsEdit] = useState(false) ;
  const regexBackSpace = /[a-zA-Z0-9]+/;
  const handleChange = (e) => {
    setInputValue(e.target.value);
    if ( isEdit ) {
      document.getElementById('task-'+currentIndex).children[0].children[1].textContent = e.target.value;
    }
  }

  const handleAdd = (e) => {
    console.log(regexBackSpace.test(inputValue))
    if ( inputValue && regexBackSpace.test(inputValue) && isEdit === false ) {
      setAllTask([...allTask , inputValue]);
      setInputValue("") ;
      console.log(allTask)
    } else if ( isEdit === true ) {
      setInputValue("") ;
    }
    setIsEdit(false);
  }

  const handleDelete = (e) => {
    if ( currentIndex !== '' ) {
      const parentElement = e.target.parentElement.parentElement
      console.log(parentElement.getAttribute('data-index'))
      const index = parentElement.getAttribute('data-index');
      setCurrentIndex(index);
      allTask.splice(index,1);
      setAllTask([...allTask]);
    } else {
      allTask.splice(Number(currentIndex),1);
      setAllTask([...allTask]);
      setCurrentIndex('');
    }
  }

  const handleEditTask = (e) => {
    setIsEdit(!isEdit);
    const parentElement = e.target.parentElement.parentElement;
    const index = parentElement.getAttribute('data-index');
    setCurrentIndex(index)
    console.dir(parentElement.children[0].textContent)
    setInputValue(parentElement.children[0].textContent)
  }

  const handleClickMenu = () => {
    if ( !document.getElementById('menu').classList.contains('display_flex') ) {
      document.getElementById('menu').classList.add('display_flex');
    } else {
      document.getElementById('menu').classList.remove('display_flex');
    }
  }

  const handleClickComplete = (e) => {
    if ( e.target.getAttribute('data-ischeck') === "false") {
      e.target.setAttribute('data-ischeck',true) ;
      e.target.setAttribute('class','check_icon margin-right fa-solid fa-circle-check')
      document.getElementById(e.target.parentElement.parentElement.id).classList.add('opa-0-3')
    } else {
      e.target.setAttribute('data-ischeck',false) ;
      e.target.setAttribute('class','check_icon margin-right fa-regular fa-circle')
      document.getElementById(e.target.parentElement.parentElement.id).classList.remove('opa-0-3')
    }
  }

  return(
    <div className='container full-width' id="container">
      <div id="header">
        <div id="title">My TodoList</div>
        <div onClick={handleClickMenu} id="nav_menu">
          <i id="menu_icon" className="fa-solid fa-bars"></i>
          <div id="menu">
            <div className="social">
              <a target='_blank' href='https://www.facebook.com/namng1111/'>
                <i className="fa-brands fa-facebook"></i>
              </a>
            </div>
            <div className="social">
              <a target='_blank' href="https://www.instagram.com/namng_113/">
                <i className="fa-brands fa-instagram"></i>
              </a>
            </div>
            <div className="social">
              <a target='_blank' href="https://github.com/Namne2k3">
                <i className="fa-brands fa-github"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div id="body">
        <div id="input_area">
          <input value={inputValue} onChange={handleChange} id="input" type='text' placeholder='Add tasks...'></input>
          <button onClick={handleAdd} id="add_btn">Add</button>
        </div>
        <span className='border'></span>
      </div>
      <div id="list_container">
        <ul id="list_task">
          { allTask.map( (task,index) =>  
            <li onClick={e => console.log(e.target)} id={"task-" + index} data-index={index} key={index} className="task">
              <div id="check_container">
                <i data-ischeck="false" onClick={handleClickComplete} className="check_icon margin-right fa-regular fa-circle"></i>
                <div className="task_title">
                  {task}
                </div>
              </div>
              <div id="icons_container">
                <i onClick={handleEditTask} className="interact_icon fa-solid fa-pen-to-square"></i>
                <i onClick={handleDelete} className="interact_icon fa-solid fa-trash-can"></i>
              </div>
          </li>
          )}
        </ul>
      </div>
    </div>
  );
}

function App() {
  return (
    <>
      <ToDoList />
    </>
  );
}

export default App;
