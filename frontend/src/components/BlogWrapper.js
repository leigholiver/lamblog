import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { createBrowserHistory } from 'history';

import { getBySlug } from '../util/cached-api';
import Blog from '../components/Blog';
import BlogForm from '../components/BlogForm';
import ProgressCard from './ProgressCard'

const states = {
    OK:      1,
    LOADING: 2,
    EDITING: 3
}

const BlogWrapper = (props) => {
    const _history = createBrowserHistory();

    const history = useHistory();
    const { slug } = useParams();
    const [ currState, setCurrState ] = useState(states.LOADING);
    const [ blog, setBlog ]     = useState({
        id: "",
        title: "",
        text: "",
        slug: "",
        created: ""
    });

    const startEdit = (event) => {
        event.preventDefault();
        setCurrState(states.EDITING);
        _history.replace(`/${blog.slug}/edit`);
    }

    const updateBlog = (blog) => {
        setBlog(blog);
        setCurrState(states.OK);
        _history.replace(`/${blog.slug}`);
    }

    const cancelEdit = (event) => {
        event.preventDefault();
        setCurrState(states.OK);
        _history.replace(`/${blog.slug}`);
    }

    useEffect(() => {
        getBySlug(slug).then((data) => {
            if(!data) {
                history.push("/");
            }
            setBlog(data);
            setCurrState(states.OK);
        });
    }, [slug, history]);

    return (
        <div>
            { currState === states.LOADING && <ProgressCard /> }
            { currState === states.OK && 
                <Blog startEdit={startEdit} currLogin={props.currLogin}
                    title={blog.title} text={blog.text} slug={blog.slug} created={blog.created} truncate={false} />
            } 
            { currState === states.EDITING && 
                <BlogForm cancelEdit={cancelEdit} currLogin={props.currLogin} updateBlog={updateBlog}
                    id={blog.id} title={blog.title} text={blog.text} slug={blog.slug} created={blog.created} />
            }
        </div>
    )
}
export default BlogWrapper;