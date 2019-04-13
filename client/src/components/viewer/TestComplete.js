import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
    testResult: {
        display: 'flex',
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
    testResultBody: {
        flex: '0 1 1280px',
        margin: '0 auto',
    },
    panelNo: {
        flex: '0 0 50px'
    },
    panelTitle: {
        flex: '1 1 300px',
    },
    panelPart: {
        flex: '1 1 100px'
    },
    panelTag: {
        flex: '1 1 200px'
    },
    panelDetailScript: {
        flex: '1 1 400px'
    },
    panelDetailSelection: {
        flex: '1 1 400px'
    },
    panelDetailControl: {
        flex: '0 1 50px'
    },
    tagChip: {
        margin: theme.spacing.unit / 2
    },
    selectionCorrect: {
        backgroundColor: '#98FB98',
        opacity: 0.5
    },
    selectionIncorrect: {
        backgroundColor: '#F08080',
        opacity: 0.5
    },
    selectionScript: {
        width: '90%'
    },
    selectionSelection: {
        width: '80%'
    },
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
        display: 'flex'
    },
}))(MuiExpansionPanelDetails);

class TestComplete extends Component {

    constructor(props) {
        super(props);

        const { result } = this.props.location.state;

        this.state = {
            questions: this.props.location.state.questions,
            incorrectList: this.props.location.state.incorrectList
        }

    }

    checkTestScore = () => {
        return 100 * ((this.state.questions.length - this.state.incorrectList.length) / this.state.questions.length);
    }

    handleExpandPanel = (i) => {
        const modifiedArray = this.state.questions.map((value, index) => {
            return index === i ? ({ ...value, expanded: !this.state.questions[i].expanded }) : value
        });

        this.setState({
            questions: modifiedArray
        });
    };

    render() {
        const { classes } = this.props;

        const changePanelSummaryColor = (questionId) => {
            const incorrect = this.state.incorrectList.some((value) => {
                return value.questionId === questionId
            });
            if (incorrect) {
                return { backgroundColor: 'rgba(255, 0, 0, 0.2)' }
            }
        }

        const changeSelectionColor = (question, selectionId) => {
            const incorrectList = this.state.incorrectList;

            // 誤答した選択肢を赤色にする
            for (let i = 0; i < incorrectList.length; i++) {
                if (incorrectList[i].questionId === question._id) {
                    if (incorrectList[i].marking === selectionId) {
                        return { backgroundColor: 'rgba(255, 0, 0, 0.2)' }
                    }
                }
            }

            // 正答の選択肢を緑色にする
            if (question.question.answer === selectionId) {
                return { backgroundColor: 'rgba(60, 179, 113, 0.2)' }
            }
        }

        return (
            <div className={classes.testResult}>
                <div className={classes.testResultBody}>
                    <h3>TestScore: {this.checkTestScore()}</h3>
                    {this.state.questions ?
                        this.state.questions.map((c, questionIdx) => {
                            return <ExpansionPanel expanded={c.expanded} key={questionIdx} onChange={() => this.handleExpandPanel(questionIdx)}>
                                <ExpansionPanelSummary style={changePanelSummaryColor(c._id)} expandIcon={<ExpandMoreIcon />}>
                                    <div className={classes.panelNo}>
                                        <Typography>{questionIdx + 1}</Typography>
                                    </div>
                                    <div className={classes.panelTitle}>
                                        <Typography>{c.info.title}</Typography>
                                    </div>
                                    <div className={classes.panelPart}>
                                        <Typography>{c.info.part}</Typography>
                                    </div>
                                    <div className={classes.panelTag}>
                                        {c.info.tagList.map((tag, questionIdx) => {
                                            return <Chip key={questionIdx} label={tag} className={classes.tagChip} />
                                        })}
                                    </div>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <div className={classes.panelDetailScript}>
                                        <TextField
                                            className={classes.selectionScript}
                                            label="Script"
                                            value={c.question.script}
                                            multiline
                                            rows="9"
                                            InputProps={{
                                                readOnly: true
                                            }}
                                            margin="normal"
                                            variant="outlined"
                                        />
                                    </div>
                                    <div className={classes.panelDetailSelection}>
                                        <List component="nav">
                                            {c.question.selections.map((s) => {
                                                return (
                                                    <ListItem
                                                        style={changeSelectionColor(c, s.id)}
                                                        key={s.id}
                                                    >
                                                        <ListItemText>{s.selection}</ListItemText>
                                                    </ListItem>
                                                )
                                            })
                                            }
                                        </List>
                                    </div>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        })
                        :
                        ''
                    }
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(TestComplete);