import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    questionText: {
        width: theme.spacing.unit * 50
    }
});

class Answer extends Component {
    render() {
        const { classes } = this.props;

        return (
            <div>
                <TextField
                    className={classes.questionText}
                    label="explanation"
                    multiline
                    rows="3"
                    margin="normal"
                    variant="outlined"
                /><br />
                <TextField
                    className={classes.questionText}
                    label="translation"
                    multiline
                    rows="3"
                    margin="normal"
                    variant="outlined"
                /><br />
                 <TextField
                    className={classes.questionText}
                    label="word"
                    multiline
                    rows="3"
                    margin="normal"
                    variant="outlined"
                /><br />
            </div>
        );
    }
}
export default withStyles(styles)(Answer);