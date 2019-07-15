import React, { Component } from 'react';


import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

class QuestionViewer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            navi: 0
        }

        console.log(this.props.location.state.question);
    }

    render() {
        const { scripts, subQuestions, explanations } = this.props.location.state.question;
        const { classes } = this.props;

        return (
            <div className={classes.wrap}>
                <div className={classes.body}>
                    <div className={classes.contents}>
                        <div className={classes.question}>
                            <Typography variant="h5">Question</Typography>
                            <div className={classes.script}>
                                {scripts ? scripts.map((script, index) => {
                                    return (
                                        <div className={classes.scriptItem} key={index}>
                                            <div className={classes.scriptTitle}>
                                                <Typography variant="subtitle1" gutterBottom>{script.subtilte}</Typography>
                                            </div>
                                            <div className={classes.scriptContents}>
                                                <Typography style={{ wordBreak: 'break-all' }} gutterBottom>{script.contents}</Typography>
                                            </div>
                                        </div>
                                    )
                                })
                                    : null}
                            </div>
                            <div className={classes.subQuestion}>
                                {subQuestions ? subQuestions.map((subQuestion, subQuestionIdx) => {
                                    return (
                                        <div className={classes.subQuestionItem} key={subQuestionIdx}>
                                            <div style={{ marginLeft: 15 }}>
                                                <Typography variant="subtitle1">Q{subQuestionIdx + 1}.{subQuestion.subtilte}</Typography>
                                            </div>
                                            <Divider variant="middle" />
                                            <div className={classes.selection}>
                                                {subQuestion.selections.map((selection, selectionIdx) => {
                                                    return (
                                                        <div className={classes.selectionItem}
                                                            key={selectionIdx}
                                                            style={this.choiceSelectionColor(selection.id, subQuestion.answer)}
                                                        >
                                                            <Checkbox
                                                                checked={subQuestion.answer.includes(selection.id)}
                                                            />
                                                            <div>
                                                                <Typography gutterBottom>
                                                                    {selection.text}
                                                                </Typography>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    )
                                })
                                    : {}}
                            </div>
                        </div>
                        {explanations ?
                            <div className={classes.explanation}>
                                <Typography variant="h5">Explanation</Typography>
                                {explanations.map((explanation, index) => {
                                    return (
                                        <div className={classes.explanationItem} key={index}>
                                            <div style={{ display: 'flex' }}>
                                                <Typography variant="subtitle1" gutterBottom>{explanation.subtilte}</Typography>
                                            </div>
                                            <div style={{ padding: 10, border: '1px dashed grey', borderRadius: 5 }}>
                                                <Typography style={{ wordBreak: 'break-all' }} gutterBottom>{explanation.contents}</Typography>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div> : null
                        }
                    </div>
                    <div className={classes.footer}>
                        <div>
                            <Button onClick={() => this.props.history.goBack()}>BACK</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // functions

    handleNaviChange = (event, value) => {
        this.setState({
            navi: value
        })
    }

    choiceSelectionColor = (selectionId, answer) => {
        const isChecked = this.props.location.state.marking.includes(selectionId)
        if (isChecked) {
            const isAnswer = answer.includes(selectionId)
            if (isAnswer) {
                return {
                    backgroundColor: '#99ffcc'
                }
            } else {
                return {
                    backgroundColor: '#F4A8A7'
                }
            }
        }
        return null
    }

    // function End
}

const styles = theme => ({
    wrap: {
        display: 'flex'
    },
    body: {
        flex: '0 1 1280px',
        margin: '0 auto',
        minWidth: 320
    },
    contents: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignContent: 'space-around',
        backgroundColor: 'white',
        borderRadius: 5,
        margin: '0 auto',
    },
    script: {
        backgroundColor: '#FFFFF9',
    },
    scriptItem: {
        backgroundColor: 'white',
        margin: 5,
        borderRadius: 5
    },
    scriptTitle: {
        marginLeft: 5
    },
    scriptContents: {
        padding: '10px 15px',
        border: '0.5px solid #c0c0c0',
        borderRadius: 5,
        backgroundColor: '#D9EAD9',
    },
    question: {
        flex: '1 1 320px',
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 7,
        margin: 5,
    },
    subQuestionItem: {
        backgroundColor: 'white',
        margin: 3,
    },
    selection: {
        padding: '7px 12px'
    },
    selectionItem: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#E5F5FB',
        borderRadius: 5,
        margin: 5
    },
    explanation: {
        flex: '1 1 320px',
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 7,
        margin: 5
    },
    explanationItem: {
        backgroundColor: 'white',
        margin: 5,
        borderRadius: 5
    },
    footer: {
        display: 'flex',
        position: 'fixed',
        height: '48px',
        width: '100%',
        bottom: 0,
        left: 0,
        backgroundColor: 'navajowhite',
        alignItems: 'center',
        justifyContent: 'center',
        "& Button":{
            backgroundColor: '#f2f2f2',
            margin: 7,
            borderRadius: 5,
            "&:hover ": {
                backgroundColor: "#ababab"
            }
        }
    }
});

export default withStyles(styles)(QuestionViewer);