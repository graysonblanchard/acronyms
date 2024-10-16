import './App.css';
import * as React from 'react';
import { Board } from './components/Board';

export function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Board />
      </header>
    </div>
  );
}

export default App;
