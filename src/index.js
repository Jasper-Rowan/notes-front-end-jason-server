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


const notes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2019-05-30T17:30:31.098Z',
    important: true
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    date: '2019-05-30T18:39:34.091Z',
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true
  }
]

ReactDOM.createRoot(document.getElementById('root')).render(
  <App notes={notes} />
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


