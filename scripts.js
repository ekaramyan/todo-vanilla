const fetchData = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const data = await response.json();
    return data;
};


let loader = false;
let todos = []

const addElement = (todos = [{}]) => {
    const div1 = document.getElementById('div1');
    div1.innerHTML = '';
    console.log(todos)
    todos.forEach((todo) => {
        const newDiv = document.createElement('div');
        const checkText = document.createElement('p');
        checkText.innerHTML = todo.title;
        const newContent = document.createElement('input');
        newContent.setAttribute('type', 'checkbox');
        newDiv.appendChild(checkText)
        newDiv.appendChild(newContent);

        div1.appendChild(newDiv);
        newDiv.classList.add(todo.completed ? 'completed' : 'not-completed')
        newContent.checked = todo.completed ? true : false;
    });
};


const loader_f = () => {
    if (loader) {
        const newLoad = document.createElement('p');
        newLoad.innerHTML = 'Loading..'
        document.body.appendChild(newLoad);
        return newLoad
    }
}

const showToDos = () => {
    const btn = document.getElementById('show');
    btn.addEventListener('click', async () => {
        loader = true
        const loaderEl = loader_f()
        todos = await fetchData();
        loader = false
        loaderEl.remove()
        addElement(todos);
    });
};

document.addEventListener('DOMContentLoaded', () => {
    showToDos();
});
