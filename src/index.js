import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';


// index -> App -> Main -> Navbar, Home, Profile, Contact
// posts -> App(state) -> Main(props) -> Home(props)

ReactDOM.render(
  <React.StrictMode>
    {/* Router allows for a simple DOM refresh instead of refreshing the page */}
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
