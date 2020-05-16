import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import ProgressCard from './ProgressCard'
import { loginStates } from '../util/auth.js';
import { save } from '../util/cached-api'

const states = {
    LOADING: 0,
    ERROR:   1,
    OK:      2
}

export default function BlogForm(props) {
    const history = useHistory();
    const [ saveState, setSaveState ] = useState(states.OK);
    const [ blog, setBlog ] = useState({
        "id": props.id? props.id : "",
        "title": props.title? props.title : "",
        "slug": props.slug? props.slug : "",
        "text": props.text? props.text : "",
    });

    const updated = (event, field) => {
        let tmp = {};
        tmp[field] = event.target.value
        setBlog({...blog, ...tmp});
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setSaveState(states.LOADING);
        save(blog).then((result) => {
            if(!result) {
                setSaveState(states.ERROR);
                return
            }
            setSaveState(states.OK);
            if (props.updateBlog) {
                props.updateBlog(result);
                return;
            }
            history.push("/" + result.slug)
        });
    }

    return (
        
        <div>
            { saveState === states.LOADING && <ProgressCard /> }
            { saveState !== states.LOADING &&
                <form onSubmit={handleSubmit}>
                    <Card style={{ "marginBottom": "4px" }}>
                        <CardContent>
                            { props.currLogin !== loginStates.LOGGED_IN && <div>You must be logged in to see this page</div> }
                            { props.currLogin === loginStates.LOGGED_IN && 
                                <Grid container style={{ "textAlign": "center" }}>
                                    { saveState === states.ERROR &&
                                        <Grid item xs={12}>
                                            <Typography variant="body2" component="p">
                                                There was an error saving
                                            </Typography>
                                        </Grid>
                                    }
                                    <Grid item xs={12} md={8} style={{ "padding": "4px" }}>
                                        <TextField
                                            id="title"
                                            label="Title"
                                            variant="standard"
                                            onChange={(event) => updated(event, "title")} 
                                            value={blog.title}
                                            style={{ "width": "100%" }} />
                                    </Grid>
                                    <Grid item xs={12} md={4} style={{ "padding": "4px" }}>
                                        <TextField
                                            id="slug"
                                            label="Slug"
                                            variant="standard"
                                            onChange={(event) => updated(event, "slug")} 
                                            value={blog.slug}
                                            style={{ "width": "100%" }} />
                                    </Grid>
                                    <Grid item xs={12} style={{ "padding": "4px" }}>
                                        <TextField
                                            id="text"
                                            label="Text"
                                            variant="standard"
                                            multiline
                                            rows="6"
                                            onChange={(event) => updated(event, "text")} 
                                            value={blog.text}
                                            style={{ "width": "100%" }} 
                                            />
                                    </Grid>
                                    <Grid item xs={12} style={{ "padding": "10px" }}>
                                        <Grid container direction="row"
                                              justify="space-evenly"
                                              alignItems="center"
                                        >
                                            { props.cancelEdit &&
                                                <Button type="button" variant="contained" onClick={props.cancelEdit}>Back</Button>
                                            }
                                            <Button type="submit" variant="contained" color="primary">Save</Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            }
                        </CardContent>
                    </Card>
                </form>
            }
        </div>
    )
}