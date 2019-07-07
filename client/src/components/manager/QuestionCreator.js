import React, { Component } from 'react';

import axios from 'axios';
import Info from './parts/Info';
import Script from './parts/Script';
import SubQuestion from './parts/SubQuestion';
import Explanation from './parts/Explanation';
import Button from '@material-ui/core/Button';

import { withStyles } from '@material-ui/core/styles';

const questionData = {
    title: '',
    tagList: null,
    scripts: null,
    subQuestions: null,
    explanations: null
}

class QuestionCreator extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.wrap}>
                <div style={{ backgroundColor: '#00b07b', height: 13 }}></div>
                <div className={classes.body}>
                    <div className={classes.contents}>
                        <div>
                            <Info updateInfoData={this.updateInfoData}></Info>
                            <Script updateScriptData={this.updateScriptData} />
                            <SubQuestion updateSubQuestionData={this.updateSubQuestionData} />
                            <Explanation updateExplanationData={this.updateExplanationData} />
                        </div>
                    </div>
                    <div style={{ marginBottom: 50 }}></div>
                </div>
                <div className={classes.footer}>
                    <Button onClick={() => this.goToQuestionList()}>CANCEL</Button>
                    <Button onClick={() => this.addQuestion()}>Add</Button>
                </div>
            </div>
        );
    }

    // functions
    updateScriptData = (data) => {
        questionData.scripts = data;
    }

    updateSubQuestionData = (data) => {
        questionData.subQuestions = data;
    }

    updateExplanationData = (data) => {
        questionData.explanations = data;
    }

    updateInfoData = (data) => {
        questionData.title = data.title;
        questionData.tagList = data.tagList;
    }


    addQuestion = () => {
        let requestData = {
            scripts: JSON.stringify(questionData.scripts),
            subQuestions: JSON.stringify(questionData.subQuestions),
            explanations: JSON.stringify(questionData.explanations),
        }
        requestData.testbookId = this.props.location.state.bookId;
        requestData.title = questionData.title;
        requestData.tagList = JSON.stringify(questionData.tagList);
        console.log("requestDataJson", requestData);

        axios({
            method: 'post',
            url: '/api/book/question/add',
            data: requestData
        }).then(res => {
               this.goToQuestionList();
        }).catch(err => console.log(err));
    }

    goToQuestionList = () => {
        this.props.history.push(
            {
                pathname: '/testbook/questions',
                state: {
                    userId: this.props.location.state.userId,
                    bookId: this.props.location.state.bookId
                }
            }
        );
    }

}

const styles = theme => ({
    wrap: {
        display: 'flex',
        minHeight: '95%',
        backgroundColor: 'steelblue',
    },
    body: {
        flex: '0 1 800px',
        margin: '0 auto',
        minWidth: 320,
        padding: 10,
    },
    contents: {
        backgroundColor: 'white',
        minHeight: '92%',
        padding: 10,
        borderRadius: 5
    },
    footer: {
        position: 'fixed',
        width: '100%',
        bottom: 0,
        left: 0,
        backgroundColor: '#bee6d1',
        display: 'flex',
        justifyContent: 'center'
    }
});

export default withStyles(styles)(QuestionCreator);