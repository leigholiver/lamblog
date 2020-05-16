import React, { useState, useEffect } from "react";
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { createBrowserHistory } from 'history';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import HeaderCard from './components/HeaderCard';
import ContactCard from './components/ContactCard';
import BlogListWrapper from './components/BlogListWrapper';
import BlogWrapper from './components/BlogWrapper';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import { currentLoginState } from './util/auth.js';

const styles = {
  section: {
    height: "100%",
  },
  bottomMargin: {
    marginBottom: "5px"
  },
  cardPadding: {
    paddingLeft: "2px",
    paddingRight: "2px"
  },
}

export default function App() {
    // redirect /#!/whatever to prettify the url
    const _history = createBrowserHistory();
    const path = (/#!(\/.*)$/.exec(window.location.hash) || [])[1];
    if (path) {
        _history.replace(path);
    }

    const [ currLogin, setCurrLogin ] = useState(0);
    useEffect(() => {
        setCurrLogin(currentLoginState());
    }, [currLogin]);

    return (
      <div style={{ "position": "relative" }}>
            <style jsx={"true"} global={"true"}>{`
              html {
                min-height: 100%;
              }
              body { 
                min-height: 100%;
                background: #dedede;
                background-image: url("/close-up-of-leaf-326055.jpg");
                background-repeat: no-repeat;
                background-attachment: fixed;
                background-size: cover;
                padding-top: 1em;
              }
          `}</style>
        <Container maxWidth="lg">
            
          <Router>
            <Grid container >
                <Grid item xs={12} md={4} style={{"textAlign":"center"}}>
                    <Grid container spacing={0} >
                        <Grid item xs={12} sm={6} md={12} lg={12} style={{...styles.bottomMargin, ...styles.cardPadding}}>
                            <div style={styles.section}>
                              <HeaderCard currLogin={currLogin} setCurrLogin={setCurrLogin} />
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6} md={12} lg={12} style={{...styles.bottomMargin, ...styles.cardPadding}}>
                            <div style={styles.section}>
                              <ContactCard />
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={8} lg={8} xl={8} style={styles.cardPadding}>
                    <Switch>
                      <Route path={`/new`}>
                        <BlogForm currLogin={currLogin} />
                      </Route>
                      <Route path={`/login`}>
                          <LoginForm currLogin={currLogin} setCurrLogin={setCurrLogin} />
                      </Route>
                      <Route path={`/:slug`}>
                          <BlogWrapper currLogin={currLogin} />
                      </Route>
                      <Route path="/">
                          <BlogListWrapper />
                      </Route>
                    </Switch>
                </Grid>
            </Grid>
          </Router>
        </Container>
      </div>
    );
}