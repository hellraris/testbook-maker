import React, { Component } from 'react';
import axios from 'axios';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
    questionViewer: {
        display: 'flex',
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
    questionViewerBody: {
        flex: '0 1 480px',
        margin: '0 auto',
    }
});

class TestViewer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            nowQuestion: '',
            questions: '',
            questionOrder: 0,
            markingList: [],
            isAnswered: false
        }

    }

    componentDidMount() {
        this.getTestData().then(() => {
            const list = this.state.questions.map(() => {
                return 0;
            })
            this.setState({
                markingList: list
            })
        });

    }

    checkScore = () => {
        if (this.state.nowQuestion.question.answer === this.state.markingList[this.state.questionOrder]) {
            console.log('answer');
        } else (
            console.log('fail')
        )
    }

    getTestData = async () => {
        const testId = this.props.match.params.id;

        await axios({
            method: 'get',
            url: '/api/test/' + testId
        }).then(res => {
            this.setState({
                ...this.state,
                questions: res.data,
                nowQuestion: res.data[0]
            })
        })
            .catch(err => console.log(err));
    }

    hendleQuestionOrder = (value) => {
        let newOrder = this.state.questionOrder;

        if (value === 'prev') {
            newOrder = this.state.questionOrder - 1
        } else if (value === 'next') {
            newOrder = this.state.questionOrder + 1
        }
        this.setState({
            ...this.state,
            nowQuestion: this.state.questions[newOrder],
            questionOrder: newOrder
        })
    }

    handleSelectionClick = (id) => {
        const list = this.state.markingList.map(
            (value, index) => {
                if (this.state.questionOrder === index) {
                    return id;
                } else {
                    return value;
                }
            })
        this.setState({
            ...this.state,
            markingList: list
        })
    }

    submitTest = () => {
        const result = this.checkingTestScore();
        this.props.history.push(`/complete`, { result: result });
    }

    checkingTestScore = () => {
        const questions = this.state.questions;
        const markingList = this.state.markingList;
        const incorrectMarkingList = [];

        const failQuestions = questions.filter((q, index) => {
            if (q.question.answer !== markingList[index]) {
                incorrectMarkingList.push(markingList[index]);
                return true;
            };
        })

        const score = 100 * ((questions.length - failQuestions.length) / questions.length);

        const result = {
            score: score,
            incorrectMarkingList: incorrectMarkingList,
            failQuestions: failQuestions
        }

        return result;
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.questionViewer}>
                {this.state.nowQuestion ?
                    <div className={classes.questionViewerBody}>
                        <Paper elevation={1}>
                            <Typography component="p">
                                {this.state.nowQuestion.question.script}
                            </Typography>
                        </Paper>
                        <div>
                            <List component="nav">
                                {
                                    this.state.nowQuestion.question.selections.map((s) => {
                                        return (
                                            <ListItem
                                                key={s.id}
                                                button
                                                selected={this.state.markingList[this.state.questionOrder] === s.id}
                                                onClick={() => this.handleSelectionClick(s.id)}
                                            >
                                                <ListItemText>{s.selection}</ListItemText>
                                            </ListItem>
                                        )
                                    })
                                }
                            </List>
                        </div>
                        <div>
                            {this.state.questionOrder === 0 ? '' : <Button onClick={() => this.hendleQuestionOrder("prev")}>PREV</Button>}
                            {this.state.questionOrder === this.state.questions.length - 1 ?
                                <Button onClick={() => this.submitTest()}>Submit</Button>
                                :
                                <Button onClick={() => this.hendleQuestionOrder("next")}>NEXT</Button>
                            }
                            <Button onClick={this.checkScore}>score</Button>
                        </div>
                    </div >
                    :
                    ''
                }
            </div>
        );
    }
}

export default withStyles(styles)(TestViewer);