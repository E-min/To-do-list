const container = document.querySelector('.container');
const listContainer = document.querySelector('.container--list');
const textInput = document.getElementById('addToDo');

const storedData = JSON.parse(localStorage.getItem("todo")) || [];

window.addEventListener('load', () => {
    storedData.forEach(listElement => {
        createTodoList(listElement)
    });
});

container.addEventListener('click', (e) => {
    const elementClassName = e.target.classList[0];
    const itemListInfo = {
        id: new Date().getTime(),
        completed: false,
        text: textInput.value
    }

    if(elementClassName === 'fa-plus') {
        if (!textInput.value) {
        alert('Enter text to Add new to do...');
        return;
       }
        createTodoList(itemListInfo);
        storedData.push(itemListInfo);
        textInput.value = '';
    } else if (elementClassName === 'fa-trash') {
      
    } else if (elementClassName === 'checked') {
        storedData.map(itemInfo => {
        e.target.closest('div').id == itemInfo.id && (itemInfo.completed = e.target.checked);
       })
    }
    console.log(e.target.closest('div').id)
    localStorage.setItem('todo', JSON.stringify(storedData))
})


const createTodoList = (listElement) => {
   
   const {id, checked, text} = listElement;
   
   //create list item container
   const createListItem = document.createElement('div');
   createListItem.classList.add('container--list-item');
   createListItem.setAttribute('id', `${id}`);

   //create checkbox for if todo completed or not
   const createCheckBox = document.createElement('input');
   createCheckBox.setAttribute('type', 'checkbox');
   createCheckBox.setAttribute('id', 'checked');
   createCheckBox.classList.add('checked');
   createCheckBox.checked = checked
   
   //create text box for todo content
   const createTextBox = document.createElement('div');
   createTextBox.setAttribute('class', 'todo');
   createTextBox.innerText = text;
   
   //create trash icon
   const createTrashIcon = document.createElement('i');
   createTrashIcon.classList.add('fa-trash', 'fa-solid');
   
   listContainer.prepend(createListItem);
   createListItem.appendChild(createCheckBox);
   createListItem.appendChild(createTextBox);
   createListItem.appendChild(createTrashIcon);
}
