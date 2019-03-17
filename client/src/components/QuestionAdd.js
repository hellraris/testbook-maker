import React, { Component } from 'react';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    paper: {
        position: 'absolute',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
    },
    questionText: {
        width: theme.spacing.unit * 50
    },
    selection: {
        width: theme.spacing.unit * 50
    }
});

const modalStyle = {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '600px'
}

const footer = {
    left: '50%'
}

const page = {
    height: '500px'
}

class QuestionAdd extends Component {

    constructor(props) {
        super(props);
        this.state = {
            navi: 0
        }
    }

    handleNaviChange = (event, value) => {
        this.setState({
            navi: value
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Modal open={true}>
                    <div style={modalStyle} className={classes.paper}>
                        <BottomNavigation
                            value={this.state.navi}
                            onChange={this.handleNaviChange}
                            showLabels
                            className={classes.root}
                            onChange={this.handleNaviChange}
                        >
                            <BottomNavigationAction label="Info" />
                            <BottomNavigationAction label="Question" />
                            <BottomNavigationAction label="Answer" />
                        </BottomNavigation>
                        <div style={page}>
                            {
                                (() => {
                                    console.log(this.state.navi);
                                    if (this.state.navi === 0) {
                                        return (
                                            <div>
                                                <div>
                                                    <TextField
                                                        label="Title"
                                                        margin="normal"
                                                    /><br />
                                                    <TextField
                                                        label="Part"
                                                        margin="normal"
                                                        multiline
                                                        className={classes.selection}
                                                    /><br />
                                                </div>
                                            </div>
                                        )
                                    }
                                    if (this.state.navi === 1) {
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
                                        )
                                    }
                                    if (this.state.navi === 2) {
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
                                        )
                                    }
                                })()
                            }
                        </div>
                        <div style={footer}>
                            <Button>add</Button>
                            <Button>close</Button>
                        </div>
                    </div>
                </Modal>
            </div >
        );
    }
}

export default withStyles(styles)(QuestionAdd);