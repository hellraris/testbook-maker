import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import Clear from '@material-ui/icons/Clear';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

class Script extends Component {

    constructor(props) {
        super(props);
        this.state = {
            scripts: [],
            expanded: false
        }
    }

    
    componentDidUpdate () {
        this.props.updateScriptData(this.state.scripts);
    }

    render() {
        const { classes } = this.props;
        const { scripts } = this.state;

        return (
            <div className={classes.body} >
                <ExpansionPanel expanded={this.state.expanded} >
                    <ExpansionPanelSummary className={classes.head} expandIcon={<ExpandMoreIcon />} onClick={this.handleExpanded}>
                        <Typography className={classes.headLabel} variant="title" gutterBottom>Script</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <div className="flexbox">
                            <Icon className={"btn-right"} color="action">
                                <AddCircleOutline className={["btn", classes.addBtn].join(' ')} onClick={this.addScript} />
                            </Icon>
                        </div>
                        <div>
                            {scripts ?
                                scripts.map((script, scriptIdx) => {
                                    return <div key={scriptIdx} className={classes.item}>
                                        <div className={classes.itemBar}>
                                            <Icon className={classes.removeBtnConteiner} color="action">
                                                <Clear className={["btn", classes.removeBtn].join(' ')} onClick={() => this.deleteScript(scriptIdx)} />
                                            </Icon>
                                        </div>
                                        <div className={classes.itemBody}>
                                            <TextField
                                                placeholder="Subtitle"
                                                className={classes.itemSubtitle}
                                                fullWidth
                                                multiline
                                                value={script.subtilte}
                                                onChange={(event) => this.updateSubtilte(scriptIdx, event)}
                                            />
                                            <TextField
                                                name={"script " + (scriptIdx + 1)}
                                                value={script.contents}
                                                onChange={(event) => this.updateScript(scriptIdx, event)}
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

    // functions
    handleExpanded = () => {
        this.setState({
            ...this,
            expanded: !this.state.expanded
        })
    }

    addScript = () => {
        this.setState({
            ...this.state,
            scripts: this.state.scripts.concat({ subtilte: '', contents: '' })
        })
    }

    deleteScript = (scriptIdx) => {
        this.setState({
            ...this.state,
            scripts: this.state.scripts.filter((_, index) => index !== scriptIdx)
        })
    }

    updateSubtilte = (scriptIdx, event) => {
        this.setState({
            ...this.state,
            scripts: this.state.scripts.map((script, index) => {
                return index === scriptIdx ? { ...script, subtilte: event.target.value } : script
            })
        })
    }

    updateScript = (scriptIdx, event) => {
        this.setState({
            ...this.state,
            scripts: this.state.scripts.map((script, index) => {
                return index === scriptIdx ? { ...script, contents: event.target.value } : script
            })
        })
    }
}

// styles
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
        width: '94%'
    },
    itemSubtitle: {
        marginTop: '12px',
        width: '97%'
    },
    removeBtnConteiner: {
        margin: '14px auto auto auto'
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

export default withStyles(styles)(Script);