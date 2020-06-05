import React from "react";
import "./TeamItem.css";

function TeamItem(props: { name: React.ReactNode; }) {
    return (
      <div className="teamItem">
            <li><span className="dot"></span>&nbsp; {props.name}</li>
      </div>
    );
  }

export default TeamItem;