import React, { Component } from 'react';
import axios from 'axios';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        width: '80%',
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
});

class TestViewer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            nowQuestion: '',
            questions: ''
        }
    }



    componentDidMount() {
        this.getTestData()
    }

    getTestData = () => {
        const testId = this.props.match.params.id;

        axios({
            method: 'get',
            url: '/api/test/' + testId
        }).then(res => {
            console.log(res.data);
            this.setState({
                ...this.state,
                questions: res.data,
                nowQuestion: res.data[0]
            })
        })
            .catch(err => console.log(err));
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Paper className={classes.root} elevation={1}>
                    <Typography component="p">
                    { this.state.nowQuestion ?  this.state.nowQuestion.question.script : ""}
                    </Typography>
                </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(TestViewer);