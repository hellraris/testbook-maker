import React, { Component } from 'react';

import axios from 'axios';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


class BookList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            books: [],
            userId: 'test'
        }
    }

    componentDidMount() {
        this.getBooks()
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.wrap}>
                <div className={classes.bookBody}>
                    <div className={classes.bookContent}>
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
                                                pathname: '/testbook/questions',
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

}

const styles = theme => ({
    wrap: {
        display: 'flex',
        height: '100%'
    },
    bookBody: {
        flex: '0 1 1280px',
        margin: '0 auto',
        height: '100%'
    },
    bookHeader: {
        display: 'flex',
        height: theme.spacing.unit * 7,
        backgroundColor: 'gray'
    },
    bookContent: {
        backgroundColor: 'steelblue',
        padding: 10,
        height: '100%'
    },
    card: {
        marginBottom: 10
    }

});


export default withStyles(styles)(BookList);