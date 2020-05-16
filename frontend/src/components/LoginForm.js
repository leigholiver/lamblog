import React, { useState } from "react";
import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import ProgressCard from '../components/ProgressCard'
import { loginStates, login } from '../util/auth.js';

export default function LoginForm(props) {
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");

    const handleUsername = (event) => {
        setUsername(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        login(props.setCurrLogin, username, password);
        setUsername("");
        setPassword("");
    }

    return (
        <div>
            { props.currLogin === loginStates.LOGGING_IN && <ProgressCard /> }
            { props.currLogin === loginStates.LOGGED_IN && 
                <Card style={{ "marginBottom": "4px" }}>
                    <CardContent>
                        <Grid container style={{ "textAlign": "center" }}>
                            <Grid item xs={12}>
                              <CheckCircleIcon />
                              <div>You are logged in!</div>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions style={{ "flexDirection": "row-reverse" }}>
                      <Link to="/"><Button size="small">Home</Button></Link>
                      <Link to="/new"><Button size="small">New Post</Button></Link>
                    </CardActions>
                </Card>
            }
            { (props.currLogin === loginStates.LOGGED_OUT || props.currLogin === loginStates.ERROR) && 
                <form onSubmit={handleSubmit}>
                    <Card style={{ "marginBottom": "4px" }}>
                        <CardContent>
                            <Grid container style={{ "textAlign": "center" }}>
                                <Grid item xs={12}>
                                    <Typography variant="h5" component="h2">
                                        Login
                                    </Typography>
                                </Grid>
                                { props.currLogin === loginStates.ERROR && 
                                    <Grid item xs={12}>
                                        <Typography variant="body2" component="p">
                                            There was an error logging in
                                        </Typography>
                                    </Grid>
                                }
                                <Grid item xs={12}>
                                        <TextField
                                        id="username"
                                        label="Username"
                                        variant="standard"
                                        onChange={handleUsername} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="password"
                                        label="Password"
                                        type="password"
                                        autoComplete="current-password"
                                        variant="standard"
                                        onChange={handlePassword} />
                                </Grid>
                                <Grid item xs={12} style={{ "padding": "10px" }}>
                                    <Button type="submit" variant="contained" color="primary">Login</Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </form>
            }
        </div>
    );
}