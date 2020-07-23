import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import TeamInfoManageTab from "../../components/TeamManagePage/TeamInfoManageTab/TeamInfoManageTab";
import MemberManagementTab from "../../components/TeamManagePage/MemberManagementTab/MemberManagementTab";
const useStyles = makeStyles({
    body: {
        paddingTop: 90,
        width: "100%",
        height: "100%",
    },
    membertab: {
        marginTop: "20px",
        marginBottom: "5%",
    },
});

function TeamManagePage() {
    const classes = useStyles();
    return (
        <div className={classes.body}>
            <div>
                <TeamInfoManageTab />
            </div>
            <div className={classes.membertab}>
                <MemberManagementTab />
            </div>
        </div>
    );
}

export default TeamManagePage;
