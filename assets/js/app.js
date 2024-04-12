/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*                                                       */
/*  Olisa Nweze (2024)                                   */
/*  github.com/olisanweze                                */
/*                                                       */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */

'use strict';

import {  select, listen  } from './utils.js';

const login = select('.login-button');
const userEmail = select('.user-email');
const userPassword = select('.user-password');
const incorrectAlert = select('.incorrect-details');

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
    incorrectAlert.classList.remove('incorrect-none');
  }
}

function allowUserAccess() {
  const username = userEmail.value;
  const password = userPassword.value;

  checkLoginCredentials(username, password);
}

function hideAlert() {
  incorrectAlert.classList.add('incorrect-none');
}



listen('load', window, setLoginCredentials);
listen('load', window, hideAlert);
listen('click', login, allowUserAccess);