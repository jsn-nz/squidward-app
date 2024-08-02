// src/App.js
import React from 'react';
import './App.css';
import MyComponent from './MyComponent';
import AudioRecorder from './AudioRecorder';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <MyComponent />
        <AudioRecorder />
      </header>
    </div>
  );
}

export default App;
