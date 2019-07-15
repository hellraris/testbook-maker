import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

class CommonDialog extends Component {

    constructor (props) {
        super(props)

        this.state = {
            open: this.props.open
        }
    }

    render() {
        return (
            <Dialog
                open={true}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        CANCLE
                    </Button>
                    <Button onClick={this.handleClose} color="primary" autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

    handleClose = () =>{
        this.setState({
            ...this.state,
            open: false
        })
    }
}

export default CommonDialog;