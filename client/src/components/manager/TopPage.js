import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { setUserId } from '../manager/store/userInfo';

import BookList from './BookList';
import QuestionList from './QuestionList';
import TestViewer from './TestViewer';
import ResultPage from './ResultPage';
import QuestionCreator from './QuestionCreator';
import QuestionViewer from './QuestionViewer';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
    setUserId: (userId) => dispatch(setUserId(userId))
});


class TopPage extends Component {

    constructor(props) {
        super(props)

        this.setUserId();
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
                    <Route exact path='/testbook/questionList' component={QuestionList} />
                    <Route path='/testbook/start' component={TestViewer} />
                    <Route path='/testbook/result' component={ResultPage} />
                    <Route path='/testbook/questions/create' component={QuestionCreator} />
                    <Route path='/testbook/question' component={QuestionViewer} />
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

    setUserId = () => {

        this.props.setUserId('test');
    }
}

const styles = theme => ({
    wrap: {
        backgroundColor: 'steelblue'
    },
    topBar: {
        display: 'flex',
        height: theme.spacing.unit * 5,
        backgroundColor: '#cecece'
    },
});



export default withStyles(styles)(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(TopPage)
);