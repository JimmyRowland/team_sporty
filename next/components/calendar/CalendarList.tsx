import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import CalendarItem from "./CalendarItem";
import { useEventsQuery } from "../../generated/graphql";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            flexBasis: "33.33%",
            flexShrink: 0,
            align: "left",
        },
        secondaryHeading: {
            fontSize: theme.typography.pxToRem(15),
            color: theme.palette.text.secondary,
        },
    }),
);

function CalendarList(props: { eventList: any[] }) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    const { data, loading, error } = useEventsQuery();
    if (loading) {
        return <div>loading...</div>;
    }

    if (error) {
        console.log(error);
        return <div>err</div>;
    }

    if (!data) {
        return <div>no data</div>;
    }
    console.log(data);
    return (
        <div className={classes.root}>
            {props.eventList.map((c) => (
                <CalendarItem
                    key={c.id}
                    name={c.name}
                    type={c.type}
                    date={c.date}
                    address={c.address}
                    going={c.going}
                    notGoing={c.notGoing}
                    notResponded={c.notResponded}
                />
            ))}
            {data.events.map((event, index) => {
                // console.log(index, event);
                return (
                    <CalendarItem
                        key={index}
                        name={event.name}
                        type={"Game"}
                        date={event.startDate.toString}
                        address={event.description}
                        going={3}
                        notGoing={3}
                        notResponded={3}
                    />
                );
            })}
            <br></br>
        </div>
    );
}

export default CalendarList;
