import React, { Component } from 'react';
import axios from 'axios';

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
        padding: theme.spacing.unit * 3,
        outline: 'none',
        width: theme.spacing.unit * 50
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


class QuestionModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: true,
            navi: 0,
            title: '',
            part: '',
            tag: '',
            tagList: [],
            script: '',
            selections: [
                { id: 1, selection: '', answer: false },
                { id: 2, selection: '', answer: false },
                { id: 3, selection: '', answer: false },
                { id: 4, selection: '', answer: false }
            ],
            explanation: '',
            translation: '',
            word: ''
        }
    }

    handleCommonTextChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSelectionChange = (value, id) => {
        this.setState({
            selections: this.state.selections.map(
                c => id === c.id
                    ? { ...c, selection: value }
                    : c
            )
        })
    }

    handleAnswerChange = (id) => {
        this.setState({
            selections: this.state.selections.map(
                c => id === c.id
                    ? { ...c, answer: true }
                    : { ...c, answer: false }
            )
        })
    }

    addInfoTag = (tag) => {
        this.setState({
            tagList: this.state.tagList.concat(tag)
        })
        this.setState({
            tag: ''
        })
    }

    deleteInfoTag = (index) => {
        this.setState({
            tagList: this.state.tagList.filter((_, i) => i !== index)
        })
    }

    handleNaviChange = (event, value) => {
        this.setState({
            navi: value
        })
    }

    handleModalClose = () => {
        this.setState({
            open: false
        })
    }

    addQuestion = () => {

        console.log(this.state.translation);

        axios({
            method: 'post',
            url: '/api/question',
            data: {
                info: {
                    title: this.state.title,
                    part: this.state.part,
                    tagList: this.state.tagList
                },
                question: {
                    script: this.state.script,
                    selections: this.state.selections
                },
                answer: {
                    explanation: this.state.explanation,
                    translation: this.state.translation,
                    word: this.state.word
                }
            }
        });

        this.props.refreshQuestions();
        this.handleModalClose();
    }

    render() {
        const { classes } = this.props;

        const selectPage = () => {
            if (this.state.navi === 0) {
                return (
                    <InfoPage
                        title={this.state.title}
                        part={this.state.part}
                        tag={this.state.tag}
                        tagList={this.state.tagList}
                        handleTextChange={this.handleCommonTextChange}
                        addTag={this.addInfoTag}
                        deleteTag={this.deleteInfoTag}
                    />
                )
            }
            if (this.state.navi === 1) {
                return (
                    <QuestionPage
                        script={this.state.script}
                        selections={this.state.selections}
                        handleCommonTextChange={this.handleTextChange}
                        handleSelectionChange={this.handleSelectionChange}
                        handleAnswerChange={this.handleAnswerChange}
                    />
                );
            }
            if (this.state.navi === 2) {
                return (
                    <AnswerPage
                        explanation={this.state.explanation}
                        translation={this.state.translation}
                        word={this.state.word}
                        handleTextChange={this.handleCommonTextChange}
                    />
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
                        <div>
                            {selectPage()}
                        </div>
                        <div style={footer}>
                            <Button onClick={this.addQuestion}>add</Button>
                            <Button onClick={this.handleModalClose}>close</Button>
                        </div>
                    </div>
                </Modal>
            </div >
        );
    }
}

export default withStyles(styles)(QuestionModal);