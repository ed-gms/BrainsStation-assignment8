import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

// const tasks = [
//   {
//     task: 'Sample task 1',
//     completed: false
//   },
//   {
//     task: 'Sample task 2',
//     completed: false
//   },
//   {
//     task: 'Sample task 3',
//     completed: false
//   }
// ]

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
