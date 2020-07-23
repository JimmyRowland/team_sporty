import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Layout from "../../../components/layouts/settings/Layout";
import { useAddMembersMutation, useGetPendingsQuery, useRejectMembersMutation } from "../../../generated/graphql";
import { useRouter } from "next/router";
import { TeamNotFound } from "../../../components/Error/TeamNotFound";
import { LoadingMembers } from "../../../components/components/loadingComponents/LoadingMembers";
import UsersTable from "../../../components/UserTable/UserTable";
import UsersToolbar from "../../../components/UserToolbar/UserToolbar";
import { useDispatch, useSelector } from "react-redux";
import { resetSelectedUsers, selectSeletedUserState } from "../../../components/UserTable/userTableSlice";
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

function ManagePendingListPage() {
    const classes = useStyles();
    const router = useRouter();
    const { tid } = router.query;
    if (typeof tid !== "string") {
        return <TeamNotFound />;
    }
    const { data, loading, error, refetch } = useGetPendingsQuery({
        variables: {
            teamID: tid,
        },
        pollInterval: 500,
    });

    const selectedUsers: string[] = useSelector(selectSeletedUserState);
    const dispatch = useDispatch();
    const [addMembers] = useAddMembersMutation();
    const [rejectMembers] = useRejectMembersMutation();
    let error1;
    const handleAddMembers = () => {
        dispatch(resetSelectedUsers());
        addMembers({ variables: { userIDs: selectedUsers, teamID: tid } })
            .then(() => {
                refetch();
            })
            .catch((e) => {
                error1 = e;
            });
    };

    const handleRejectMembers = () => {
        dispatch(resetSelectedUsers());
        rejectMembers({ variables: { userIDs: selectedUsers, teamID: tid } })
            .then(() => {
                refetch();
            })
            .catch((e) => {
                error1 = e;
            });
    };

    if (error || error1) return <TeamNotFound />;

    return (
        <Layout>
            {loading || !data || !data.getPendings ? (
                <LoadingMembers />
            ) : (
                <div className={classes.root}>
                    <UsersToolbar>
                        <Button color="primary" variant="contained" onClick={handleAddMembers}>
                            Add Members
                        </Button>
                        <Button className={classes.importButton} onClick={handleRejectMembers}>
                            Reject Members
                        </Button>
                    </UsersToolbar>
                    <div className={classes.content}>
                        <UsersTable users={data.getPendings} />
                    </div>
                </div>
            )}
        </Layout>
    );
}

export default ManagePendingListPage;
