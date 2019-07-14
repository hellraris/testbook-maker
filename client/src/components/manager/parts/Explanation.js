import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import Clear from '@material-ui/icons/Clear';
import Typography from '@material-ui/core/Typography';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const styles = theme => ({
    body: {
        margin: '5px'
    },
    head: {
        display: 'flex',
        height: '40px'
    },
    headLabel: {
        margin: 'auto auto auto 15px',
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
        width: '94%'
    },
    removeBtnConteiner: {
        margin: '14px auto auto auto'
    },
    itemSubtitle: {
        marginTop: '12px',
        width: '97%'
    },
    removeBtn: {
        fontSize: '20px'
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

class Explanation extends Component {

    constructor(props) {
        super(props)

        this.state = {
            explanations: [],
            expanded: false
        }

    }

    componentDidUpdate () {
        this.props.updateExplanationData(this.state.explanations);
    }

    render() {
        const { classes } = this.props;
        const { explanations } = this.state;

        return (
            <div className={classes.body} >
                <ExpansionPanel expanded={this.state.expanded} >
                    <ExpansionPanelSummary className={classes.head} expandIcon={<ExpandMoreIcon />} onClick={this.handleExpanded}>
                        <Typography className={classes.headLabel} variant="title" gutterBottom>Explanation</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <div className="flexbox">
                            <Icon className={"btn-right"} color="action">
                                <AddCircleOutline className={["btn", classes.addBtn].join(' ')} onClick={this.addExplanation} />
                            </Icon>
                        </div>
                        <div>
                            {explanations ?
                                explanations.map((explanation, explanationIdx) => {
                                    return <div key={explanationIdx} className={classes.item}>
                                        <div className={classes.itemBar}>
                                            <Icon className={classes.removeBtnConteiner} color="action">
                                                <Clear className={["btn", classes.removeBtn].join(' ')} onClick={() => this.deleteExplanation(explanationIdx)} />
                                            </Icon>
                                        </div>
                                        <div className={classes.itemBody}>
                                            <TextField
                                                placeholder="Subtitle"
                                                className={classes.itemSubtitle}
                                                fullWidth
                                                multiline
                                                value={explanation.subtilte}
                                                onChange={(event) => this.updateSubtitle(explanationIdx, event)}
                                            />
                                            <TextField
                                                value={explanation.contents}
                                                onChange={(event) => this.updateExplanation(explanationIdx, event)}
                                                multiline
                                                fullWidth
                                                margin="normal"
                                                variant="outlined"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
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

    handleExpanded = () => {
        this.setState({
            ...this,
            expanded: !this.state.expanded
        })
    }

    addExplanation = () => {
        this.setState({
            ...this.state,
            explanations: this.state.explanations.concat({ subtilte: '', contents: '' })
        })
    }

    deleteExplanation = (explanationIdx) => {
        this.setState({
            ...this.state,
            explanations: this.state.explanations.filter((_, index) => index !== explanationIdx)
        })
    }

    updateSubtitle = (explanationIdx, event) => {
        this.setState({
            ...this.state,
            explanations: this.state.explanations.map((explanation, index) => {
                return index === explanationIdx ? { ...explanation, subtilte: event.target.value } : explanation
            })
        })
    }

    updateExplanation = (explanationIdx, event) => {
        this.setState({
            ...this.state,
            explanations: this.state.explanations.map((explanation, index) => {
                return index === explanationIdx ? { ...explanation, contents: event.target.value } : explanation
            })
        })
    }

}

export default withStyles(styles)(Explanation);
