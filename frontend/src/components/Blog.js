import React from 'react';
import { Link } from "react-router-dom";

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';

import ReactMarkdown from 'react-markdown';

import TimeSince from '../util/TimeSince';
import {loginStates} from '../util/auth';

const Blog = ({currLogin, startEdit, title, text, slug, created, truncate}) => {  
    if(truncate && text.length > 256) {
        text = text.substring(0, 256) + "...";
    }

    return (
        <Card style={{ borderRadius: "2px", marginBottom: "4px", padding: "10px 15px" }}>
            <CardActions style={{ alignItems: "flex-start" }}>
                <Typography variant="h5" component="h5" style={{ "flexGrow": 1 }}>
                    {title}
                </Typography>
                <Typography component="" variant="caption" style={{ textAlign: "right" }}>
                    <Link to={`/${slug}`}>{TimeSince(new Date(created))} ago</Link>
                </Typography>
                { currLogin === loginStates.LOGGED_IN && 
                    <Typography component="span" variant="caption" style={{ textAlign: "right" }}>
                        <a href={"#edit"} onClick={startEdit}>edit</a>
                    </Typography>
                }
                <Typography component="span" variant="caption" style={{ textAlign: "right" }}>
                    { !truncate && <Link to={`/`}>back home</Link>   }
                </Typography>
            </CardActions>
            <CardContent style={{ padding: "8px" }}>
                <Typography variant="body2" component="div">
                    <ReactMarkdown source={text} />
                </Typography>
            </CardContent>
            <CardActions style={{ padding: "8px 15px" }}>
                <Typography component="span" variant="caption" style={{ flexGrow: "1" }}>
                    { truncate  && <Link to={`/${slug}`}>more</Link> }
                    { !truncate && <Link to={`/`}>back home</Link>   }
                </Typography>
            </CardActions>
        </Card>
    )
}
export default Blog;

