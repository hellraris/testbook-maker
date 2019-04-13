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
    contentsItem: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    contentsItemText: {
        width: '93%'
    },
    removeBtn: {
        width: '20px',
        height: '20px',
        margin: '10px auto auto auto',
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

    deleteScript = (index) => {
        this.setState({
            scriptList: this.state.scriptList.filter((_, i) => i !== index)
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
                        this.state.scriptList.map((script, index) => {
                            return <div key={index} className={classes.contentsItem}>

                                <TextField
                                    className={classes.contentsItemText}
                                    label="Script"
                                    name="script"
                                    disabled={true}
                                    multiline
                                    fullWidth
                                    rows="5"
                                    margin="normal"
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <Icon className={classes.removeBtn} color="action">
                                    <Clear onClick={() => this.deleteScript(index)} />
                                </Icon>
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