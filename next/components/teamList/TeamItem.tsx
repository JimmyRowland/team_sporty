import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import { Button } from "@material-ui/core";
import Link from "next/link";
import { Team } from "../../generated/graphql";

function TeamItem({
    name,
    _id,
    description,
    imgUrl,
}: {
    name: string;
    _id: string;
    description: string;
    imgUrl: string;
}) {
    return (
        <Link href={"/team/[tid]"} as={`/team/${_id}`}>
            <Button fullWidth>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar src={imgUrl}>
                            <ImageIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={name}
                    // secondary="{description}"
                    />
                </ListItem>
            </Button>
        </Link>
    );
}

export default TeamItem;
