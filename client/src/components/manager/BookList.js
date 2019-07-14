import React, { Component } from 'react';

import axios from 'axios';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import BookCreatorModal from './BookCreatorModal'


class BookList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            books: [],
            userId: 'test',
            openModal: false
        }
    }

    componentDidMount() {
        this.getBooks()
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.wrap}>
                <Modal
                    open={this.state.openModal}
                >
                    <div className={classes.modal}>
                        <BookCreatorModal closeModal={this.showModal}></BookCreatorModal>
                    </div>
                </Modal>
                <div className={classes.body}>
                    <div className={classes.contents}>
                        {this.state.books ? this.state.books.map((book, index) => {
                            return (
                                <Card key={index} className={classes.card}>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {book.title}
                                        </Typography>
                                        <Typography className={classes.title} color="textSecondary" gutterBottom>

                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" onClick={() => this.props.history.push(
                                            {
                                                pathname: '/testbook/questionList',
                                                state: {
                                                    userId: this.state.userId,
                                                    bookId: book.testbook_id
                                                }
                                            }
                                        )}>Detail</Button>
                                        <Button size="small" onClick={() => this.props.history.push(
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
                    <div style={{ marginBottom: 30 }}></div>
                </div>
                <div className={classes.footer}>
                    <Button onClick={() => this.props.history.goBack()}>BACK</Button>
                    <Button onClick={() => this.showModal()}>ADD</Button>
                </div>
            </div>
        );
    }

    getBooks = () => {
        axios({
            method: 'get',
            url: '/api/' + this.state.userId + '/testbook'
        }).then(res => {
            const list = res.data;
            console.log(list);
            this.setState({ books: list })
        })
            .catch(err => console.log(err));
    }

    exportBookJson = (testbook) => {
        console.log(testbook);
        const link = document.createElement('a');
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(testbook));
        link.href = dataStr;
        link.download = "testbook.json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    }

    showModal = () => {
        console.log('push?');
        this.setState({
            ...this.state,
            openModal: !this.state.openModal
        })
    }

}

const styles = theme => ({
    wrap: {
        display: 'flex',
        minHeight: '100%',
        backgroundColor: 'steelblue'
    },
    body: {
        flex: '0 1 1280px',
        margin: '0 auto',
        height: '100%'
    },
    contents: {
        backgroundColor: 'steelblue',
        padding: 10,
        height: '100%'
    },
    card: {
        marginBottom: 10
    },
    footer: {
        position: 'fixed',
        width: '100%',
        bottom: 0,
        left: 0,
        backgroundColor: '#bee6d1',
        display: 'flex',
        justifyContent: 'center'
    },
    modal: {
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        outline: 'none',
        width: '480px',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: 3
    }

});


export default withStyles(styles)(BookList);