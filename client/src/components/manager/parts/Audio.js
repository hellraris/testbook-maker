import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import AddCircle from '@material-ui/icons/AddCircle';
import Clear from '@material-ui/icons/Clear';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
    hidden: {
        display: 'none'
    },
    body: {
        flexDirection: 'column',
        maxWidth: '480px',
        margin: '5px'
    },
    head: {

    },
    headLabel: {
        margin: 'auto auto auto 20px',
    },
    addBtn: {
        margin: 'auto 10px 10px auto'
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
        width: '94%'
    },
    itemScript: {
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
        display: 'flex'
    },
}))(MuiExpansionPanelDetails);

class Audio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            audioList: [],
            expanded: false
        }

    }

    addScript = () => {
        this.setState({
            scripts: this.state.scripts.concat({ subtilte: '', contents: '' })
        })
    }

    deleteScript = (scriptIdx) => {
        this.setState({
            scripts: this.state.scripts.filter((_, index) => index !== scriptIdx)
        })
    }

    handleSubtilte = (event, scriptIdx) => {
        this.setState({
            scripts: this.state.scripts.map((script, index) => {
                return index === scriptIdx ? { ...script, subtilte: event.target.value } : script
            })
        })
    }

    handleScript = (event, scriptIdx) => {
        this.setState({
            scripts: this.state.scripts.map((script, index) => {
                return index === scriptIdx ? { ...script, contents: event.target.value } : script
            })
        })
    }

    handleFileChange = (e) => {
        const fileName = e.target.value.slice(e.target.value.lastIndexOf('\\') + 1);

        this.setState({
            ...this,
            audioList: this.state.audioList.concat({ fileName: fileName, file: e.target.files[0] })
        })
    }

    handleExpanded = () => {
        this.setState({
            ...this,
            expanded: !this.state.expanded
        })
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.body}>
                <ExpansionPanel expanded={this.state.expanded} >
                    <ExpansionPanelSummary className={classes.head} expandIcon={<ExpandMoreIcon />} onClick={this.handleExpanded}>
                        <Typography className={classes.headLabel} variant="title" gutterBottom>Audio</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <input className={classes.hidden} accept="audio/*" id="raised-button-file" type="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange} /><br />
                        <label htmlFor="raised-button-file">
                            <Button variant="contained" component="span" name="file">
                                select
                            </Button>
                        </label>
                        <div>
                            {this.state.audioList.length > 0 ? this.state.audioList[0].fileName : ''}
                        </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <div className={classes.contents}>
                    {
                    }
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Audio);