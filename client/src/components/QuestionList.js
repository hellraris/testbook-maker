import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from 'axios';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

const mapStateToProps = state => ({
    userId: state.userInfo.userId
});

class QuestionList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            bookId: this.props.location.state.bookId,
            questionList: [],
            openDialog: false,
            dialogTitle: null,
            removeTarget: null
        }
    }

    componentDidMount() {
        this.getQuestionList()
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.wrap}>
                <Dialog
                    open={this.state.openDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{this.state.dialogTitle}</DialogTitle>
                    <DialogActions>
                        <Button onClick={() => this.closeDialog()} color="primary">
                            No
                    </Button>
                        <Button onClick={() => this.removeQuestion()} color="primary" autoFocus>
                            Yes
                    </Button>
                    </DialogActions>
                </Dialog>
                <div className={classes.body}>
                    <div className={classes.contents}>
                        {this.state.questionList ? this.state.questionList.map((question, index) => {
                            return (
                                <Card key={index} className={classes.card}>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {question.title}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" onClick={() => this.showQuestionDetail(question.question_id)}>Detail</Button>
                                        <Button size="small" onClick={() => this.confirmRemove(question)}>Remove</Button>
                                    </CardActions>
                                </Card>
                            )
                        }) : ''}
                    </div>
                </div>
                <div className={classes.footer}>
                    <Button onClick={() => this.props.history.push('/testbook')}>BACK</Button>
                    <Button onClick={() => this.props.history.push(
                        {
                            pathname: '/testbook/questions/create',
                            state: {
                                bookId: this.state.bookId
                            }
                        }
                    )}>ADD</Button>
                </div>
            </div>
        );
    }

    // functions

    showQuestionDetail = (questionId) => {
        axios({
            method: 'get',
            url: '/api/testbook/' + this.state.bookId + '/question/' + questionId
        }).then(res => {
            const question = res.data;
            this.props.history.push({
                pathname: "/testbook/question",
                state: {
                    bookId: this.state.bookId,
                    question: question,
                    marking: []
                }
            });
        })
            .catch(err => console.log(err));
    }

    getQuestionList = () => {
        axios({
            method: 'get',
            url: '/api/' + this.props.userId + '/testbook/' + this.state.bookId + '/questions'
        }).then(res => {
            const list = res.data;
            this.setState({ questionList: list })
        })
            .catch(err => console.log(err));
    }

    confirmRemove = (question) => {
        this.setState({
            openDialog: true,
            dialogTitle: 'Are you sure you want to remove ' + question.title + '?',
            removeTarget: question.question_id
        })
    }

    removeQuestion = () => {

        const requestData = {
            bookId: this.state.bookId,
            questionId: this.state.removeTarget
        }

        axios({
            method: 'post',
            url: '/api/book/question/remove',
            data: requestData
        }).then(res => {
            this.getQuestionList();
            this.closeDialog();
        })
            .catch(err => console.log(err));
    }

    closeDialog = () => {
        this.setState({
            ...this.state,
            openDialog: false,
            removeTarget: null
        })
    }
}

// styles

const styles = theme => ({
    wrap: {
        display: 'flex',
    },
    body: {
        flex: '0 1 1280px',
        margin: '0 auto',
    },
    contents: {
        padding: 10,
    },
    card: {
        marginBottom: 7,
        backgroundColor: '#FFFFF9',
        border: '1px solid #DFDFDF'
    },
    footer: {
        position: 'fixed',
        height: '48px',
        width: '100%',
        bottom: 0,
        left: 0,
        backgroundColor: 'navajowhite',
        display: 'flex',
        justifyContent: 'center',
        "& Button": {
            backgroundColor: '#f2f2f2',
            margin: 7,
            borderRadius: 5,
            "&:hover ": {
                backgroundColor: "#ababab"
            }
        }
    }
});


export default withStyles(styles)(
    connect(
        mapStateToProps
    )(QuestionList)
);