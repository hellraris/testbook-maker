import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from 'axios';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';

import BookCreatorModal from './BookCreatorModal'

const mapStateToProps = state => ({
    userId: state.userInfo.userId
});

class BookList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            bookList: null,
            openModal: false,
            openDialog: false,
            dialogTitle: null,
            removeTarget: null
        }
    }

    componentDidMount() {
        this.getBookList()
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.wrap}>
                <Modal
                    open={this.state.openModal}
                >
                    <div className={classes.modal}>
                        <BookCreatorModal userId={this.props.userId} closeModal={this.showModal} />
                    </div>
                </Modal>
                <Dialog
                    open={this.state.openDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{this.state.dialogTitle}</DialogTitle>
                    <DialogActions>
                        <Button onClick={() => this.closeDialog()} color="primary">
                            No
                    </Button>
                        <Button onClick={() => this.removeBook()} color="primary" autoFocus>
                            Yes
                    </Button>
                    </DialogActions>
                </Dialog>
                <div className={classes.body}>
                    <div className={classes.header}>
                        <Breadcrumbs aria-label="Breadcrumb">
                            <Typography color="textPrimary">BookList</Typography>
                        </Breadcrumbs>
                    </div>
                    <div className={classes.contents}>
                        {this.state.bookList ? this.state.bookList.map((book, index) => {
                            return (
                                <Card key={index} className={classes.card}>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {book.title}
                                        </Typography>
                                        <Typography color="textSecondary" gutterBottom>
                                            {book.description}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button variant="outlined" size="small" onClick={() => this.props.history.push(
                                            {
                                                pathname: '/testbook/questionList',
                                                state: {
                                                    bookId: book.testbook_id
                                                }
                                            }
                                        )}>Detail</Button>
                                        <Button variant="outlined" size="small" onClick={() => this.confirmRemove(book)}>REMOVE</Button>
                                        <Button style={{marginLeft: 'auto'}} variant="contained" color="secondary" onClick={() => this.props.history.push(
                                            {
                                                pathname: '/testbook/start',
                                                state: {
                                                    bookId: book.testbook_id
                                                }
                                            }
                                        )}>Start</Button>
                                    </CardActions>
                                </Card>
                            )
                        }) : ''}
                    </div>
                </div>
                <div className={classes.footer}>
                    <Button variant="contained" size="small" onClick={() => this.showModal()}>CREATE</Button>
                </div>
            </div>
        );
    }

    // functions

    getBookList = () => {

        axios({
            method: 'get',
            url: '/api/' + this.props.userId + '/testbook'
        }).then(res => {
            this.setState({ bookList: res.data })
        })
            .catch(err => console.log(err));
    }

    confirmRemove = (book) => {
        this.setState({
            openDialog: true,
            dialogTitle: 'Are you sure you want to remove ' + book.title + '?',
            removeTarget: book.testbook_id
        })
    }

    removeBook = () => {

        const requestData = {
            bookId: this.state.removeTarget
        }

        axios({
            method: 'post',
            url: '/api/book/remove',
            data: requestData
        }).then(res => {
            this.getBookList();
            this.closeDialog();
        })
            .catch(err => console.log(err));
    }

    exportBookJson = (testbook) => {
        
        const link = document.createElement('a');
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(testbook));
        link.href = dataStr;
        link.download = "testbook.json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    }

    closeDialog = () => {
        this.setState({
            ...this.state,
            openDialog: false,
            removeTarget: null
        })
    }

    showModal = () => {

        // モーダルを閉じる時はBookリストを更新する。
        if (this.state.openModal) {
            this.getBookList()
        }

        this.setState({
            ...this.state,
            openModal: !this.state.openModal
        })
    }

}

// styles

const styles = theme => ({
    wrap: {
        display: 'flex'
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 5
    },
    body: {
        flex: '0 1 1280px',
        margin: '0 auto'
    },
    contents: {
        padding: 10,
    },
    card: {
        marginBottom: 7,
        backgroundColor: '#FFFDFB',
        border: '1px solid #DFDFDF',
        "& Button": {
            margin: '0px 5px' 
        }
    },
    footer: {
        display: 'flex',
        position: 'fixed',
        height: '48px',
        width: '100%',
        bottom: 0,
        left: 0,
        backgroundColor: 'navajowhite',
        justifyContent: 'center',
        "& Button": {
            margin: 7
        }
    },
    modal: {
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        outline: 'none',
        maxWidth: '350px',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: 3
    }

});


export default withStyles(styles)(
    connect(
        mapStateToProps
    )(BookList)
);