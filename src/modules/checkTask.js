import listObj from "./ArrayToDo.js";
import saveData from "./savaDataList.js";

const Checked = (taskId) => {
    if (listObj[taskId - 1].completed === false) {
        listObj[taskId - 1].completed = true;
      } else if (listObj[taskId - 1].completed === true) {
        listObj[taskId - 1].completed = false;
      }
      saveData();
};

const deleteComplete = () => {
    const CompletedTask = listObj.filter((task) => task.completed === false);
    localStorage.setItem('data-lis', JSON.stringify(CompletedTask));
    window.location.reload();
};


export {Checked, deleteComplete};