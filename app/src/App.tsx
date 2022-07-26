import React from 'react';
import './App.css';

import PathFinder from "./views/PathFinder"

function App() {
  // canvasSize will set the number of Nodes
  // to render

  // 900 because canvas is 30*30
  return (
    <div id="App">
      <PathFinder CanvasSize={900} />
    </div>
  );
}

export default App;
