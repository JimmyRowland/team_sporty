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
    },
    searchbarContainer:{
        display:"block",
        width: "100%",
        height: "20%",

    }
})

function TeamSearchPage(){
    const classes = useStyles();
    return(
        <div className={classes.body}>
            <div className={classes.searchbarContainer}>
            <SearchBar />
            </div>
            <div>
                <ClubDisplayTab />
                <ClubDisplayTab />
                <ClubDisplayTab />
                <ClubDisplayTab />
            </div>
            <div>
                <CreateTeamModal />
            </div>
        </div>
    );
}

export default TeamSearchPage;