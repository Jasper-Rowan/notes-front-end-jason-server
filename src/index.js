/**
 * Author: Jasper Rowan
 * 
 * This is a simple react front end to experiment with
 * fetching data from a server. To start we will be fetching
 * data from a locally hosted server called json server.
 * 
 * json server 
 * can be installed golbally with:
 * npm install -g json-server, however a global install is
 * not necessary, usually you can just run it from the root
 * dir of yout project with the command:
 * 
 * npx json-server --port 3001 --watch db.json
 * Note your db.json file will be created and you can fill
 * it with a json object if you want.
 * 
 * Axios
 * We will be using the axios library instead of fetch for
 * communication between the browser and server. It
 * functions like fetch, but is somewhat more pleasant to
 * use.
 * 
 * npm install axios
 */ 

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios'

const promise = axios.get('http://localhost:3001/notes')
console.log(promise)



axios
  .get('http://localhost:3001/notes')
  .then(response => {
    const notes = response.data
    console.log(notes)
    ReactDOM.createRoot(document.getElementById('root')).render(
      <App notes={notes} />
    )
  })



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


