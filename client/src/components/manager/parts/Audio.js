import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import AddCircle from '@material-ui/icons/AddCircle';
import Clear from '@material-ui/icons/Clear';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    hidden: {
        display: 'none'
    },
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

class Audio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scripts: [],
            fileName: '',
            file:''
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
        this.setState({
            ...this,
            file: e.target.files[0],
            fileName: e.target.value
        })
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.body}>
                <Paper className={classes.head}>
                    <Typography className={classes.headLabel} variant="title" gutterBottom>Audio</Typography>
                    <Icon className={["btn", classes.addBtn].join(' ')} color="action">
                        <AddCircle onClick={this.addScript} />
                    </Icon>
                </Paper>
                <div className={classes.contents}>
                    {this.state.scripts ?
                        this.state.scripts.map((script, scriptIdx) => {
                            return <div key={scriptIdx} className={classes.item}>
                                <div>
                                    {this.state.fileName}
                                </div>
                                <div>
                                <input className={classes.hidden} accept="audio/mp3" id="raised-button-file" type="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/><br />
                                <label htmlFor="raised-button-file">
                                    <Button variant="contained" color="primary" component="span" name="file">
                                        select
                                    </Button>
                                </label>
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

export default withStyles(styles)(Audio);