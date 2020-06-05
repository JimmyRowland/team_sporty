import React from 'react';
import TeamItem from "./TeamItem"
import "./TeamList.css";

function TeamList(props: { teamlist: any[]; }) {
    return (
        <div className="teamlist">
            <h2>&nbsp; Your Teams</h2>
            <ul id="team-list">
            {props.teamlist.map(c => <TeamItem key={c.id} name={c.name} />)}
            <li> &nbsp; </li>
            </ul>
        </div>
    );
}
export default TeamList;

