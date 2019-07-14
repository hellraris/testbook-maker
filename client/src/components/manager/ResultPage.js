import React, { Component } from 'react';
import axios from 'axios';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

class ResultPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            results: null,
            correctCnt: 0,
            incorrectCnt: 0,
        }
    }

    componentDidMount() {
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.wrap}>
                <div style={{ backgroundColor: '#00b07b', height: 13 }}></div>
                <div className={classes.body}>
                    <div className={classes.contents}>
                        <div>
                            {this.props.location.state.results ?
                                <div>
                                    <div>
                                        correct: {this.props.location.state.correctCnt} Incorrect: {this.props.location.state.incorrectCnt}
                                    </div>
                                    {this.props.location.state.results.map((result, index) => {
                                        return (
                                            <ListItem key={index} onClick={() => this.showQuestionDetail(result)}>
                                                <ListItemText
                                                    primary={"Q." + (result.subQuestionNo + 1)}
                                                    secondary={"Answer: " + (Number(result.answer) + 1) + "  YourMarking: " + (Number(result.marking) + 1)}
                                                />
                                            </ListItem>
                                        )
                                    })}
                                </div>
                                : <Typography>please wait</Typography>
                            }
                        </div>
                    </div>
                    <div style={{ marginBottom: 50 }}></div>
                </div>
                <div className={classes.footer}>
                    <Button onClick={() => this.returnToBookList()}>OK</Button>
                </div>
            </div>
        )
    }

    // functions

    returnToBookList = () => {
        this.props.history.push('/testbook');
    }

    showQuestionDetail = (result) => {
        axios({
            method: 'get',
            url: '/api/testbook/' + this.props.location.state.bookId + '/question/' + result.questionId
        }).then(res => {
            const question = res.data;
            console.log(question);
            this.props.history.push({
                pathname: "/testbook/question",
                state: {
                    question: question,
                    marking: result.marking
                }
            });
        })
           .catch(err => console.log(err));
    }

    // function End
}

const styles = theme => ({
    wrap: {
        display: 'flex',
        height: '94%'
    },
    body: {
        margin: '0 auto',
        minWidth: 320,
        padding: 10
    },
    contents: {
        backgroundColor: 'white',
        height: '90%',
        padding: 10,
        borderRadius: 5
    },
    footer: {
        position: 'fixed',
        width: '100%',
        bottom: 0,
        left: 0,
        backgroundColor:'#bee6d1',
        display: 'flex',
        justifyContent: 'center'	
    }
});

export default withStyles(styles)(ResultPage);