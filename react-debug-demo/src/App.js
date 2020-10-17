import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [text, setText] = useState('Learn React');
  const [show,setToggle] = useState(true);
  const handleSetText = () => {
    setText(text + '!');
  }
  const toggle = () => setToggle(v => !v);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="------||432423231111~~~~~~~app-logo-app~~~~~~~~~--000001111111" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        { show ? (<p>May be I should be hidden.</p>) : null }
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {text}
        </a>
        <button onClick={handleSetText}>Set Text</button>
        <button onClick={toggle}>Toggle</button>
      </header>
    </div>
  );
}

export default App;
