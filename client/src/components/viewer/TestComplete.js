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
    wrap: {
        display: 'flex',
        height: '100%'
    },
    bookBody: {
        flex: '0 1 1280px',
        margin: '0 auto',
        height: '100%'
    },
    bookHeader: {
        display: 'flex',
        height: theme.spacing.unit * 7,
        backgroundColor: 'gray'
    },
    addBtn: {
        margin: 'auto 2% auto auto',
        height: theme.spacing.unit * 5
    },
    bookContent: {
        display: 'flex',
        flexDirection: 'column',
        height: '90%',
        border: '1px solid grey',
    },
    questionlist: {
        flex: '1',
        overflowY: 'scroll',
        overflowX: 'hidden',
        padding: '0.5%'
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
        console.log(result.score);
        console.log(result.failQuestions);

        this.state = {
            score: this.props.location.state.result.score,
            failQuestions: this.props.location.state.result.failQuestions,
            incorrectMarkingList: this.props.location.state.result.incorrectMarkingList
        }

    }

    handleExpandPanel = (i) => {
        const modifiedArray = this.state.failQuestions.map((value, index) => {
            return index === i ? ({ ...value, expanded: !this.state.failQuestions[i].expanded }) : value
        });

        this.setState({
            failQuestions: modifiedArray
        });
    };

    choiceSelectedColor = (id, questionIdx) => {
        console.log("aa");
        const { classes } = this.props;

        if (this.state.incorrectMarkingList[questionIdx] === id) {
            return classes.selectionIncorrect;
        } else if (this.state.failQuestions[questionIdx].question.answer === id) {
            return classes.selectionCorrect;
        } else {
            return '';
        }

    } 

    render() {
        const { classes } = this.props;

        return (
            <div>
                <h3>TestScore: {this.state.score}</h3>
                {this.state.failQuestions ?
                    this.state.failQuestions.map((c, questionIdx) => {
                        return <ExpansionPanel expanded={c.expanded} key={questionIdx} onChange={() => this.handleExpandPanel(questionIdx)}>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
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
                                                        className={this.choiceSelectedColor(s.id, questionIdx)}
                                                        key={s.id}
                                                        //selected={this.state.incorrectMarkingList[questionIdx] === s.id || c.question.answer === s.id}
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
        );
    }
}

export default withStyles(styles)(TestComplete);