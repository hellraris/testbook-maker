import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutline from '@material-ui/icons/RemoveCircleOutline';
import Clear from '@material-ui/icons/Clear';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Checkbox from '@material-ui/core/Checkbox';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

class Question extends Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: false
        }

        this.state = {
            subQuestions: []
        }

    }

    componentDidUpdate () {
        this.props.updateSubQuestionData(this.state.subQuestions);
    }

    render() {
        const { classes } = this.props;
        const { subQuestions } = this.state;

        return (
            <div className={classes.body}>
                <ExpansionPanel expanded={this.state.expanded} >
                    <ExpansionPanelSummary className={classes.head} expandIcon={<ExpandMoreIcon />} onClick={this.handleExpanded}>
                        <Typography className={classes.headLabel} variant="h6" gutterBottom>Question</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <div className="flexbox">
                            <Icon className={"btn-right"} color="action">
                                <AddCircleOutline className={["btn", classes.addBtn].join(' ')} onClick={this.addSubQuestion} />
                            </Icon>
                        </div>
                        <div>
                            {subQuestions ?
                                subQuestions.map((subQuestion, subQuestionIdx) => {
                                    return <div key={subQuestionIdx} className={classes.item}>
                                        <div className={classes.itemBar}>
                                            <Icon className={classes.removeBtnConteiner} color="action">
                                                <Clear className={["btn", classes.removeBtn].join(' ')} onClick={() => this.deleteSubQuestion(subQuestionIdx)} />
                                            </Icon>
                                        </div>
                                        <div className={classes.itemBody}>
                                            <TextField
                                                className={classes.itemSubtitle}
                                                placeholder="Subtitle"
                                                fullWidth
                                                multiline
                                                value={subQuestion.subtilte}
                                                onChange={(event) => this.updateSubtilte(subQuestionIdx, event)}
                                            />
                                            <div className={"flexbox"} style={{ margin: '12px 0 0 7px' }}>
                                                <Typography className={classes.textAlignLeft} variant="subheading">Selection</Typography>
                                                <Icon className={["btn", classes.addSelectionBtn].join(' ')} color="action">
                                                    <AddCircleOutline onClick={() => this.addSelection(subQuestionIdx)} />
                                                </Icon>
                                            </div>
                                            <List component="nav" className={classes.itemSelections}>
                                                {subQuestion.selections ?
                                                    subQuestion.selections.map((selection, selectionIdx) => {
                                                        return (
                                                            <ListItem
                                                                key={selectionIdx}
                                                            >
                                                                <Checkbox
                                                                    className={classes.itemCheckbox}
                                                                    checked={this.confirmSelectionChecked(subQuestionIdx, selection.id)}
                                                                    onChange={() => this.handleAnswerChecked(subQuestionIdx, selection.id)}
                                                                />
                                                                <TextField
                                                                    placeholder={'Selection ' + (selectionIdx + 1)}
                                                                    className={classes.itemSelection}
                                                                    multiline
                                                                    value={selection.text}
                                                                    onChange={(event) => { this.updateSelection(subQuestionIdx, selectionIdx, event) }}
                                                                />
                                                                <Icon className={["btn", classes.removeSelectionBtn].join(' ')} color="action" >
                                                                    <RemoveCircleOutline onClick={() => { this.deleteSelection(subQuestionIdx, selection.id) }} />
                                                                </Icon>
                                                            </ListItem>
                                                        )
                                                    })
                                                    :
                                                    ''
                                                }
                                            </List>
                                        </div>
                                    </div>
                                })
                                :
                                ''
                            }
                        </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }

    // functions
    addSubQuestion = () => {
        this.setState({
            ...this.state,
            subQuestions: this.state.subQuestions.concat({ 
                id: this.state.subQuestions.length > 0 ?  
                                ((this.state.subQuestions[this.state.subQuestions.length - 1].id) + 1) : 0,
                subtilte: '',
                selectionType: 1,
                selections: [],
                answer: []
            })
        })
    }

    addSelection = (subQuestionIdx) => {
        this.setState({
            ...this.state,
            subQuestions: this.state.subQuestions.map((subQuestion, index) => {
                if (index === subQuestionIdx) {
                    return {
                        ...subQuestion,
                        selections: subQuestion.selections.concat(
                            {id: subQuestion.selections.length > 0 ?  
                                ((subQuestion.selections[subQuestion.selections.length - 1].id) + 1) : 0 ,
                                text: ''})
                    }
                } else {
                    return subQuestion;
                }
            })

        })
    }

    deleteSubQuestion = (subQuestionIdx) => {
        this.setState({
            ...this.state,
            subQuestions: this.state.subQuestions.filter((_, index) => index !== subQuestionIdx)
        });
    }

    deleteSelection = (subQuestionIdx, selectionId) => {
        const updatedSelections = this.state.subQuestions[subQuestionIdx].selections.filter((selection) => selection.id !== selectionId);
        const updatedAnswer = this.state.subQuestions[subQuestionIdx].answer;

        const answerIdx = updatedAnswer.indexOf(selectionId);
        if (answerIdx !== -1) {
            updatedAnswer.splice(answerIdx, 1)
        };

        this.setState({
            ...this.state,
            subQuestions: this.state.subQuestions.map((subQuestion, index) => {
                if (index === subQuestionIdx) {
                    return {
                        ...subQuestion,
                        answer: updatedAnswer,
                        selections: updatedSelections
                    }
                } else {
                    return subQuestion;
                }
            })
        });
    }

    updateSubtilte = (subQuestionIdx, event) => {
        this.setState({
            ...this.state,
            subQuestions: this.state.subQuestions.map((subQuestion, index) => {
                return index === subQuestionIdx ? { ...subQuestion, subtilte: event.target.value } : subQuestion
            })
        })
    }

    updateSelection = (subQuestionIdx, selectionIdx, event) => {
        const updatedSelections = this.state.subQuestions[subQuestionIdx].selections.map((selection, index) => {
            return selectionIdx === index ? {...selection, text: event.target.value} : selection
        });

        this.setState({
            ...this.state,
            subQuestions: this.state.subQuestions.map((subQuestion, index) => {
                if (index === subQuestionIdx) {
                    return {
                        ...subQuestion,
                        selections: updatedSelections
                    }
                } else {
                    return subQuestion;
                }
            })
        })
    }

    handleAnswerChecked = (subQuestionIdx, selectionId) => {

        const updatedAnswer = this.state.subQuestions[subQuestionIdx].answer
        const index = updatedAnswer.indexOf(selectionId);
        if (index === -1) {
            updatedAnswer.push(selectionId)
        } else {
            updatedAnswer.splice(index, 1);
        }
        
        this.setState({
            ...this.state,
            subQuestions: this.state.subQuestions.map((subQuestion, index) => {
                if (index === subQuestionIdx) {
                    return {
                        ...subQuestion,
                        answer: updatedAnswer
                    }
                } else {
                    return subQuestion;
                }
            })
        })

    }

    handleExpanded = () => {
        this.setState({
            ...this,
            expanded: !this.state.expanded
        })
    }

    // 選択肢がチェックされているか確認する。
    confirmSelectionChecked = (subQuestionIdx, selectionId) => {
        return this.state.subQuestions[subQuestionIdx].answer.includes(selectionId);
    }
}


// styles
const ExpansionPanel = withStyles({
    root: {
        border: '1px solid rgba(0,0,0,.125)',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
    },
    expanded: {
        margin: 'auto',
    },
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
    root: {
        backgroundColor: 'rgba(0,0,0,.03)',
        borderBottom: '1px solid rgba(0,0,0,.125)',
        marginBottom: -1,
        height: 52,
        '& div': {
            margin: 'auto 0',
        },
        '&$expanded': {
            height: 52,
            minHeight: 52
        },
    },
    content: {
        '&$expanded': {
        },
    },
    expanded: {},
})(props => <MuiExpansionPanelSummary  {...props} />);

ExpansionPanelSummary.muiName = 'ExpansionPanelSummary';

const ExpansionPanelDetails = withStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column'
    },
}))(MuiExpansionPanelDetails);

const styles = theme => ({
    body: {
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
        margin: 'auto 10px 10px auto'
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
        marginTop: '12px',
        width: '97%'
    },
    itemSelections: {
        padding: '0 0 7px 0',
        '& li': {
            padding: 0
        }
    },
    itemCheckbox: {
        marginTop: '5px',
        padding: '10px'
    },
    itemSelection: {
        width: '90%'
    },
    removeBtnConteiner: {
        margin: '14px auto auto auto'
    },
    btn: {
        "&:hover": {
            cursor: 'pointer'
        },
        '&:active': {
            transform: 'translateY(3px)'
        }
    },
    addSelectionBtn: {
        margin: 'auto 0 auto auto'
    },
    removeBtn: {
        fontSize: '20px'
    },
    removeSelectionBtn: {
        margin: '3px 0 0 10px'
    },
    textAlignLeft: {
        textAlign: 'left'
    }
});

export default withStyles(styles)(Question);