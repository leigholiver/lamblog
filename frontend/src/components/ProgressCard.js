import React from 'react';
import Card from '@material-ui/core/Card';
import CircularProgress from '@material-ui/core/CircularProgress';

const ProgressCard = () => (
    <Card style={{"textAlign": "center", "padding": "10px"}}><CircularProgress /></Card>
)

export default ProgressCard;