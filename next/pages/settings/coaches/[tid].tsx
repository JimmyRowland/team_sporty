import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Layout from "../../../components/layouts/settings/Layout";
import { useGetCoachesQuery, useQuitTeamAsCoachMutation } from "../../../generated/graphql";
import { useRouter } from "next/router";
import { TeamNotFound } from "../../../components/Error/TeamNotFound";
import { LoadingMembers } from "../../../components/components/loadingComponents/LoadingMembers";
import UsersTable from "../../../components/UserTable/UserTable";
import UsersToolbar from "../../../components/UserToolbar/UserToolbar";
import { useDispatch } from "react-redux";
import { resetSelectedUsers } from "../../../components/UserTable/userTableSlice";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
    },
    content: {
        marginTop: theme.spacing(2),
    },
    importButton: {
        marginRight: theme.spacing(1),
    },
    exportButton: {
        marginRight: theme.spacing(1),
    },
}));

function ManageCoachesPage() {
    const classes = useStyles();
    const router = useRouter();
    const { tid } = router.query;
    if (typeof tid !== "string") {
        return <TeamNotFound />;
    }
    let error1;
    const { data, loading, error, refetch } = useGetCoachesQuery({
        variables: {
            teamID: tid,
        },
        pollInterval: 500,
    });
    const dispatch = useDispatch();

    const [quit] = useQuitTeamAsCoachMutation();
    const handleLeave = () => {
        dispatch(resetSelectedUsers());
        quit({ variables: { teamID: tid } })
            .then(() => {
                refetch();
            })
            .catch((e: any) => {
                error1 = e;
            });
    };

    if (error || error1) return <TeamNotFound />;

    return (
        <Layout>
            {loading || !data || !data.getCoaches ? (
                <LoadingMembers />
            ) : (
                <div className={classes.root}>
                    <UsersToolbar>
                        {data.getCoaches.isCoach ? (
                            <Fragment>
                                <Button className={classes.importButton} onClick={handleLeave}>
                                    Leave Team
                                </Button>
                            </Fragment>
                        ) : null}
                    </UsersToolbar>
                    <div className={classes.content}>
                        <UsersTable users={data.getCoaches.users} />
                    </div>
                </div>
            )}
        </Layout>
    );
}

export default ManageCoachesPage;
