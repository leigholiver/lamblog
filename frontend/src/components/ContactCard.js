import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';
import Typography from '@material-ui/core/Typography';

const ContactCard = () => (
    <Card style={{ height: "100%" }}>
        <CardContent style={{ borderRadius: "2px", padding: "16px" }}>
            <Grid container alignItems="center">
                <Grid item xs={6}>
                    <GitHubIcon />
                    <Typography variant="body2" component="p">
                      <a href="https://github.com/leigholiver">github</a>
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <TwitterIcon />
                    <Typography variant="body2" component="p">
                      <a href="https://twitter.com/leigholiver_">twitter</a>
                    </Typography>
                </Grid>
            </Grid>
        </CardContent>
    </Card>
);

export default ContactCard;
