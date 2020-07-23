import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Layout from "../../../components/layouts/settings/Layout";
import {
    useAddCoachesMutation,
    useGetMembersQuery,
    useQuitTeamAsMemberMutation,
    useRemoveMembersMutation,
} from "../../../generated/graphql";
import { TeamNotFound } from "../../../components/Error/TeamNotFound";
import { LoadingMembers } from "../../../components/components/loadingComponents/LoadingMembers";
import UsersTable from "../../../components/UserTable/UserTable";
import UsersToolbar from "../../../components/UserToolbar/UserToolbar";
import { useDispatch, useSelector } from "react-redux";
import { resetSelectedUsers, selectSeletedUserState } from "../../../components/UserTable/userTableSlice";
import { Button } from "@material-ui/core";
import { GetStaticPaths, GetStaticProps } from "next";
import { getAllTeamStaticPaths } from "../../../lib/staticPaths";

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

type Props = {
    tid: string;
    errors?: string;
};

function ManageMembersPage({ tid, errors }: Props) {
    const classes = useStyles();
    if (errors) {
        return <TeamNotFound />;
    }
    const { data, loading, error, refetch } = useGetMembersQuery({
        variables: {
            teamID: tid,
        },
        pollInterval: 500,
    });

    const selectedUsers: string[] = useSelector(selectSeletedUserState);
    const dispatch = useDispatch();
    const [removeUsers] = useRemoveMembersMutation();
    const [addCoaches] = useAddCoachesMutation();
    const [quit] = useQuitTeamAsMemberMutation();
    let error1;
    const handleRemoveMembers = () => {
        dispatch(resetSelectedUsers());
        removeUsers({ variables: { userIDs: selectedUsers, teamID: tid } })
            .then(() => {
                refetch();
            })
            .catch((e: any) => {
                error1 = e;
            });
    };
    const handlePromoteCoaches = () => {
        dispatch(resetSelectedUsers());
        addCoaches({ variables: { userIDs: selectedUsers, teamID: tid } })
            .then(() => {
                refetch();
            })
            .catch((e) => {
                error1 = e;
            });
    };
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
            {loading || !data || !data.getMembers ? (
                <LoadingMembers />
            ) : (
                <div className={classes.root}>
                    <UsersToolbar>
                        {data.getMembers.isCoach ? (
                            <Fragment>
                                <Button color="primary" variant="contained" onClick={handlePromoteCoaches}>
                                    Promote Coaches
                                </Button>
                                <Button className={classes.importButton} onClick={handleRemoveMembers}>
                                    Remove Members
                                </Button>
                            </Fragment>
                        ) : (
                            <Button className={classes.importButton} onClick={handleLeave}>
                                Leave Team
                            </Button>
                        )}
                    </UsersToolbar>
                    <div className={classes.content}>
                        <UsersTable users={data.getMembers.users} />
                    </div>
                </div>
            )}
        </Layout>
    );
}

export default ManageMembersPage;

export const getStaticPaths: GetStaticPaths = getAllTeamStaticPaths;

export const getStaticProps: GetStaticProps = async (url) => {
    try {
        const tid = url.params?.tid;
        return { props: { tid } };
    } catch (err) {
        return { props: { errors: err.message } };
    }
};
