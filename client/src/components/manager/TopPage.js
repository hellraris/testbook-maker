import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';

import { connect } from 'react-redux';
import { setUserId } from '../manager/store/userInfo';

import BookList from './BookList';
import QuestionList from './QuestionList';
import TestViewer from './TestViewer';
import ResultPage from './ResultPage';
import QuestionCreator from './QuestionCreator';
import QuestionViewer from './QuestionViewer';

import { withStyles } from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
    setUserId: (userId) => dispatch(setUserId(userId))
});

function HideOnScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({ target: window ? window() : undefined });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

class TopPage extends Component {

    constructor(props) {
        super(props)

        this.setUserId();

    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.wrap}>
                    <HideOnScroll {...this.props}>
                        <AppBar style={{ backgroundColor: 'steelblue' }}>
                            <Toolbar variant="dense">
                                <div className={classes.logo} onClick={() => this.props.history.push('/testbook')}>
                                    <Typography gutterBottom variant="h5" component="h2">TnaLog</Typography>
                                </div>
                            </Toolbar>
                        </AppBar>
                    </HideOnScroll>
                    <div className={classes.body}>
                        <Switch>
                            <Route exact path='/testbook' component={BookList} />
                            <Route exact path='/testbook/questionList' component={QuestionList} />
                            <Route path='/testbook/start' component={TestViewer} />
                            <Route path='/testbook/result' component={ResultPage} />
                            <Route path='/testbook/questions/create' component={QuestionCreator} />
                            <Route path='/testbook/question' component={QuestionViewer} />
                        </Switch>
                    </div>
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
    },
    body: {
        display: 'flex',
        flexDirection: 'column',
        padding: '50px 0px'
    },
    logo: {
        cursor: 'pointer',
        "&:active": {
            transform: "translateY(3px)"
        }
    }
});



export default withStyles(styles)(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(withRouter(TopPage))
);