import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SearchBar from "../../components/SearchBar/SearchBar";
import ClubDisplayTab from "../../components/ClubDisplayTab/ClubDisplayTabs";
import CreateTeamModal from "../../components/CreateTeamModal/CreateTeamModal";

const useStyles = makeStyles({
    body:{
        paddingTop: 90,
        width:"100%",
        height:"100%",
        margin: "auto",
    },
    searchbarContainer:{
        width: "80%",
        height: "20%",
        margin: "auto",

    },
    teamContainer:{
        width:"100%",
        height:"500px",
        overflowY:"scroll",
    },
    teamtabContainer:{
        margin:"2em",
    }
})

function TeamSearchPage(){
    const classes = useStyles();
    return(
        <div className={classes.body}>
            <div className={classes.searchbarContainer}>
            <SearchBar />
            </div>
            <div className={classes.teamContainer}>
                <div className={classes.teamtabContainer}>
                <ClubDisplayTab />
                </div>
                <div className={classes.teamtabContainer}>
                    <ClubDisplayTab />
                </div>
                <div className={classes.teamtabContainer}>
                    <ClubDisplayTab />
                </div>
                <div className={classes.teamtabContainer}>
                    <ClubDisplayTab />
                </div>
                <div className={classes.teamtabContainer}>
                    <ClubDisplayTab />
                </div>
                <div className={classes.teamtabContainer}>
                    <ClubDisplayTab />
                </div>
                <div className={classes.teamtabContainer}>
                    <ClubDisplayTab />
                </div>
            </div>
            <div>
                <CreateTeamModal />
            </div>
        </div>
    );
}

export default TeamSearchPage;