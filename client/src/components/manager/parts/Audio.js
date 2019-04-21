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
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutline from '@material-ui/icons/RemoveCircleOutline';
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
        margin: '5px 0'
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
    leftBtn: {
        margin: 'auto 0 auto auto'
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
        console.log(this.refs.file);
        const file = e.target.files[0]
        console.log(file)
        const tempAudioList = [{ fileName: file.name, file: file }]
        console.log(tempAudioList);

        this.setState({
            ...this,
            audioList: tempAudioList
        })
    }

    deleteFile = () => {
        const tempAudioList = []

        this.setState({
            ...this,
            audioList: tempAudioList
        })
        console.log(this.refs.file);
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
                        <div div className="flexbox">
                            <input className={classes.hidden} accept="audio/*" ref="file" type="file" 
                                file={this.state.audioList.length > 0 ? this.state.audioList[0].file : ''} 
                                value={this.state.audioList.length > 0 ? '' : ''} 
                                onChange={this.handleFileChange} />
                            <Icon color="action" className={classes.leftBtn} >
                                <AddCircleOutline className={"btn"} onClick={() => this.refs.file.click()} />
                            </Icon>
                        </div>

                        {this.state.audioList.length > 0 ?
                            <div className={classes.item}>
                                <div> {this.state.audioList[0].fileName} </div>
                                <div className={classes.leftBtn}>
                                    <Icon color="action" >
                                        <RemoveCircleOutline className={"btn"} onClick={() => this.deleteFile()} />
                                    </Icon>
                                </div>
                            </div>
                            : 
                            ''}
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