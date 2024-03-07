import React from 'react'
import './App.css';
import './General.css'
import { Header, Search, Body, Footer } from './components';



const App = () => {
 
  return (
    <div className="App">
      <div className="general_bar">
       
      <Header />
        <Body />
        <Footer />
       
      </div>
    </div>
  )
}

export default App



{/*
const App = () => {
  return (
    <div className="App">
      <Router>
        <div className="general_bar">
          <Header />
          <Navigation />
          <MainContent />
          <Footer />
        </div>
      </Router>
    </div>
  );
};



Create a `Navigation` component to handle your navigation links and use the `Link` component from React Router to create clickable links:
```javascript
import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <Link to="/">Home</Link> |
      <Link to="/about">About</Link> |
      <Link to="/contact">Contact</Link>
    </nav>
  );
};


*/}