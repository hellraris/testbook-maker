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
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

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
    )
}

class TopPage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            openDialog: false
        }

        this.setUserId();

    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.wrap}>
                <HideOnScroll {...this.props}>
                    <AppBar style={{ backgroundColor: 'steelblue' }}>
                        <Toolbar variant="dense">
                            <div className={classes.logo} onClick={() => this.checkNowPage()}>
                                <Typography gutterBottom variant="h5" component="h2">TnaLog</Typography>
                            </div>
                        </Toolbar>
                    </AppBar>
                </HideOnScroll>
                <div className={classes.body}>
                    <Dialog
                        open={this.state.openDialog}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Are you sure you want to this page?"}</DialogTitle>
                        <DialogActions>
                            <Button onClick={() => this.closeDialog()} color="primary">
                                No
                    </Button>
                            <Button onClick={() => this.goToMainPage(true)} color="primary" autoFocus>
                                Yes
                    </Button>
                        </DialogActions>
                    </Dialog>
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

    // functions

    handleChange = (event, newValue) => {
        this.setState({
            ...this.state,
            menu: newValue
        })
    }

    checkNowPage = () => {

        if (this.props.location.pathname === "/testbook/start" || this.props.location.pathname === "/testbook/questions/create") {
            this.setState({
                ...this.state,
                openDialog: true
            })
            return
        }
        this.goToMainPage(false);
    }

    goToMainPage = (requiredCloseDialog) => {
        if (requiredCloseDialog) {
            this.closeDialog();
        }
        this.props.history.push('/testbook');
    }

    closeDialog = () => {
        this.setState({
            ...this.state,
            openDialog: false
        })
    }

    setUserId = () => {

        this.props.setUserId('test');
    }
}

// styles

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