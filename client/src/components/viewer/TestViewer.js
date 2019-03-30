import React, { Component } from 'react';
import axios from 'axios';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {
        width: '80%',
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
});

class TestViewer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            nowQuestion: '',
            questions: '',
            questionOrder: 0
        }
    }

    componentDidMount() {
        this.getTestData()
    }

    getTestData = () => {
        const testId = this.props.match.params.id;

        axios({
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

    render() {
        const { classes } = this.props;

        return (
            <div>
                {this.state.nowQuestion ?
                    <div>
                        <Paper className={classes.root} elevation={1}>
                            <Typography component="p">
                                {this.state.nowQuestion.question.script}
                            </Typography>
                        </Paper>
                        <div>
                            {
                                this.state.nowQuestion.question.selections.map((s, index) => {
                                    return (
                                        <div className={classes.selection} key={index}>
                                            <TextField
                                                className={classes.textField}
                                                margin="normal"
                                                multiline
                                                value={s.selection}
                                            />
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div>
                            <Button onClick={() => this.hendleQuestionOrder("prev")}>PREV</Button>
                            <Button onClick={() => this.hendleQuestionOrder("next")}>NEXT</Button>
                        </div>
                    </div>
                    :
                    ''
                }
            </div>
        );
    }
}

export default withStyles(styles)(TestViewer);