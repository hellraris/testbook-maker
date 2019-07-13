import React, { Component } from 'react';
import axios from 'axios';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

class TestViewer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            navi: 0
        }
    }

    componentDidMount() {

    }

    render() {

        const { scripts, subQuestions, explanations } = this.props.location.state.question;

        const { classes } = this.props;

        return (
            <div className={classes.wrap}>
                <div className={classes.testBody}>
                    <BottomNavigation
                        value={this.state.navi}
                        onChange={this.handleNaviChange}
                        showLabels
                        className={classes.navigation}
                    >
                        <BottomNavigationAction label="Question" />
                        <BottomNavigationAction label="Answer" />
                        <BottomNavigationAction label="Both" />
                    </BottomNavigation>
                    <div className={classes.testContents}>
                        <div className={classes.question}>
                            <div className={classes.script}>
                                {scripts ? scripts.map((script, index) => {
                                    return (
                                        <div className={classes.scriptItem} key={index}>
                                            <div style={{ display: 'flex' }}>
                                                <Typography variant="subtitle1" gutterBottom>{script.subtilte}</Typography>
                                            </div>
                                            <div style={{ padding: 10, border: '1px dashed grey', borderRadius: 5 }}>
                                                <Typography style={{ wordBreak: 'break-all' }} gutterBottom>{script.contents}</Typography>
                                            </div>
                                        </div>
                                    )
                                })
                                    : {}}
                            </div>
                            <div className={classes.subQuestion}>
                                {subQuestions ? subQuestions.map((subQuestion, subQuestionIdx) => {
                                    return (
                                        <div className={classes.subQuestionItem} key={subQuestionIdx}>
                                            <div style={{ marginLeft: 15 }}>
                                                <Typography variant="subtitle1">Q{subQuestionIdx + 1}.{subQuestion.subtilte}</Typography>
                                            </div>
                                            <Divider variant="middle" />
                                            <div style={{ marginLeft: 15 }} >
                                                {subQuestion.selections.map((selection, selectionIdx) => {
                                                    return (
                                                        <div className={classes.selection}
                                                            key={selectionIdx}
                                                        >
                                                            <Checkbox
                                                                checked={this.props.location.state.marking.includes(selection.id)}
                                                            />
                                                            <div>
                                                                <Typography style={{ marginTop: 14 }} gutterBottom>
                                                                    {selection.text}
                                                                </Typography>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    )
                                })
                                    : {}}
                            </div>
                        </div>
                        <div className={classes.explanation}>
                            {explanations ? explanations.map((explanation, index) => {
                                return (
                                    <div className={classes.explanationItem} key={index}>
                                        <div style={{ display: 'flex' }}>
                                            <Typography variant="subtitle1" gutterBottom>{explanation.subtilte}</Typography>
                                        </div>
                                        <div style={{ padding: 10, border: '1px dashed grey', borderRadius: 5 }}>
                                            <Typography style={{ wordBreak: 'break-all' }} gutterBottom>{explanation.contents}</Typography>
                                        </div>
                                    </div>
                                )
                            })
                                : {}}
                        </div>
                        <div style={{ marginBottom: 30 }}></div>
                    </div>
                    <div className={classes.footer}>
                        <div>
                            <Button onClick={() => this.props.history.goBack()}>BACK</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // functions

    handleNaviChange = (event, value) => {
        this.setState({
            navi: value
        })
    }

    // function End
}

const styles = theme => ({
    wrap: {
        display: 'flex',
        minHeight: '100%',
        backgroundColor: 'steelblue',
    },
    testBody: {
        flex: '0 1 1280px',
        margin: '0 auto',
        minWidth: 320
    },
    testContents: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'steelblue',
        padding: 10,
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignContent: 'space-around'
    },
    script: {

    },
    question: {
        width: '500px'
    },
    subQuestionItem: {
        backgroundColor: 'white',
        padding: 7,
        margin: 5,
        borderRadius: 5
    },
    scriptItem: {
        backgroundColor: 'white',
        padding: 7,
        margin: 5,
        borderRadius: 5
    },
    explanation: {
        width: '500px'
    },
    explanationItem: {
        backgroundColor: 'white',
        padding: 7,
        margin: 5,
        borderRadius: 5
    },
    selection: {
        display: 'flex'
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
    navigation: {
        width: '30%',
        margin: '0 auto',
        backgroundColor: 'steelblue'
    }
});

export default withStyles(styles)(TestViewer);