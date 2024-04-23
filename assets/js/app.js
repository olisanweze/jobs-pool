/*=======================================================*/
/*                                                       */
/*  olisa nweze (2024)                                   */
/*  github.com/olisanweze                                */
/*                                                       */
/*=======================================================*/

'use strict';

import {  select, listen, create  } from './utils.js';

/*=======================================================*/
/*  global variables                                     */
/*=======================================================*/

const login = select('.login-button');
const userEmail = select('.user-email');
const userPassword = select('.user-password');
const incorrectAlert = select('.incorrect-details');
const peopleSuggestions = select('.people-section');
const URL = 'https://randomuser.me/api/?nat=CA&results=10&seed=same';

const options = {
  method: 'GET',
  headers: {  'Content-Type': 'application/JSON; charset=UTF-8'  },
  mode: 'cors'
}

/*=======================================================*/
/*  functions                                            */
/*=======================================================*/

function setLoginCredentials() {
  localStorage.setItem('username', 'andrespecht@email.com');
  localStorage.setItem('password', 'password');
}

function checkLoginCredentials(username, password) {
  const storedUserName = localStorage.getItem('username');
  const storedPassword = localStorage.getItem('password');

  if (username === storedUserName && password === storedPassword) {
    window.location.href = './home.html';
  } else {
    incorrectAlert.style.visibility = 'visible';
  }
}

function allowUserAccess() {
  const username = userEmail.value;
  const password = userPassword.value;

  checkLoginCredentials(username, password);
}

async function getUsers(endpoint) {
  try {
    const result = await fetch(endpoint, options);

    if (!result.ok) {
      throw new Error(`${result.statusText} (${result.status})`);
    }

    const data = await result.json();
    genUsersInformation(data);
  } catch(error) {
  }
}

getUsers(URL);

async function genUsersInformation(data) {
  const users = data.results.map(user => ({
    profilePicture: user.picture.large,
    name: `${user.name.first} ${user.name.last}`,
    city: user.location.city
  }));

  buildOtherUsers(users);
}

function buildOtherUsers(users) {
  users.forEach(user => {
    const userDiv = create('div');
    userDiv.classList.add('flex');
    userDiv.classList.add('space-between');
    userDiv.classList.add('center');
    
    const about = create('div');
    about.classList.add('flex');

    const img = create ('div');
    img.classList.add('profile-img-people');
    img.style.background = `#fff url(${user.profilePicture}) center / cover no-repeat`;
    about.appendChild(img);

    const userDetails = create('div');
    const name = create('h5');
    name.textContent = user.name;
    userDetails.appendChild(name);

    const city = create('p');
    city.classList.add('people-suggestions-city');
    city.classList.add('grey');
    city.textContent = user.city;
    userDetails.appendChild(city);
    about.appendChild(userDetails);
    peopleSuggestions.appendChild(userDiv);

    const add = create('div');
    add.innerHTML = '<i class="fa-solid fa-plus"></i>';
    userDiv.appendChild(about);
    userDiv.appendChild(add);
  })
}

/*=======================================================*/
/*  event listeners                                      */
/*=======================================================*/

listen('load', window, setLoginCredentials);
listen('click', login, allowUserAccess);
listen('load', window, getUsers);