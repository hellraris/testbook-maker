import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    textField: {
        width: theme.spacing.unit * 50
    }
});

class Answer extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <TextField
                    className={classes.textField}
                    value={this.props.explanation}
                    onChange={this.props.handleTextChange}
                    name="explanation"
                    label="explanation"
                    multiline
                    rows="3"
                    margin="normal"
                    variant="outlined"
                /><br />
                <TextField
                    className={classes.textField}
                    value={this.props.translation}
                    onChange={this.props.handleTextChange}
                    name="translation"
                    label="translation"
                    multiline
                    rows="3"
                    margin="normal"
                    variant="outlined"
                /><br />
                 <TextField
                    className={classes.textField}
                    value={this.props.word}
                    onChange={this.props.handleTextChange}
                    name="word"
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