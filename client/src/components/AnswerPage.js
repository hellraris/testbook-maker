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
                    label="explanation"
                    margin="normal"
                /><br />
                <TextField
                    label="translation"
                    margin="normal"
                /><br />
                <TextField
                    label="word"
                    margin="normal"
                /><br ></br>
                <TextField
                    className={classes.questionText}
                    label="Memo"
                    multiline
                    rows="5"
                    margin="normal"
                    variant="outlined"
                /><br />
            </div>
        );
    }
}
export default withStyles(styles)(Answer);