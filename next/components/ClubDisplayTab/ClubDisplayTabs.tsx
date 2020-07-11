import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import {Button} from "@material-ui/core";
import {GTranslate} from "@material-ui/icons";

const useStyles = makeStyles((Theme: Theme) =>
    createStyles({
        body: {
            width: "800px",
            height: "150px",
            borderRadius: "15px",
            boxShadow:"0px 4px 4px rgba(0, 0, 0, 0.25)",
            display: "flex",
            margin:"auto"
        },
        clubIMGContainer: {
            height: "80%",
            width: "15%",
            margin: "auto",
        },
        clubIMG:{
            margin:"10px auto",
            height: "80%",
            width: "80%",
        },
        infoContainer: {
            height: "80%",
            width: "60%",
            margin: "auto",
            display:"block"
        },
        infocontainer: {
        },
        infoLine1items: {
            display: "inline",
            padding: "5px",
            fontSize:"24px",
            fontWeight:"bold"
        },
        infoLine2items: {
            display: "inline",
            padding: "5px",
            fontWeight:"300",
            fontSize: "12px",
        },
        infoLine3: {
            marginTop:"5px",
            textAlign:"center",
        },
        infoLine3items: {
            padding: "5px",
            fontSize: "16px",
        },
        addButtonContainer: {
            height: "80%",
            width: "15%",
            margin: "auto",
        },
        addButton:{
            position:"relative",
            margin:"50%",
            transform:"translate(-50%, -50%)",
            borderRadius: "20px",
        },
    }),
);

export default function ClubDisplayTab() {
    const classes = useStyles();
    return (
        <div className={classes.body}>
            <div className={classes.clubIMGContainer}>
                <Avatar className={classes.clubIMG}>T</Avatar>
            </div>
            <div className={classes.infoContainer}>
                <div className={classes.infocontainer}>
                    <div className={classes.infoLine1items}>
                        Club Name
                    </div>
                    <div className={classes.infoLine1items}>
                        Team Name
                    </div>
                </div>
                <div className={classes.infocontainer}>
                    <div className={classes.infoLine2items}> Type of Sport </div>
                    <div className={classes.infoLine2items}> 20 members </div>
                </div>
                <div className={classes.infoLine3}>
                    <div className={classes.infoLine3items}> Some descriptions over here </div>
                </div>
            </div>
            <div className={classes.addButtonContainer}>
                <Button variant="contained" color="primary" className={classes.addButton}>
                    Join
                </Button>
            </div>
        </div>
    );
}
