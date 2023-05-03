
import "./style.css";
import moveImg from './move.png';
import reloadImg from './reload.png';
import sendImg from './send.png';

const listData = document.querySelector('.list-holder');
const reload = document.querySelector('.icon-reload');
const enter = document.querySelector('.icon-send');

enter.src = sendImg;
reload.src = reloadImg;

const listObj = [
    {
        descrip: 'Cry in the shower',
        completed: false,
        index: 1,
    },
    {
        descrip: 'Look to the horizon for 2h',
        completed: false,
        index: 2,
    },

];

const createList = () => {
 for (let i = 0; i < listObj.length; i += 1) {
    const lisItem = document.createElement('li');
    lisItem.className = 'list-item flex';
    lisItem.innerHTML = `
    <div class="check-descrip flex">
    <label>
    <input type="checkbox" name="completed" class="check ${listObj[i].completed ? 'completed' : ''}">
    </label>
    <p class="description">${listObj[i].descrip}</p>
    </div>
    <img src="${moveImg}" alt="move icon" class="icon-move pointer">
    `;

    listData.appendChild(lisItem);
 }
};

window.onload = createList;