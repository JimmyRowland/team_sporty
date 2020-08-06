import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ClubDisplayTab from "../components/ClubDisplayTab/ClubDisplayTabs";
import Layout from "../components/layouts/index/Layout";
import { useGetSearchTeamsQuery, useGetTeamsQuery } from "../generated/graphql";
import Card from "@material-ui/core/Card";
import theme from "../assets/theme";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Add } from "@material-ui/icons";
import Link from "next/link";
import { ErrorComponent } from "../components/Error/Error";
import Button from "@material-ui/core/Button";
import { colors, Paper } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { Autocomplete } from "@material-ui/lab";

const useStyles = makeStyles({
    body: {
        paddingTop: 110,
        width: "100%",
        height: "100%",
        margin: "auto",
    },
    searchbarContainer: {
        width: "fit-content",
        height: "30%",
        margin: "auto",
        textAlign: "center",
        padding: theme.spacing(1),
    },
    searchbar: {
        width: "100%",
    },
    teamContainer: {
        marginTop: theme.spacing(5),
        width: "100%",
    },
    teamtabContainer: {
        margin: "2em",
    },
    createteamContainer: {
        marginTop: "5%",
    },
    button: {
        width: "100%",
        borderRadius: "20px",
        margin: "auto",
    },
    buttonContainer: {
        marginTop: theme.spacing(5),
        width: "200px",
        margin: "auto",
    },
    searchContainer: {
        height: "200px",
        width: "100%",
        maxWidth: "1000px",
        margin: "auto",
        padding: theme.spacing(5),
        borderRadius: "15px",
    },
});

function TeamSearchPage() {
    const classes = useStyles();
    const { data, error } = useGetSearchTeamsQuery();
    const [search, setSearch] = useState("");

    const handleSearch = (e, v) => {
        if (v) setSearch(v);
    };

    if (error) {
        return <ErrorComponent />;
    } else {
        return (
            <Layout title={"Teams"}>
                <div className={classes.body}>
                    <Card className={classes.searchContainer}>
                        <Autocomplete
                            onChange={(e, v) => handleSearch(e, v)}
                            options={data?.getTeams?.map((team) => team.team.name)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    className={classes.searchbar}
                                    placeholder="Search Team"
                                    onChange={(e) => handleSearch(e, e.target.value)}
                                />
                            )}
                        />
                        <div className={classes.buttonContainer}>
                            <Link href={"/createTeam"}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    disableElevation
                                    className={classes.button}
                                >
                                    Create New Team
                                </Button>
                            </Link>
                        </div>
                    </Card>
                    <div className={classes.teamContainer}>
                        {data?.getTeams?.map((team, index: number) => {
                            if (
                                team.team.name.toLowerCase().includes(search.toLowerCase()) ||
                                team.team.sport.toLowerCase().includes(search.toLowerCase())
                            )
                                return (
                                    <div key={index} className={classes.teamtabContainer}>
                                        <ClubDisplayTab
                                            teamimage={team.team.imgUrl}
                                            name={team.team.name}
                                            description={team.team.description}
                                            numberMembers={team.team.numberMembers}
                                            sport={team.team.sport}
                                            teamID={team.team._id}
                                            isMember={team.isMember || team.isCoach}
                                            isPending={team.isPending}
                                            isDisplayOnly={true}
                                        />
                                    </div>
                                );
                        })}
                    </div>
                </div>
            </Layout>
        );
    }
}

export default TeamSearchPage;
