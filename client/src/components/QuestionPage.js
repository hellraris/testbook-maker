import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    selection: {
        width: theme.spacing.unit * 50
    },
    questionText: {
        width: theme.spacing.unit * 50
    }
});

class QuestionPage extends Component {
    render() {
        const { classes } = this.props;

        return (
            <div>
                <div>
                    <TextField
                        className={classes.questionText}
                        label="Question"
                        multiline
                        rows="5"
                        margin="normal"
                        variant="outlined"
                    /><br />
                    <TextField
                        label="selection (A)"
                        margin="normal"
                        multiline
                        className={classes.selection}
                    /><br />
                    <TextField
                        label="selection (B)"
                        margin="normal"
                        multiline
                        className={classes.selection}
                    /><br />
                    <TextField
                        label="selection (C)"
                        margin="normal"
                        multiline
                        className={classes.selection}
                    /><br />
                    <TextField
                        label="selection (D)"
                        margin="normal"
                        multiline
                        className={classes.selection}
                    /><br />
                </div>
            </div>
        );
    }
}
export default withStyles(styles)(QuestionPage);