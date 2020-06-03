import React from 'react';
import logo from '../../logo.svg';
import { Counter } from '../../features/counter/Counter';
import './App.css';
import { ColoredPaper } from '../../features/coloredPaper/ColoredPaper';

function TestPage() {
  return (
    <div className="App">
      <ColoredPaper color={'red'}>
        <ColoredPaper color={'indigo'}></ColoredPaper>
      </ColoredPaper>
      <ColoredPaper color={'blue'}>
        <h3>head</h3>
      </ColoredPaper>
    </div>
  );
}

export default TestPage;
