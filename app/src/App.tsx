import React from 'react';
import './App.css';

import PathFinder from "./views/PathFinder"

function App() {
  // canvasSize will set the number of Nodes
  // to render

  // 846 is a random value that happens to fill
  // canvas
  return (
    <div id="App">
      <div id="header">
        header
      </div>
      <PathFinder CanvasSize={846} />
    </div>
  );
}

export default App;
