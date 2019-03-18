import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    selection: {
        width: theme.spacing.unit * 50
    }
});

class InfoPage extends Component {

    constructor(props) {
        super(props);


    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <div>
                    <TextField
                        name='title'
                        label="Title"
                        margin="normal"
                        className={classes.selection}
                        value={this.props.title}
                        onChange={this.props.handleInfoChange}
                    /><br />
                    <TextField
                        name='part'
                        label="Part"
                        margin="normal"
                        multiline
                        className={classes.selection}
                        value={this.props.part}
                        onChange={this.props.handleInfoChange}
                    /><br />
                </div>
            </div>
        );
    }
}
export default withStyles(styles)(InfoPage);