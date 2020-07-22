import React, { useState } from "react";
import clsx from "clsx";
import PerfectScrollbar from "react-perfect-scrollbar";
import { makeStyles } from "@material-ui/core/styles";
import {
    Card,
    CardActions,
    CardContent,
    Avatar,
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    TablePagination,
} from "@material-ui/core";
import { User } from "../../generated/graphql";
import { useDispatch, useSelector } from "react-redux";
import { selectSeletedUserState } from "./userTableSlice";
import { setSeletedUsers } from "./userTableSlice";

const useStyles = makeStyles((theme) => ({
    root: {},
    content: {
        padding: 0,
    },
    inner: {
        minWidth: 1050,
    },
    nameContainer: {
        display: "flex",
        alignItems: "center",
    },
    avatar: {
        marginRight: theme.spacing(2),
    },
    actions: {
        justifyContent: "flex-end",
    },
    tableRow: {},
}));

const UsersTable = ({
    users,
}: {
    users: Pick<User, "name" | "_id" | "sport" | "phone" | "email" | "address" | "avatarUrl">[];
}) => {
    const classes = useStyles();
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const selectedUsers = useSelector(selectSeletedUserState);
    const dispatch = useDispatch();
    const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        let selectedUsers: string[];
        if (event.target.checked) {
            selectedUsers = users.map((user) => user._id);
        } else {
            selectedUsers = [];
        }
        dispatch(setSeletedUsers(selectedUsers));
    };

    const handleSelectOne = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
        const selectedIndex = selectedUsers.indexOf(id);
        let newSelectedUsers: string[] = [];
        if (selectedIndex === -1) {
            newSelectedUsers = newSelectedUsers.concat(selectedUsers, id);
        } else if (selectedIndex === 0) {
            newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(1));
        } else if (selectedIndex === selectedUsers.length - 1) {
            newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelectedUsers = newSelectedUsers.concat(
                selectedUsers.slice(0, selectedIndex),
                selectedUsers.slice(selectedIndex + 1),
            );
        }
        dispatch(setSeletedUsers(newSelectedUsers));
    };

    const handlePageChange = (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
        setPage(page);
    };

    const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
    };

    return (
        <Card className={clsx(classes.root)}>
            <CardContent className={classes.content}>
                <PerfectScrollbar>
                    <div className={classes.inner}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={selectedUsers.length === users.length}
                                            color="primary"
                                            indeterminate={
                                                selectedUsers.length > 0 && selectedUsers.length < users.length
                                            }
                                            onChange={handleSelectAll}
                                        />
                                    </TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Location</TableCell>
                                    <TableCell>Phone</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.slice(0, rowsPerPage).map((user, index) => (
                                    <TableRow
                                        className={classes.tableRow}
                                        hover
                                        key={index}
                                        selected={selectedUsers.indexOf(user._id) !== -1}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={selectedUsers.indexOf(user._id) !== -1}
                                                color="primary"
                                                onChange={(event) => handleSelectOne(event, user._id)}
                                                value="true"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <div className={classes.nameContainer}>
                                                <Avatar className={classes.avatar} src={user.avatarUrl}>
                                                    {user.name}
                                                </Avatar>
                                                <Typography variant="body1">{user.name}</Typography>
                                            </div>
                                        </TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.address}</TableCell>
                                        <TableCell>{user.phone}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </PerfectScrollbar>
            </CardContent>
            <CardActions className={classes.actions}>
                <TablePagination
                    component="div"
                    count={users.length}
                    onChangePage={handlePageChange}
                    onChangeRowsPerPage={handleRowsPerPageChange}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    rowsPerPageOptions={[5, 10, 25]}
                />
            </CardActions>
        </Card>
    );
};
export default UsersTable;
