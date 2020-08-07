import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import AccoutDetail from "./AccountDetail";
import { EditProfileInput, useGetProfileDetailQuery } from "../../generated/graphql";
import { LoadingMembers } from "../components/loadingComponents/LoadingMembers";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(4),
    },
}));

const Account = () => {
    const classes = useStyles();
    const { data, loading, error } = useGetProfileDetailQuery();
    if (loading || error || !data || !data.me) {
        return <LoadingMembers />;
    }
    const { firstName, lastName, email, address, phone, introduction, sport } = data.me;
    const defaultValues: EditProfileInput = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        address: address,
        phone: phone,
        introduction: introduction,
        sport: sport.length ? sport[0] : "",
    };

    return (
        <div className={classes.root}>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <AccoutDetail {...defaultValues} />
                </Grid>
            </Grid>
        </div>
    );
};

export default Account;
