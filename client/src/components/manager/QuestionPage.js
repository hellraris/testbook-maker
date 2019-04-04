import React, { Component } from 'react';
import Radio from '@material-ui/core/Radio';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    selection: {
        display: "flex"
    },
    questionText: {
        width: theme.spacing.unit * 50
    },
    textField: {
        width: theme.spacing.unit * 40
    }
});


class QuestionPage extends Component {

    constructor(props) {
        super(props)

    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <div>
                    <TextField
                        className={classes.questionText}
                        label="Script"
                        name="script"
                        value={this.props.script}
                        onChange={this.props.handleTextChange}
                        multiline
                        rows="5"
                        margin="normal"
                        variant="outlined"
                    /><br />
                </div>
                <div>
                    {
                        this.props.selections.map((c) => {
                            return (
                                <div className={classes.selection} key={c.id}>
                                    <Radio style={{ marginTop: "10px" }}
                                        checked={c.id === this.props.answer}
                                        onChange={()=> this.props.handleAnswerChange(c.id)}
                                        value="b"
                                        name="radio-button-demo"
                                        aria-label="B"
                                    />
                                    <TextField
                                        className={classes.textField}
                                        placeholder="selection (C)"
                                        margin="normal"
                                        multiline
                                        value={c.selection}
                                        onChange={(e)=>this.props.handleSelectionChange(e.target.value, c.id)}
                                    />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}
export default withStyles(styles)(QuestionPage);