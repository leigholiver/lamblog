import React from "react";
import { useHistory } from "react-router-dom";

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

import { loginStates, logout } from '../util/auth.js';

const HeaderCard = (props) => {
    const history = useHistory();
    return (
        <Card style={{ borderRadius: "2px", height: "100%" }}>
            <CardContent style={{ padding: "16px" }}>
                <Typography variant="h5" component="h2">
                    Leigh Oliver
                </Typography>
                <Typography variant="body2" component="p">
                    software developer and devops engineer
                </Typography>            
            </CardContent>
            { props.currLogin === loginStates.LOGGED_IN && 
                <CardActions>
                    <Typography component="span" variant="caption" style={{ flexGrow: "1" }}>
                        <Button size="small" onClick={() => { history.push("/new") }}>New Post</Button>
                    </Typography>
                    <Typography component="span" variant="caption" style={{ flexGrow: "1" }}>
                        <Button size="small" onClick={() => { logout(props.setCurrLogin); history.push("/") }}>Log Out</Button>
                    </Typography>
                </CardActions>
            }
        </Card>
    );
}

export default HeaderCard;
