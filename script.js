const container = document.querySelector('.container');
const listContainer = document.querySelector('.container--list');
const textInput = document.getElementById('addToDo');

// get values from local storage 
const storedData = JSON.parse(localStorage.getItem("todo")) || [];

// create elements when page loaded
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
        storedData.map((itemInfo, index) => {
            e.target.closest('div').id == itemInfo.id && (storedData.splice(index, 1), e.target.closest('div').remove())
        });
    } else if (elementClassName === 'checked') {
        storedData.map(itemInfo => {
        e.target.closest('div').id == itemInfo.id && (itemInfo.completed = e.target.checked, done(itemInfo.completed, e.target));
       })
    }
    localStorage.setItem('todo', JSON.stringify(storedData))
})


const createTodoList = (listElement) => {
   const {id, completed, text} = listElement;
   
   //create list item container
   const createListItem = document.createElement('div');
   createListItem.classList.add('container--list-item');
   createListItem.setAttribute('id', `${id}`);

   //create checkbox for if todo completed or not
   const createCheckBox = document.createElement('input');
   createCheckBox.setAttribute('type', 'checkbox');
   createCheckBox.setAttribute('id', 'checked');
   createCheckBox.classList.add('checked');
   createCheckBox.checked = completed

   //create text box for todo content
   const createTextBox = document.createElement('div');
   createTextBox.setAttribute('class', 'todo');
   createTextBox.innerText = text;
   //if list item checked change text decoration
   completed ? createTextBox.style.textDecoration = 'line-through': 
   createTextBox.style.textDecoration = 'none';
   
   //create trash icon
   const createTrashIcon = document.createElement('i');
   createTrashIcon.classList.add('fa-trash', 'fa-solid');
   
   listContainer.prepend(createListItem);
   createListItem.appendChild(createCheckBox);
   createListItem.appendChild(createTextBox);
   createListItem.appendChild(createTrashIcon);
}


//checked function
const done = (value, element) => { 
    value ? element.nextElementSibling.style.textDecoration = 'line-through' :
    element.nextElementSibling.style.textDecoration = 'none'
}