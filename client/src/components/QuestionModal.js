import React, { Component } from 'react';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { withStyles } from '@material-ui/core/styles';
import InfoPage from './InfoPage';
import QuestionPage from './QuestionPage';
import AnswerPage from './AnswerPage';

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

class QuestionModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: true,
            navi: 0,
            title: '',
            part: ''
        }
    }

    handleInfoChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleNaviChange = (event, value) => {
        this.setState({
            navi: value
        })
    }

    handleClose = () => {
        this.setState({
            open: false
        })
    }

    addQuestion = () => {
        this.props.addQuestion(this.state.title);
        this.handleClose();
    }

    render() {
        const { classes } = this.props;

        const selectPage = () => {
            if (this.state.navi === 0) {
                return (
                    <InfoPage title={this.state.title} part={this.state.part} handleInfoChange={this.handleInfoChange} />
                )
            }
            if (this.state.navi === 1) {
                return (
                    <QuestionPage />
                );
            }
            if (this.state.navi === 2) {
                return (
                    <AnswerPage />
                )
            }
        }

        return (
            <div>
                <Modal open={this.state.open}>
                    <div style={modalStyle} className={classes.paper}>
                        <BottomNavigation
                            value={this.state.navi}
                            onChange={this.handleNaviChange}
                            showLabels
                            className={classes.root}
                        >
                            <BottomNavigationAction label="Info" />
                            <BottomNavigationAction label="Question" />
                            <BottomNavigationAction label="Answer" />
                        </BottomNavigation>
                        <div style={page}>
                            {selectPage()}
                        </div>
                        <div style={footer}>
                            <Button onClick={this.addQuestion}>add</Button>
                            <Button onClick={this.handleClose}>close</Button>
                        </div>
                    </div>
                </Modal>
            </div >
        );
    }
}

export default withStyles(styles)(QuestionModal);