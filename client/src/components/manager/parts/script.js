import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import AddCircle from '@material-ui/icons/AddCircle';
import Clear from '@material-ui/icons/Clear';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

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
        width: '94%'
    },
    itemScript: {
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
    }
});

class Script extends Component {

    constructor(props) {
        super(props);
        this.state = {
            scriptList: []
        }

    }

    addScript = () => {
        this.setState({
            scriptList: this.state.scriptList.concat('')
        })
    }

    deleteScript = (scriptIdx) => {
        this.setState({
            scriptList: this.state.scriptList.filter((_, index) => index !== scriptIdx)
        })
    }

    handleScript = (event, scriptIdx) => {
        const updatedScript = this.state.scriptList.map((script, index) => {
            return index === scriptIdx ? event.target.value : script
        })

        this.setState({
            scriptList: updatedScript
        })
    }


    render() {
        const { classes } = this.props;

        return (
            <div className={classes.body}>
                <Paper className={classes.head}>
                    <Typography className={classes.headLabel} variant="h5" gutterBottom>Script</Typography>
                    <Icon className={classes.addBtn} color="action">
                        <AddCircle onClick={this.addScript} />
                    </Icon>
                </Paper>
                <div className={classes.contents}>
                    {this.state.scriptList ?
                        this.state.scriptList.map((script, scriptIdx) => {
                            return <div key={scriptIdx} className={classes.item}>
                                <div className={classes.itemBar}>
                                    <Icon className={classes.removeBtnConteiner} color="action">
                                        <Clear className={classes.removeBtn} onClick={() => this.deleteScript(scriptIdx)} />
                                    </Icon>
                                </div>
                                <div className={classes.itemBody}>
                                    <TextField
                                        className={classes.itemScript}
                                        label={"script " + (scriptIdx + 1)}
                                        name={"script " + (scriptIdx + 1)}
                                        value={script}
                                        onChange={(event) => this.handleScript(event, scriptIdx)}
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
            </div>
        );
    }
}

export default withStyles(styles)(Script);