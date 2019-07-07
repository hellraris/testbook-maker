import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import BookList from './BookList';
import TestViewer from './TestViewer';
import ResultPage from './ResultPage';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';

import QuestionCreator from './QuestionCreator';

class TopPage extends Component {

    constructor(props) {
        super(props)

        this.state = {
        }
    }

    componentDidMount() {

    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.wrap}>
                <div className={classes.topBar}>
                    <Button className={classes.addBtn} onClick={() => this.exportBookJson(this.state.questions)}>Export</Button>
                    <Button className={classes.addBtn}>DELETE</Button>
                    <Button className={classes.addBtn} to="/template" >ADD</Button>
                </div>
                <BrowserRouter>
                    <Route exact path='/testbook' component={BookList} />
                    <Route path='/testbook/start' component={TestViewer} />
                    <Route path='/testbook/result' component={ResultPage} />
                    <Route exact path='/template' component={QuestionCreator} />
                </BrowserRouter>
            </div>
        );
    }

    handleChange = (event, newValue) => {
        console.log(newValue);
        this.setState({
            ...this.state,
            menu: newValue
        })
    }
}

const styles = theme => ({
    wrap: {
        height: '100%',
    },
    topBar: {
        display: 'flex',
        height: theme.spacing.unit * 5,
        backgroundColor: '#cecece'
    },
});



export default withStyles(styles)(TopPage);