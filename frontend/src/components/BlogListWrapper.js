import React, { useState, useEffect } from "react";
import { createBrowserHistory } from 'history';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';

import Blog from '../components/Blog';
import ProgressCard from './ProgressCard'
import { getList } from '../util/cached-api';

const BlogListWrapper = () => {
    const [ blogs, setBlogs ] = useState([]);
    const [ before, setBefore ] = useState(null);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        getList(before).then((data) => {
            if(data) setBlogs(data);
            const _history = createBrowserHistory();
            _history.push((before? `/?before=${before}` : `/`));
            window.scrollTo(0, 0)
            setLoading(false);
        });
    }, [before]);

    return (
        <div>
            { loading && <ProgressCard /> }
            { !loading && 
                <div>
                    { blogs.length === 0 && 
                        <Card style={{ borderRadius: "2px", marginBottom: "4px", padding: "10px 15px" }}>
                            <CardActions style={{ flexDirection: "column", padding: "4px 8px 0px 8px" }}>
                                <Typography component="span" variant="caption" style={{textAlign: "center"}}>
                                    no blogs found <br />
                                    <a href={"#before"} onClick={(event) => {
                                        event.preventDefault();
                                        setBefore(null);
                                    }}>back home</a>
                                </Typography>
                            </CardActions>
                        </Card>
                    }
                    { blogs.map((blog) => <Blog key={blog.slug} title={blog.title} text={blog.text} slug={blog.slug} created={blog.created} truncate={true} />) }
                    { blogs.length === 5 &&
                        <Card style={{ borderRadius: "2px", marginBottom: "4px", padding: "0px 15px" }}>
                            <CardActions style={{ flexDirection: "row-reverse", padding: "4px" }}>
                                <Typography component="" variant="caption" style={{ textAlign: "right" }}>
                                    <a href={"#before"} onClick={(event) => {
                                        event.preventDefault();
                                        setBefore(blogs[blogs.length-1].created);
                                    }}>older</a>
                                </Typography>
                            </CardActions>
                        </Card>
                    }
                </div>
            }
        </div>
    );
}
export default BlogListWrapper;