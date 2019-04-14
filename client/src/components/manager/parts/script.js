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

class Script extends Component {

    constructor(props) {
        super(props);
        this.state = {
            scripts: []
        }

    }

    addScript = () => {
        this.setState({
            scripts: this.state.scripts.concat({subtilte: '', contents: ''})
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
                return index === scriptIdx ? { ...script, contents: event.target.value }  : script
            })
        })
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.body}>
                <Paper className={classes.head}>
                    <Typography className={classes.headLabel} variant="title" gutterBottom>Script</Typography>
                    <Icon className={["btn", classes.addBtn].join(' ')} color="action">
                        <AddCircle onClick={this.addScript} />
                    </Icon>
                </Paper>
                <div className={classes.contents}>
                    {this.state.scripts ?
                        this.state.scripts.map((script, scriptIdx) => {
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
                                        onChange={(event) => this.handleSubtilte(event, scriptIdx)}
                                    />
                                    <TextField
                                        name={"script " + (scriptIdx + 1)}
                                        value={script.contents}
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