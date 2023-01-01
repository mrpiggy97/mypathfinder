import React from 'react';
import './App.css';

import PathFinder from "./views/PathFinder"

const NUMBER_OF_ROWS : number = 45
const NUMBER_OF_ITEMS_PER_ROW = 45

function App() {
  // canvasSize will set the number of Nodes
  // to render

  return (
    <div id="App">
      <PathFinder CanvasSize={NUMBER_OF_ITEMS_PER_ROW * NUMBER_OF_ROWS} />
    </div>
  );
}

export {NUMBER_OF_ITEMS_PER_ROW,NUMBER_OF_ROWS}

export default App;
