import React from 'react';
import './PersonalInfoTab.css'
import InfoEdit from "./InfoEdit";


class PersonalInfoTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "NAME",
            info: "Personal Intro personal Intro personal Intro personal Intro personal Intro  "
        };
    }


    render() {
        return (
            <div className="Tab">
                <div className="Cover"/>
                <div id="TempIcon"/>
                <div className="Pcontainer">
                    <p>
                        <div className="Name"> {this.state.name} </div>
                    </p>
                    <p>
                        <div className="Info"> {this.state.info} </div>
                    </p>
                </div>
                <button className="Edit"> Edit</button>
            </div>
        );
    }
}

export default PersonalInfoTab;