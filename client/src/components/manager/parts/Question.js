import React, { Component } from 'react';

import { connect } from 'react-redux';
import { addQuestion, deleteQuestion, addSelection, deleteSelection, checkSelection, 
    uncheckSelection, updateSubtitle, updateSelection } from '../store/parts/question';

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

const styles = theme => ({
    body: {
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

const mapStateToProps = state => ({
    questions: state.question.questions
});

const mapDispatchToProps = dispatch => ({
    addQuestion: () => dispatch(addQuestion()),
    deleteQuestion: (questionIdx) => dispatch(deleteQuestion(questionIdx)),
    addSelection: (questionIdx) => dispatch(addSelection(questionIdx)),
    deleteSelection: (questionIdx, selectionIdx) => dispatch(deleteSelection(questionIdx, selectionIdx)),
    checkSelection: (questionIdx, selectionIdx) => dispatch(checkSelection(questionIdx, selectionIdx)),
    uncheckSelection: (questionIdx, selectionIdx) => dispatch(uncheckSelection(questionIdx, selectionIdx)),
    updateSubtitle: (questionIdx, text) => dispatch(updateSubtitle(questionIdx, text)),
    updateSelection: (questionIdx, selectionIdx, text) => dispatch(updateSelection(questionIdx, selectionIdx, text))
});

class Question extends Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: false
        }

    }

    addQuestion = () => {
        const { addQuestion } = this.props;
        addQuestion();
    }

    addSelection = (questionIdx) => {
        const { addSelection } = this.props;
        addSelection(questionIdx);
    }

    deleteQuestion = (questionIdx) => {
        const { deleteQuestion } = this.props;
        deleteQuestion(questionIdx);
    }

    deleteSelection = (questionIdx, selectionIdx) => {
        const { deleteSelection } = this.props;
        deleteSelection(questionIdx, selectionIdx);
    }

    updateSubtilte = (questionIdx, event) => {
        const { updateSubtitle } = this.props;
        updateSubtitle(questionIdx, event.target.value);
    }

    updateSelection = (questionIdx, selectionIdx, event) => {
        const { updateSelection } = this.props;
        updateSelection(questionIdx, selectionIdx, event.target.value);
    }

    handleAnswerChecked = (questionIdx, selectionIdx) => {
        const { checkSelection, uncheckSelection } = this.props;
        // チェック時にチェックした選択肢が既に正答になっている場合、正答から外れるようにする。
        if (this.confirmSelectionChecked(questionIdx, selectionIdx)) {
            checkSelection(questionIdx, selectionIdx);
            // チェック時にチェックした選択肢が正答になっていない場合、正答にする。
        } else {
            uncheckSelection(questionIdx, selectionIdx);
        }
    }

    handleExpanded = () => {
        this.setState({
            ...this,
            expanded: !this.state.expanded
        })
    }

    // 選択肢がチェックされているか確認する。
    confirmSelectionChecked = (questionIdx, selectionIdx) => {
        return this.props.questions[questionIdx].answers.some((answer) => {
            return answer === selectionIdx
        })
    }

    render() {
        const { classes, questions } = this.props;

        return (
            <div className={classes.body}>
                <ExpansionPanel expanded={this.state.expanded} >
                    <ExpansionPanelSummary className={classes.head} expandIcon={<ExpandMoreIcon />} onClick={this.handleExpanded}>
                        <Typography className={classes.headLabel} variant="title" gutterBottom>Question</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <div className="flexbox">
                            <Icon className={"btn-right"} color="action">
                                <AddCircleOutline className={["btn", classes.addBtn].join(' ')} onClick={this.addQuestion} />
                            </Icon>
                        </div>
                        <div>
                            {questions ?
                                questions.map((question, questionIdx) => {
                                    return <div key={questionIdx} className={classes.item}>
                                        <div className={classes.itemBar}>
                                            <Icon className={classes.removeBtnConteiner} color="action">
                                                <Clear className={["btn", classes.removeBtn].join(' ')} onClick={() => this.deleteQuestion(questionIdx)} />
                                            </Icon>
                                        </div>
                                        <div className={classes.itemBody}>
                                            <TextField
                                                className={classes.itemSubtitle}
                                                placeholder="Subtitle"
                                                fullWidth
                                                multiline
                                                value={question.subtilte}
                                                onChange={(event) => this.updateSubtilte(questionIdx, event)}
                                            />
                                            <div className={"flexbox"} style={{ margin: '12px 0 0 7px' }}>
                                                <Typography className={classes.textAlignLeft} variant="subheading">Selection</Typography>
                                                <Icon className={["btn", classes.addSelectionBtn].join(' ')} color="action">
                                                    <AddCircleOutline onClick={() => this.addSelection(questionIdx)} />
                                                </Icon>
                                            </div>
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
                                                                    placeholder={'Selection ' + (selectionIdx + 1)}
                                                                    className={classes.itemSelection}
                                                                    multiline
                                                                    value={selection}
                                                                    onChange={(event) => { this.updateSelection(questionIdx, selectionIdx, event) }}
                                                                />
                                                                <Icon className={["btn", classes.removeSelectionBtn].join(' ')} color="action" >
                                                                    <RemoveCircleOutline onClick={() => { this.deleteSelection(questionIdx, selectionIdx) }} />
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
}

export default withStyles(styles)(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Question)
);