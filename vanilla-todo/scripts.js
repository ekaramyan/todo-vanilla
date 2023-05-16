const fetchData = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  const data = await response.json();
  return data;
};

let loader = false;
let todos = [];

const addElement = (todos = [{}]) => {
  const div1 = document.getElementById('div1');
  div1.innerHTML = '';
  todos.forEach((todo) => {
    const newDiv = document.createElement('div');
    const checkText = document.createElement('p');
    checkText.innerHTML = todo.title;
    const controlsDiv = document.createElement('div');
    controlsDiv.classList.add('controls');

    const newContent = document.createElement('input');
    newContent.setAttribute('type', 'checkbox');
    newDiv.classList.add('todo')
    controlsDiv.appendChild(newContent);

    const editButton = document.createElement('button');
    editButton.innerHTML = 'Edit';
    editButton.addEventListener('click', () => {
      const newText = prompt('Enter new text:');
      if (newText) {
        todo.title = newText;
        checkText.innerHTML = newText;
      }
    });

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete';
    deleteButton.addEventListener('click', () => {
      const index = todos.indexOf(todo);
      if (index > -1) {
        todos.splice(index, 1);
        newDiv.remove();
      }
    });

    controlsDiv.appendChild(editButton);
    controlsDiv.appendChild(deleteButton);

    newDiv.appendChild(checkText);
    newDiv.appendChild(controlsDiv);
    div1.appendChild(newDiv);

    newDiv.classList.add(todo.completed ? 'completed' : 'not-completed');
    newContent.checked = todo.completed ? true : false;

    newContent.addEventListener('change', () => {
      todo.completed = newContent.checked;
      newDiv.classList.toggle('completed', newContent.checked);
      newDiv.classList.toggle('not-completed', !newContent.checked);
    });
  });
};



const loader_f = () => {
  if (loader) {
    const newLoad = document.createElement('p');
    newLoad.innerHTML = 'Loading..';
    document.body.appendChild(newLoad);
    return newLoad;
  }
};

const showToDos = () => {
  const btn = document.getElementById('show');
  btn.addEventListener('click', async () => {
    loader = true;
    const loaderEl = loader_f();
    todos = await fetchData();
    loader = false;
    loaderEl.remove();
    addElement(todos);
  });
};

const searchTodo = () => {
  const searchInput = document.getElementById('search');
  searchInput.addEventListener('input', () => {
    const searchText = searchInput.value.toLowerCase();
    const filteredTodos = todos.filter((todo) =>
      todo.title.toLowerCase().includes(searchText)
    );
    addElement(filteredTodos);
  });
};

// const apiKey = import.meta.env.VITE_WEATHER_API;
const apiKey = 'e3f5a4bda210702ff2a4f49c736015bc';


const fetchWeather = async (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const displayWeather = (weatherData) => {
  const weatherHeader = document.getElementById('weather');
  const cityName = weatherData.name;
  const temperature = Math.round(weatherData.main.temp - 273.15); // Конвертация температуры в градусы Цельсия
  const weatherDescription = weatherData.weather[0].description;

  weatherHeader.innerHTML = `Weather in ${cityName}: ${temperature}°C, ${weatherDescription}`;
};

const showWeather = () => {
  const city = 'Yerevan';
  fetchWeather(city)
    .then((data) => {
      displayWeather(data);
    })
    .catch((error) => {
      console.error('Error fetching weather data:', error);
    });
};

document.addEventListener('DOMContentLoaded', () => {
  showToDos();
  searchTodo();
  showWeather();
});