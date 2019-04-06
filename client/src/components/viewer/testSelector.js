import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import testViewer from './TestViewer'

import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import CreateIcon from '@material-ui/icons/Create';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
    addBtn: {
        margin: 'auto 2% auto auto',
        height: theme.spacing.unit * 5
    },
    bookContent: {
        display: 'flex',
        flexDirection: 'column',
        height: '90%',
        border: '1px solid grey',
    },
    questionlist: {
        flex: '1',
        overflowY: 'scroll',
        overflowX: 'hidden',
        padding: '0.5%'
    },
    panelNo: {
        flex: '0 0 50px'
    },
    panelTitle: {
        flex: '1 1 300px',
    },
    panelPart: {
        flex: '1 1 100px'
    },
    panelTag: {
        flex: '1 1 200px'
    },
    panelDetailScript: {
        flex: '1 1 400px'
    },
    panelDetailSelection: {
        flex: '1 1 400px'
    },
    panelDetailControl: {
        flex: '0 1 50px'
    },
    tagChip: {
        margin: theme.spacing.unit / 2
    },
    selection: {
        display: 'flex',
        padding: '3px'
    },
    selectionScript: {
        width: '90%'
    },
    selectionSelection: {
        width: '80%'
    },
    icon: {
        "&:hover": {
            cursor: 'pointer'
        },
        '&:active': {
            transform: 'translateY(3px)'
        }
    }
});

const ExpansionPanel = withStyles({
    root: {
        border: '1px solid rgba(0,0,0,.125)',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
    },
    expanded: {
        margin: 'auto',
    },
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
    root: {
        backgroundColor: 'rgba(0,0,0,.03)',
        borderBottom: '1px solid rgba(0,0,0,.125)',
        marginBottom: -1,
        height: 52,
        '& div': {
            margin: 'auto 0',
        },
        '&$expanded': {
            height: 52,
            minHeight: 52
        },
    },
    content: {
        '&$expanded': {
        },
    },
    expanded: {},
})(props => <MuiExpansionPanelSummary  {...props} />);

ExpansionPanelSummary.muiName = 'ExpansionPanelSummary';

const ExpansionPanelDetails = withStyles(theme => ({
    root: {
        display: 'flex'
    },
}))(MuiExpansionPanelDetails);

class TestSelector extends Component {

    constructor(props) {
        super(props)

        this.state = {
            testList: [],
            expanded: null
        }
    }

    componentDidMount() {
        this.getTestList()
    }

    getTestList = () => {
        axios({
            method: 'get',
            url: '/api/test/list'
        }).then(res => {
            this.setState({ testList: res.data })
        })
            .catch(err => console.log(err));
    }

    refreshTestList = () => {
        this.getTestList()
    }

    startTest = (id) => {
        // this.props.history.push('/viewer/aa');
        this.props.history.push(`/viewer/${id}`);
        // return <Link to={`/viewer/${id}`}/>
        /*
        axios({
            method: 'get',
            url: '/api/test/'+id
        }).then(res => {
            console.log(res.data);
        })
            .catch(err => console.log(err));
*/
    }
    /*
        handleExpandPanel = (i) => {
            const modifiedArray = this.state.questions.map((value, index) => {
                return index === i ? ({ ...value, expanded: !this.state.questions[i].expanded }) : value
            });
    
            this.setState({
                tests: modifiedArray
            });
        };
    */
    render() {
        const { classes } = this.props;

        return (
            <div className={classes.wrap}>
                <div className={classes.bookBody}>
                    <div className={classes.bookContent}>
                        <div className={classes.questionlist}>
                            {this.state.testList.map((c, index) => {
                                return <ExpansionPanel expanded={c.expanded} key={index} >
                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                        <div className={classes.panelNo}>
                                            <Typography>{index + 1}</Typography>
                                        </div>
                                        <div className={classes.panelTitle}>
                                            <Typography>{c.title}</Typography>
                                        </div>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <CreateIcon onClick={() => this.startTest(c._id)} />
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(TestSelector);