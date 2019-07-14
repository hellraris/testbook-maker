import React, { Component } from 'react';

import axios from 'axios';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


class QuestionList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            userId: this.props.location.state.userId,
            bookId: this.props.location.state.bookId,
            questionList: []
        }
    }

    componentDidMount() {
        console.log(this.state.bookId);
        this.getQuestionList()
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.wrap}>
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
                                        <Button size="small" onClick={() => this.removeQuestion(question.question_id)}>Remove</Button>
                                    </CardActions>
                                </Card>
                            )
                        }) : ''}
                    </div>
                </div>
                <div className={classes.footer}>
                    <Button onClick={() => this.props.history.goBack()}>BACK</Button>
                    <Button onClick={() => this.props.history.push(
                        {
                            pathname: '/testbook/questions/create',
                            state: {
                                userId: this.state.userId,
                                bookId: this.state.bookId
                            }
                        }
                    )}>ADD</Button>
                </div>
            </div>
        );
    }

    showQuestionDetail = (questionId) => {
        axios({
            method: 'get',
            url: '/api/testbook/' + this.props.location.state.bookId + '/question/' + questionId
        }).then(res => {
            const question = res.data;
            console.log(question);
            this.props.history.push({
                pathname: "/testbook/question",
                state: {
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
            url: '/api/' + this.state.userId + '/testbook/' + this.state.bookId + '/questions'
        }).then(res => {
            const list = res.data;
            console.log(list);
            this.setState({ questionList: list })
        })
            .catch(err => console.log(err));
    }

    removeQuestion = (questionId) => {

        const requestData = {
            bookId: this.state.bookId,
            questionId: questionId
        }

        axios({
            method: 'post',
            url: '/api/book/question/remove',
            data: requestData
        }).then(res => {
            this.getQuestionList();
        })
            .catch(err => console.log(err));
    }
}

const styles = theme => ({
    wrap: {
        display: 'flex',
    },
    body: {
        flex: '0 1 1280px',
        margin: '0 auto',
    },
    bookHeader: {
        display: 'flex',
        height: theme.spacing.unit * 7,
        backgroundColor: 'gray'
    },
    contents: {
        padding: 10,
    },
    card: {
        marginBottom: 10,
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
        justifyContent: 'center'
    }
});


export default withStyles(styles)(QuestionList);