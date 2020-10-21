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
        <div>
          <span>aaa</span>
        </div>
        <img src={logo} className="App-logo" alt="------||43242323~~~~~~~app-logo-app~~~~~~~11111111112222" />
        <div className="App-block">
          Edit <code>src/App.js</code> and save to reload.
          <p>
            <span>111</span>
            <span>222</span>
            <span>333</span>
          </p>
        </div>
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
