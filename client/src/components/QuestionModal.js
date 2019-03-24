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
        position: 'relative',
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
    },
    footer: {
        position: 'absolute',
        bottom: '10px',
        left: '35%'
    }
});

const modalStyle = {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '600px'
}

class QuestionModal extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    get initialState() {
        return {
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
        };
    }

    resetBuilder () {
        this.setState(this.initialState);
    }
    /*
    componentDidMount() {
        const questionId = this.props.questionId;
        const bookId = this.props.bookId;

        console.log(bookId);
        console.log(questionId);

        if (questionId !== null) {
            this.getQuestionData(bookId, questionId);
        } 
    }*/

    componentWillReceiveProps(nextProps) {
        if (nextProps.questionId !== '') {
            this.getQuestionData(nextProps.bookId, nextProps.questionId)
        }
    }

    getQuestionData(bookId, questionId) {
        axios({
            method: 'get',
            url: '/api/book/' + bookId + '/question/' + questionId
        }).then(res => this.inputQuestionData(res.data))
            .catch(err => console.log(err));
    }

    inputQuestionData(data) {
        this.setState({
            ...this.state,
            title: data.info.title,
            part: data.info.part,
            tagList: data.info.tagList,
            script: data.question.script,
            selections: data.question.selections,
            explanation: data.answer.explanation,
            translation: data.answer.translation,
            word: data.answer.word
        })
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
            ...this.state,
            tag: '',
            tagList: this.state.tagList.concat(tag)
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
        this.resetBuilder();
        this.props.closeModal();
    }

    createQuestionData = () => {
        const questionData = {
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

        return questionData;
    }

    addQuestion = () => {
        const requestData = this.createQuestionData();
        axios({
            method: 'post',
            url: '/api/book/' + this.props.bookId + '/question/add',
            data: requestData
        });
        this.props.refreshQuestions();
        this.handleModalClose();
    }

    editQuestion = () => {
        const requestData = this.createQuestionData();
        axios({
            method: 'post',
            url: '/api/book/' + this.props.bookId + '/question/' + this.props.questionId + '/update',
            data: requestData
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
                        handleTextChange={this.handleCommonTextChange}
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
                <Modal open={this.props.openModal}>
                    <div style={modalStyle} className={classes.paper}>
                        <div>
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
                        </div>
                        <div>
                            {selectPage()}
                        </div>
                        <div className={classes.footer}>
                           {this.props.questionId === ''?
                           <Button onClick={this.addQuestion}>add</Button>
                           :
                           <Button onClick={this.editQuestion}>edit</Button>
                        }
                            <Button onClick={this.handleModalClose}>close</Button>
                        </div>
                    </div>
                </Modal>
            </div >
        );
    }
}

export default withStyles(styles)(QuestionModal);