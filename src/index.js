import './style.css';
import moveImg from './move.png';
import reloadImg from './reload.png';
import sendImg from './send.png';
import deleteImg from './trashpin.png';


const reload = document.querySelector('.icon-reload');
const enter = document.querySelector('.icon-send');

enter.src = sendImg;
reload.src = reloadImg;
// functions variables

const listData = document.querySelector('.list-holder');
const inputItem = document.querySelector('.add-item');
const sendBttn = document.getElementById('icon-send-id');

let listObj = JSON.parse(localStorage.getItem('data-lis')) || [];

const updateDescription = (id, value) => {
  const index = listObj.findIndex(item => item.id === id);
  if (index >= 0) {
    listObj[index].description = value;
    localStorage.setItem('data-lis', JSON.stringify(listObj));
  }
}

// append new list to ul
 let createList = () => {
  listData.innerHTML = '';
  for (let i = 0; i < listObj.length; i += 1) {
    const lisItem = document.createElement('li');
    lisItem.className = 'list-item flex';
    lisItem.innerHTML = `
    <div class="check-descrip flex">
      <label>
        <input type="checkbox" name="completed" class="check ${listObj[i].completed ? 'completed' : ''}">
      </label>
      <label label class="description-label" for="descrip-id${listObj[i].id}">
        <input type="text" name="action-toDo" class="description" id="descrip-id${listObj[i].id}" value="${listObj[i].description}">
      </label>
    </div>
    <img src="${moveImg}" alt="move icon" class="icon-move pointer" id="swapIcon${listObj[i].id}-${i}">
    <img src="${deleteImg}" alt="trash pin icon" class="icon-delete pointer hide" id="swapHide-icon-${i}">    
    `;

      listData.appendChild(lisItem);

        // interaccion while clicking the input item

      const edit = document.querySelector(`label[for="descrip-id${listObj[i].id}"]`);
      const removeBttn = document.getElementById(`swapHide-icon-${i}`);
      const hideIcon = document.getElementById(`swapIcon${listObj[i].id}-${i}`);
      const reverseEdit = document.getElementById(`descrip-id${listObj[i].id}`);
      
      edit.addEventListener('click', () => {
        lisItem.classList.add('bgYellow');
        removeBttn.classList.remove('hide');
        hideIcon.classList.add('hide');
     });

     reverseEdit.addEventListener('blur', (event) => {
      const input = event.target;
      const id = parseInt(input.id.replace('descrip-id', ''));
      const value = input.value.trim();
      updateDescription(id, value);
      setTimeout(() => {
        lisItem.classList.remove('bgYellow');
         removeBttn.classList.add('hide');
         hideIcon.classList.remove('hide');
         localStorage.setItem('data-lis', JSON.stringify(listObj));
    }, 100);
  });
    // remove 
    removeBttn.addEventListener('click', (event) =>{
      const button = event.target;
      if (button.classList.contains('icon-delete')) {
        const lisItem = button.parentElement;
        const indexToRemove = Array.from(listData.children).indexOf(lisItem);
        listObj.splice(indexToRemove, 1);
        localStorage.setItem('data-lis', JSON.stringify(listObj));
        listData.removeChild(lisItem);
        // update remaining items
        for (let i = indexToRemove; i < listObj.length; i++) {
          listObj[i].id = i + 1;
        }
        localStorage.setItem('data-lis', JSON.stringify(listObj));
        createList();
      }
    });
  }
};

// add
 sendBttn.addEventListener('click', () => {
  let newObj = {
    id: listObj.length +1,
    completed: false,
    description: inputItem.value,
  }
  listObj.push(newObj);
  localStorage.setItem('data-lis', JSON.stringify(listObj))
  inputItem.value = '';
  createList();
});

window.onload = createList;