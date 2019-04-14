import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import AddCircle from '@material-ui/icons/AddCircle';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutline from '@material-ui/icons/RemoveCircleOutline';
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
    item: {
        display: 'flex',
        flexDirection: 'row-reverse'
    },
    itemBar: {
        display: 'flex'
    },
    itemBody: {
        width: '94%',
        '& h6': {
            margin: '10px 0 0 7px'
        }
    },
    itemSubtitle: {
        width: '97%'
    },
    itemSelections: {
        padding: '0 0 7px 0',
        '& li':{
            padding: 0
        }
    },
    itemCheckbox: {
        marginTop: '17px',
        padding: '10px'
    },
    itemSelection: {
        width: '90%'
    },
    removeBtnConteiner: {
        margin: '14px auto auto auto'
    },
    removeBtn: {
        fontSize: '20px',
        "&:hover": {
            cursor: 'pointer'
        },
        '&:active': {
            transform: 'translateY(3px)'
        }
    },
    textAlignLeft: {
        textAlign: 'left'
    }
});

class Question extends Component {

    constructor(props) {
        super(props);
        this.state = {
            questions: []
        }

    }

    addQuestion = () => {
        this.setState({
            questions: this.state.questions.concat({ subtilte: '', selections: [], answers: [] })
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

    deleteQuestion = (questionIdx) => {
        this.setState({
            questions: this.state.questions.filter((_, index) => index !== questionIdx)
        })
    }

    deleteSelection = (questionIdx, selectionIdx) => {
        const updatedSelections = this.state.questions[questionIdx].selections.filter((_, index) => index !== selectionIdx)
        const updatedAnswers = this.state.questions[questionIdx].answers.filter((answer) => answer !== selectionIdx)

        this.setState({
            questions: this.state.questions.map((question, index) => {
                if (index === questionIdx) {
                    return {
                        ...question,
                        answers: updatedAnswers,
                        selections: updatedSelections
                    }
                } else {
                    return question;
                }
            })
        })
    }

    handleSubtilte = (event, questionIdx) => {
        this.setState({
            questions: this.state.questions.map((question, index) => {
                return index === questionIdx ? { ...question, subtilte: event.target.value } : question
            })
        })
    }

    handleAnswerChecked = (questionIdx, selectionIdx) => {

        // チェック時にチェックした選択肢が既に正答になっている場合、正答から外れるようにする。
        if (this.confirmSelectionChecked(questionIdx, selectionIdx)) {
            const updatedAnswers = this.state.questions[questionIdx].answers.filter((answer) => {
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
            // チェック時にチェックした選択肢が正答になっていない場合、正答にする。
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

    // 選択肢がチェックされているか確認する。
    confirmSelectionChecked = (questionIdx, selectionIdx) => {
        return this.state.questions[questionIdx].answers.some((answer) => {
            return answer === selectionIdx
        })
    }

    handleSelectionText = (event, questionIdx, selectionIdx) => {

        const updatedSelections = this.state.questions[questionIdx].selections.map((selection, index) => {
            return selectionIdx === index ? event.target.value : selection
        })

        this.setState({
            questions: this.state.questions.map((question, index) => {
                if (index === questionIdx) {
                    return {
                        ...question,
                        selections: updatedSelections
                    }
                } else {
                    return question;
                }
            })
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
                            return <div key={questionIdx} className={classes.item}>
                                <div className={classes.itemBar}>
                                    <Icon className={classes.removeBtnConteiner} color="action">
                                        <Clear className={classes.removeBtn} onClick={() => this.deleteQuestion(questionIdx)} />
                                    </Icon>
                                </div>
                                <div className={classes.itemBody}>
                                    <Typography className={classes.textAlignLeft} variant="subtitle1" gutterBottom>Subtitle</Typography>
                                    <TextField
                                        className={classes.itemSubtitle}
                                        fullWidth
                                        multiline
                                        value={this.state.questions[questionIdx].subtilte}
                                        onChange={(event) => this.handleSubtilte(event, questionIdx)}
                                    />
                                    <Typography className={classes.textAlignLeft} variant="subtitle1" gutterBottom>Selection</Typography>
                                    <List component="nav" className={classes.itemSelections}>
                                        {question.selections ?
                                            question.selections.map((selection, selectionIdx) => {
                                                return (
                                                    <ListItem
                                                        key={selectionIdx}
                                                    >
                                                        <Checkbox
                                                            className={classes.itemCheckbox}
                                                            checked={this.confirmSelectionChecked(questionIdx, selectionIdx)}
                                                            onChange={() => this.handleAnswerChecked(questionIdx, selectionIdx)}
                                                        />
                                                        <TextField
                                                            label={'Selection ' + (selectionIdx + 1)}
                                                            className={classes.itemSelection}
                                                            fullWidth
                                                            multiline
                                                            value={selection}
                                                            onChange={(event) => { this.handleSelectionText(event, questionIdx, selectionIdx) }}
                                                        />
                                                        <Icon style={{margin: '12px 0 0 5px'}} color="action" >
                                                            <RemoveCircleOutline onClick={() => { this.deleteSelection(questionIdx, selectionIdx) }} />
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
                                            <AddCircleOutline onClick={() => this.addSelection(questionIdx)} />
                                        </Icon>
                                    </div>
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

export default withStyles(styles)(Question);