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
        };
    };

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
                                    <div className={classes.resultInfo}>
                                        <div style={{ backgroundColor: '#cbcbcb' }} className={classes.resultInfoBox}>
                                            <Typography>Total</Typography>
                                            <Typography variant="h2" gutterBottom>{this.props.location.state.results.length}</Typography>
                                        </div>
                                        <div style={{ backgroundColor: '#88c34c' }} className={classes.resultInfoBox}>
                                            <Typography>Correct</Typography>
                                            <Typography variant="h2" gutterBottom>{this.props.location.state.correctCnt}</Typography>
                                        </div>
                                        <div style={{ backgroundColor: '#D24D4D' }} className={classes.resultInfoBox}>
                                            <Typography>Incorrect</Typography>
                                            <Typography variant="h2" gutterBottom>{this.props.location.state.incorrectCnt}</Typography>
                                        </div>
                                    </div>
                                    {this.props.location.state.results.map((result, index) => {
                                        return (
                                            <ListItem className={classes.itemDetail} key={index} onClick={() => this.showQuestionDetail(result.questionId)}>
                                                <div style={result.isAnswer ? { backgroundColor: '#88c34c', width: '5px', height: '50px', margin: '0 10px' } :
                                                    { backgroundColor: '#D24D4D', width: '5px', height: '50px', margin: '0 10px' }}></div>
                                                <ListItemText
                                                    primary={"Q." + (result.subQuestionNo + 1)}
                                                    secondary={"Answer: " + (Number(result.answer) + 1) + "  YourMarking: " + (result.marking.length === 0 ? "未回答" : (Number(result.marking) + 1))}
                                                />
                                            </ListItem>
                                        )
                                    })}
                                </div>
                                : <Typography>please wait</Typography>
                            }
                        </div>
                    </div>
                </div>
                <div className={classes.footer}>
                    <Button variant="contained" size="small" onClick={() => this.props.history.push('/testbook')}>OK</Button>
                </div>
            </div>
        )
    };

    // functions
    showQuestionDetail = (questionId) => {
        const markings = this.props.location.state.results.filter((value) => {
            return value.questionId === questionId
        });

        axios({
            method: 'get',
            url: '/api/testbook/' + this.props.location.state.bookId + '/question/' + questionId
        }).then(res => {
            const question = res.data;
            this.props.history.push({
                pathname: "/testbook/question",
                state: {
                    bookId: this.props.location.state.bookId,
                    question: question,
                    markings: markings
                }
            });
        }).catch(err => console.log(err));
    };
};

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
    resultInfo: {
        display: 'flex',
        justifyContent: 'center'
    },
    resultInfoBox: {
        display: 'flex',
        flexDirection: 'column',
        flex: '0 1 20%',
        margin: '15px 10px',
        borderRadius: 5,
        color: 'snow',
        padding: 10,
        alignItems: 'center'
    },
    itemDetail: {
        paddingLeft: 0,
        marginBottom: 10,
        backgroundColor: '#FFFFF9',
        border: '1px solid #DFDFDF',
        borderRadius: 5,
        cursor: 'pointer',
        "&:hover ": {
            backgroundColor: "#B7C4C9"
        },
        "&:active": {
            transform: "translateY(3px)"
        }
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
            margin: 7
        }
    }
});

export default withStyles(styles)(ResultPage);