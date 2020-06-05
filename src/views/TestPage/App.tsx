import React from 'react';
import logo from '../../logo.svg';
import { Counter } from '../../features/counter/Counter';
import './App.css';
import { ColoredPaper } from '../../features/coloredPaper/ColoredPaper';
import { DateAvatar } from '../../features/DateAvatar/DateAvatar';
import TeamList from '../TeamPage/TeamList';

const teamlist = [
  { id: 1, name: "Richmond FC" },
  { id: 2, name: "Richmond Raiders" },
  { id: 3, name: "Richmond CSGO" }
];

function TestPage() {
  return (
    <div className="App">
      <ColoredPaper color={'red'}>
        <DateAvatar date={2} month={'Jun'} />
      </ColoredPaper>
      <ColoredPaper color={'blue'}>
        <h3>head</h3>
      </ColoredPaper>
      <TeamList teamlist={teamlist} />
    </div>
  );
}

export default TestPage;
