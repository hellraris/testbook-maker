import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import AddCircle from '@material-ui/icons/AddCircle';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import Clear from '@material-ui/icons/Clear';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
    body: {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '480px',
        margin: '5px'
    },
    head: {
        display: 'flex',
        height: '40px'
    },
    headLabel: {
        margin: 'auto auto auto 20px',
    },
    addBtn: {
        margin: 'auto 10px 10px auto',
        "&:hover": {
            cursor: 'pointer'
        },
        '&:active': {
            transform: 'translateY(3px)'
        }
    },
    contents: {

    },
    contentsItem: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column'
    },
    contentsItemText: {
        width: '93%'
    },
    removeBtn: {
        margin: '10px auto auto auto',
        "&:hover": {
            cursor: 'pointer'
        },
        '&:active': {
            transform: 'translateY(3px)'
        }
    }
});

class selection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            questions: []
        }

    }

    addQuestion = () => {
        this.setState({
            questions: this.state.questions.concat({ label: '', selections: [], answers: [] })
        })
    }

    addSelection = (questionIdx) => {
        this.setState({
            questions: this.state.questions.map((question, index) => {
                if (index === questionIdx) {
                    return {
                        ...question,
                        selections: question.selections.concat('')
                    }
                } else {
                    return question;
                }
            })
        })
    }

    deleteSelections = (index) => {
        this.setState({
            selectionsList: this.state.selectionsList.filter((_, i) => i !== index)
        })
    }

    handleAnswerChange = (questionIdx, selectionIdx) => {

        if (this.confirmSelectionChecked(questionIdx, selectionIdx)) {
            const updatedAnswers = this.state.questions[questionIdx].answers.filter((answer)=>{
                return answer !== selectionIdx 
            })

            this.setState({
                questions: this.state.questions.map((question, index) => {
                    if (index === questionIdx) {
                        return {
                            ...question,
                            answers: updatedAnswers
                        }
                    } else {
                        return question;
                    }
                })
            })
        } else {
            const updatedAnswers = this.state.questions[questionIdx].answers.concat(selectionIdx)

            this.setState({
                questions: this.state.questions.map((question, index) => {
                    if (index === questionIdx) {
                        return {
                            ...question,
                            answers: updatedAnswers
                        }
                    } else {
                        return question;
                    }
                })
            })
        }
    }

    confirmSelectionChecked = (questionIdx, selectionIdx) => {
        return this.state.questions[questionIdx].answers.some((answer) => {
            return answer === selectionIdx
        })
    }  

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.body}>
                <Paper className={classes.head}>
                    <Typography className={classes.headLabel} variant="h5" gutterBottom>Question</Typography>
                    <Icon className={classes.addBtn} color="action">
                        <AddCircle onClick={this.addQuestion} />
                    </Icon>
                </Paper>
                <div className={classes.contents}>
                    {this.state.questions ?
                        this.state.questions.map((question, questionIdx) => {
                            return <div key={questionIdx} className={classes.contentsItem}>
                                <div>
                                    <Clear />
                                    <TextField
                                        label='Subtitle'
                                        fullWidth
                                        multiline />
                                </div>
                                <List component="nav">
                                    {question.selections ?
                                        question.selections.map((selection, selectionIdx) => {
                                            return (
                                                <ListItem
                                                    key={selectionIdx}
                                                >
                                                    <Checkbox
                                                        checked={this.confirmSelectionChecked(questionIdx, selectionIdx)}
                                                        onChange={() => this.handleAnswerChange(questionIdx, selectionIdx)}
                                                    />
                                                    <TextField
                                                        label={'Selection ' + (selectionIdx + 1)}
                                                        fullWidth
                                                        multiline
                                                    />
                                                    <Icon className={classes.removeBtn} color="action">
                                                        <RemoveCircle />
                                                    </Icon>
                                                </ListItem>
                                            )
                                        })
                                        :
                                        ''
                                    }
                                </List>
                                <div>

                                    <Icon className={classes.addBtn} color="action">
                                        <AddCircle onClick={() => this.addSelection(questionIdx)} />
                                    </Icon>
                                </div>
                            </div>
                        })
                        :
                        ''
                    }
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(selection);