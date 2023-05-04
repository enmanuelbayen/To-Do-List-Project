import './style.css';

import reloadImg from './reload.png';
import sendImg from './send.png';
import addTask from './modules/addToDo.js';
import createList from './modules/RenderTask.js';

const reload = document.querySelector('.icon-reload');
const enter = document.querySelector('.icon-send');

enter.src = sendImg;
reload.src = reloadImg;

createList();

const sendBttn = document.getElementById('icon-send-id');

sendBttn.addEventListener('click', addTask);