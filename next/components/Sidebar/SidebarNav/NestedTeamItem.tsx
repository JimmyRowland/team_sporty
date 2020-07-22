import React, { Fragment } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { List, ListItem, Button } from "@material-ui/core";
import { Team } from "../../../generated/graphql";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { SportsSoccer } from "@material-ui/icons";
import Link from "next/link";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
    root: {},
    item: {
        display: "flex",
        paddingTop: 0,
        paddingBottom: 0,
    },
    button: {
        padding: "10px 8px",
        justifyContent: "flex-start",
        textTransform: "none",
        letterSpacing: 0,
        width: "100%",
        fontWeight: theme.typography.fontWeightMedium,
    },
    icon: {
        width: 24,
        height: 24,
        display: "flex",
        alignItems: "center",
        marginRight: theme.spacing(1),
    },
    active: {
        color: theme.palette.primary.main,
        fontWeight: theme.typography.fontWeightMedium,
        "& $icon": {
            color: theme.palette.primary.main,
        },
    },
    nav: {
        marginBottom: theme.spacing(2),
    },
    nested: {
        paddingLeft: theme.spacing(2),
    },
}));

const NestedTeamItem = ({ team }: { team: Pick<Team, "name" | "_id"> }) => {
    const classes = useStyles();
    const router = useRouter();
    const { tid } = router.query;
    const [open, setOpen] = React.useState(tid === team._id);
    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <Fragment>
            <ListItem button onClick={handleClick} disableGutters>
                <Button className={classes.button}>
                    <div className={classes.icon}>
                        <SportsSoccer />
                    </div>
                    {team.name}
                </Button>
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem className={clsx(classes.item, classes.nested)} disableGutters>
                        <Link href={"/settings/members/[tid]"} as={`/settings/members/${team._id}`}>
                            <Button className={classes.button}>
                                <div className={classes.icon}>
                                    <SportsSoccer />
                                </div>
                                Members
                            </Button>
                        </Link>
                    </ListItem>
                    <ListItem className={clsx(classes.item, classes.nested)} disableGutters>
                        <Link href={"/settings/coaches/[tid]"} as={`/settings/coaches/${team._id}`}>
                            <Button className={classes.button}>
                                <div className={classes.icon}>
                                    <SportsSoccer />
                                </div>
                                Coaches
                            </Button>
                        </Link>
                    </ListItem>
                    <ListItem className={clsx(classes.item, classes.nested)} disableGutters>
                        <Link href={"/settings/pending/[tid]"} as={`/settings/pending/${team._id}`}>
                            <Button className={classes.button}>
                                <div className={classes.icon}>
                                    <SportsSoccer />
                                </div>
                                Pending request
                            </Button>
                        </Link>
                    </ListItem>
                </List>
            </Collapse>
        </Fragment>
    );
};

export default NestedTeamItem;
